// Audit-only harness. Executes archived HTML in a fresh, disposable browser context.
const fs=require('fs'),path=require('path'),http=require('http'),vm=require('vm'),crypto=require('crypto');
const {chromium}=require('playwright');
const dir=__dirname, root=path.resolve(dir,'../..'), source=path.join(root,'legacy/Bible_Mastery_Quiz_v14_Ultra (1).html');
const bytes=fs.readFileSync(source),html=bytes.toString('utf8');
const results=[], errors=[], requests=[];
const check=(name,ok,detail)=>results.push({name,status:ok?'PASS':'FAIL',detail});
(async()=>{
 const server=http.createServer((req,res)=>{res.setHeader('Content-Type','text/html; charset=utf-8');res.end(bytes)});
 await new Promise(r=>server.listen(0,'127.0.0.1',r));
 const browser=await chromium.launch({executablePath:process.env.AUDIT_CHROMIUM||'/usr/bin/chromium',headless:true,args:['--no-sandbox']});
 const context=await browser.newContext({viewport:{width:1280,height:900},reducedMotion:'reduce'});
 const page=await context.newPage();page.on('pageerror',e=>errors.push(e.message));page.on('request',r=>requests.push(r.url()));
 page.on('dialog',async d=>{results.push({name:'dialog',status:'OBSERVATION',detail:d.message()});await d.accept()});
 try{
 await page.goto(`http://127.0.0.1:${server.address().port}/`,{waitUntil:'load'});
 check('Initial home renders',await page.locator('#home').isVisible(),await page.title());
 const data=await page.evaluate(()=>({QUESTION_BANK,SCRIPTURES,PARABLES,MIRACLES,DATA,KNOWLEDGE_GRAPH,LEGACY_EQUIVALENCES,valid:BANK.length,validation:QUESTION_BANK.map(q=>({id:q.id,errors:Engine.validate(q)})).filter(x=>x.errors.length)}));
 const count=(a,f)=>a.reduce((o,x)=>{const k=f(x);o[k]=(o[k]||0)+1;return o},{});
 const dup=(a,f)=>Object.entries(a.reduce((o,x)=>{const k=f(x);(o[k]??=[]).push(x.id||x.n||x.name||x.book+' '+x.ref);return o},{})).filter(([k,v])=>v.length>1).map(([value,records])=>({value,records}));
 const q=data.QUESTION_BANK;
 const pv=vm.runInNewContext(html.match(/const PV=(\[.*?);\s*const TOP=/s)[1]);
 const top=vm.runInNewContext('('+html.match(/const TOP=(\{.*?\});\s*const LIB=/s)[1]+')');
 const library=data.SCRIPTURES.map(x=>({book:x.book,text:x.text})).concat(pv.map(p=>({book:p[0],text:p[2].join(' ')})));
 const summary={source:{filename:path.basename(source),bytes:bytes.length,sha256:crypto.createHash('sha256').update(bytes).digest('hex'),lines:html.split(/\r?\n/).filter((line,i,a)=>i<a.length-1||line!=='').length},
 counts:{authored:q.length,valid:data.valid,characters:data.DATA.length,scriptures:data.SCRIPTURES.length,scriptureBooks:new Set(data.SCRIPTURES.map(x=>x.book)).size,parables:data.PARABLES.length,miracles:data.MIRACLES.length,memorisationCompositePassages:pv.length,compositeVerseSegments:pv.reduce((n,p)=>n+p[2].length,0),memorisationBuiltIn:library.length,graphEntities:data.KNOWLEDGE_GRAPH.entities.length,graphEdges:data.KNOWLEDGE_GRAPH.edges.length,legacyMappings:Object.keys(data.LEGACY_EQUIVALENCES).length,generatorDefinitions:7,scriptureGeneratorUnits:data.SCRIPTURES.length*3+data.PARABLES.length*2+data.MIRACLES.length*2},
 difficulty:count(q,x=>x.difficulty),category:count(q,x=>x.primaryCategory),testament:count(q,x=>x.testamentScope),origin:count(q,x=>x.origin),era:count(q,x=>x.era),bookCoverage:count(q.flatMap(x=>x.bookCoverage),x=>x),references:{entries:q.reduce((n,x)=>n+x.references.length,0),unique:new Set(q.flatMap(x=>x.references)).size,values:[...new Set(q.flatMap(x=>x.references))]},scripturesByBook:count(data.SCRIPTURES,x=>x.book),charactersByTestament:count(data.DATA,x=>x.t),topics:Object.fromEntries(Object.entries(top).map(([k,v])=>[k,library.filter(x=>v.test(x.text)).length])),otherTopic:library.filter(x=>!Object.values(top).some(v=>v.test(x.text))).length,
 invalid:data.validation,duplicates:{authoredIds:dup(q,x=>x.id),normalizedStems:dup(q,x=>x.stem.toLowerCase().replace(/[^a-z0-9]/g,'')),knowledgePoints:dup(q,x=>x.knowledgePointId),equivalenceGroups:dup(q,x=>x.equivalenceGroup),eventGroups:dup(q,x=>x.eventGroup),scriptureReferences:dup(data.SCRIPTURES,x=>x.book+'|'+x.ref),scriptureTexts:dup(data.SCRIPTURES,x=>x.text),characterNames:dup(data.DATA,x=>x.n),parableNames:dup(data.PARABLES,x=>x.name),miracleNames:dup(data.MIRACLES,x=>x.name)},
 incompleteDistractorRationales:q.filter(x=>x.options.some(o=>o.id!==x.correctOptionId&&!x.whyDistractorsAreWrong?.[o.id])).map(x=>x.id),mappingTargetsMissing:Object.entries(data.LEGACY_EQUIVALENCES).filter(([k,v])=>!q.some(x=>x.id===v))};
 fs.writeFileSync(path.join(dir,'content-inventory.json'),JSON.stringify(summary,null,2)+'\n');
 // Full machine inspection of all source records; no scripture questions bulk-generated.
 fs.writeFileSync(path.join(dir,'authored-record-audit.json'),JSON.stringify(q.map(x=>({id:x.id,stem:x.stem,correctAnswer:x.options.find(o=>o.id===x.correctOptionId)?.label,category:x.primaryCategory,difficulty:x.difficulty,references:x.references,sourceValidation:data.validation.find(v=>v.id===x.id)?.errors||[]})),null,2)+'\n');
 check('All authored records pass source validator',!data.validation.length,{total:q.length,invalid:data.validation});
 check('Authored IDs and normalized stems unique',!summary.duplicates.authoredIds.length&&!summary.duplicates.normalizedStems.length,summary.duplicates.normalizedStems);
 await page.screenshot({path:path.join(dir,'home-desktop.png'),fullPage:true});
 for(const mode of ['ot','nt','mixed','hard']){
 await page.locator(`.mode[data-mode="${mode}"]`).click();await page.locator('#startBtn').click();
 const selected=await page.evaluate(()=>quiz.map(x=>({id:x.id,event:x.eventGroup,eq:x.equivalenceGroup,scope:x.testamentScope,difficulty:x.difficulty})));
 check(`${mode}: 20 distinct questions/events/equivalences`,selected.length===20&&['id','event','eq'].every(k=>new Set(selected.map(x=>x[k])).size===20),selected);
 for(let i=0;i<selected.length;i++){
 const a=await page.evaluate(()=>quiz[idx].options.find(x=>x.id===quiz[idx].correctOptionId).label);
 await page.locator('#answers').getByRole('button',{name:a,exact:true}).click();await page.locator('#nextBtn').click();
 }
 check(`${mode}: correct answer and completion`,(await page.locator('#scoreBig').textContent())==='20/20',await page.locator('#scoreBig').textContent());
 await page.locator('#homeBtn').click();
 }
 await page.locator('#startBtn').click();
 const wrong=await page.evaluate(()=>quiz[idx].options.find(o=>o.id!==quiz[idx].correctOptionId).label);
 await page.locator('#answers').getByRole('button',{name:wrong,exact:true}).click();
 check('Wrong answer locks options and leaves score zero',await page.locator('#answers button:disabled').count()===4&&(await page.locator('#score').textContent())==='0',await page.locator('#explanation').innerText());
 await page.locator('#stopBtn').click();check('First stop tap retains quiz',await page.locator('#quiz').isVisible());await page.locator('#stopBtn').click();check('Second stop tap returns home',await page.locator('#home').isVisible());
 await page.locator('#studyBtn').click();check('Character Study renders all records',await page.locator('#studyList > div').count()===data.DATA.length,await page.locator('#studyList > div').count());await page.locator('#backBtn').click();
 await page.locator('#scriptureBtn').click();
 for(const mode of ['all','ot','nt','parables','miracles','book']){
 await page.locator(`[data-smode="${mode}"]`).click();await page.locator('#startScripture').click();
 const n=await page.evaluate(()=>sQuiz.length);const sample=await page.evaluate(()=>sQuiz[0]);
 check(`Scripture ${mode}: session and first question`,n>0&&sample.opts.length===4&&new Set(sample.opts).size===4&&sample.opts.includes(sample.ans),{count:n,sample});
 for(let i=0;i<n;i++){const ans=await page.evaluate(()=>sQuiz[sIdx].ans);await page.locator('#sanswers').getByRole('button',{name:ans,exact:true}).click();await page.locator('#snext').click()}
 check(`Scripture ${mode}: completion`,(await page.locator('#sScoreBig').textContent())===`${n}/${n}`,await page.locator('#sScoreBig').textContent());await page.locator('#sHome').click();
 }
 await page.locator('#browseScripture').click();await page.locator('#scriptureSearch').fill('John 3:16');check('Scripture browse search',await page.locator('#scriptureList > div').count()===1);await page.locator('#browseBack').click();await page.locator('#scriptureBack').click();
 await page.locator('#memoBtn').click();await page.getByRole('button',{name:'Scripture Library Find verses',exact:false}).click();
 check('Memorisation built-in library count',(await page.locator('#memoBody').innerText()).includes(`${library.length} passages found`),library.length);
 await page.getByRole('button',{name:'+ Paste New Scripture',exact:true}).click();
 await page.getByLabel('Bible book (e.g. John)').fill('John');await page.getByLabel('Chapter and verse').fill('3:16-audit');await page.getByLabel('Scripture text — paste directly from your Bible').fill('Audit fixture only.\nSecond line preserved.');await page.getByRole('button',{name:'Save scripture',exact:true}).click();
 await page.getByRole('button',{name:'+ Memorise',exact:true}).click();await page.getByRole('button',{name:'Continue',exact:true}).click();await page.getByRole('button',{name:"I've read it",exact:true}).click();
 const blank=page.getByRole('textbox',{name:/Missing word/}).first();await blank.fill('audit-draft');await page.reload();await page.locator('#memoBtn').click();await page.getByRole('button',{name:'My Memorisation Active',exact:false}).click();await page.getByRole('button',{name:'Continue learning',exact:true}).click();
 check('Draft survives reload',await page.getByRole('textbox',{name:/Missing word/}).first().inputValue()==='audit-draft');
 await page.getByRole('button',{name:'Active list',exact:true}).click();await page.getByRole('button',{name:'Remove from active',exact:true}).click();await page.getByRole('button',{name:/^Paused \(/}).click();check('Pause keeps progress',await page.getByRole('button',{name:'Resume',exact:true}).count()===1);await page.getByRole('button',{name:'Resume',exact:true}).click();
 await page.getByRole('button',{name:'Back',exact:true}).click();await page.getByRole('button',{name:'Progress & Backup',exact:false}).click();
 const backup=JSON.parse(await page.getByRole('textbox',{name:'Exported backup',exact:true}).inputValue());
 check('v3 backup includes custom text, memo, rotation and history',backup.v===3&&backup.custom[0].text==='Audit fixture only.\nSecond line preserved.'&&!!backup.memo.items[backup.custom[0].id]&&!!backup.rot&&backup.quizHistory.version===14,{v:backup.v,fields:Object.keys(backup),custom:backup.custom.length});
 await page.getByRole('button',{name:'Restore from pasted text',exact:true}).click();await page.getByRole('textbox',{name:'Paste backup here',exact:true}).fill(JSON.stringify(backup));await page.getByRole('button',{name:'Restore',exact:true}).click();check('Same backup restores without duplicate custom passage',await page.evaluate(()=>JSON.parse(localStorage.getItem('bibleCustomScriptures_v1')).length)===1);
 const merge=await page.evaluate(()=>{
 const existing={items:{'U|a':{box:2}}},custom=[{id:'U|a',book:'John',verse:'1:1',text:'old'}],incoming={memo:{items:{'U|a':{box:4}}},custom:[{id:'U|a',book:'John',verse:'1:1',text:'new'}]};
 const m=Storage14.mergeBackup(incoming,existing,custom);let rejected=false;try{Storage14.safeParse('{"__proto__":{}}')}catch{rejected=true}
 return {count:m.custom.length,existingBox:m.memo.items['U|a'].box,restoredBox:m.memo.items[m.custom[1].id].box,rejected};});
 check('Backup conflict retains both passages and original progress',merge.count===2&&merge.existingBox===2&&merge.restoredBox===4,merge);check('Unsafe backup key rejected',merge.rejected);
 // Source limitation: custom active scripture is not part of SCRIPTURES filtered by MemoIds.
 await page.getByRole('button',{name:'Back',exact:true}).click();await page.locator('#scriptureBtn').click();await page.locator('[data-smode="memo"]').click();
 const memoPool=await page.evaluate(()=>({active:[...MemoIds()],pool:scripturePool().length}));
 check('My Memorised Verses includes active custom passage (known source limitation)',memoPool.pool>0,memoPool);
 await page.locator('#scriptureBack').click();await page.setViewportSize({width:390,height:844});
 check('Home fits 390px viewport',await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));await page.screenshot({path:path.join(dir,'home-mobile.png'),fullPage:true});
 check('No uncaught browser errors',errors.length===0,errors);
 check('No nonlocal network requests',requests.every(u=>u.startsWith('http://127.0.0.1:')),requests);
 }catch(e){results.push({name:'Harness continuation',status:'FAIL',detail:e.stack});}
 finally{
 fs.writeFileSync(path.join(dir,'runtime-results.json'),JSON.stringify({runAt:new Date().toISOString(),browser:await browser.version(),isolation:'new nonpersistent context; no original browser/user data accessed',results,errors,requests},null,2)+'\n');
 await context.close();await browser.close();await new Promise(r=>server.close(r));
 }
 console.log(JSON.stringify(results.map(x=>({name:x.name,status:x.status})),null,2));
 if(results.some(x=>x.status==='FAIL'))process.exitCode=1;
})();
