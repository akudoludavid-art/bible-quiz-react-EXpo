"""Read every source byte; inspect embedded JSON banks without generating questions."""
from pathlib import Path
from html.parser import HTMLParser
from collections import Counter
import hashlib,json,re
root=Path(__file__).resolve().parents[2]
p=root/'legacy/Bible_Mastery_Quiz_v14_Ultra (1).html';raw=p.read_bytes();s=raw.decode('utf-8')
expected='61903e3bdcdd89bca784fe9fcb327d16fc5068811d63fbce0bb11e41ab60e05a'
assert len(raw)==696719 and hashlib.sha256(raw).hexdigest()==expected
class Inspector(HTMLParser):
 def __init__(self):super().__init__();self.ids=[];self.refs=[];self.resources=[];self.scripts=0;self.styles=0
 def handle_starttag(self,t,a):
  a=dict(a)
  if 'id' in a:self.ids.append(a['id'])
  self.scripts+=t=='script';self.styles+=t=='style'
  for k in ['src','href']:
   if k in a:
    if a[k].startswith('#'):self.refs.append(a[k][1:])
    else:self.resources.append([t,k,a[k]])
p=Inspector();p.feed(s)
def dataset(name):
 m=re.search(r'const '+name+r'\s*=\s*',s);return json.JSONDecoder().raw_decode(s[m.end():])[0]
q=dataset('QUESTION_BANK');banks={k:dataset(k) for k in ['SCRIPTURES','PARABLES','MIRACLES']}
invalid={}
for name,fields in [('SCRIPTURES',['book','ref','text']),('PARABLES',['name','ref','theme']),('MIRACLES',['name','ref'])]:
 invalid[name]=[i for i,x in enumerate(banks[name]) if any(not isinstance(x.get(k),str) or not x[k].strip() for k in fields)]
extra={'archiveIntegrity':'PASS','sha256':expected,'inlineScripts':p.scripts,'inlineStyles':p.styles,'externalMarkupResources':p.resources,'missingFragmentTargets':sorted(set(p.refs)-set(p.ids)),'duplicateDomIds':[x for x,n in Counter(p.ids).items() if n>1],'sourceLines':len(s.splitlines()),'recordFields':sorted(set().union(*(set(x) for x in q))),'provenanceValues':[json.loads(x) for x in sorted({json.dumps(x['provenance'],sort_keys=True) for x in q})],'editorialStatuses':sorted({x['editorialStatus'] for x in q}),'questionTypes':sorted({x['questionType'] for x in q}),'secondaryCategoryDistribution':dict(Counter(c for x in q for c in x['secondaryCategories'])),'recordsWithContextWarnings':sum(bool(x['contextWarnings']) for x in q),'recordsWithLegacySourceIds':sum(bool(x['legacySourceIds']) for x in q),'uniqueKnowledgePoints':len({x['knowledgePointId'] for x in q}),'uniqueEvents':len({x['eventGroup'] for x in q}),'otherBankRequiredFieldFailures':invalid,'otherBankExactDuplicateRecords':{k:sum(n-1 for n in Counter(json.dumps(x,sort_keys=True) for x in a).values() if n>1) for k,a in banks.items()}}
(root/'docs/evidence/static-inspection.json').write_text(json.dumps(extra,indent=2)+'\n')
assert not any(invalid.values())
print('PASS: archive integrity, complete HTML parse and required fields in 155 Scripture/parable/miracle records.')
