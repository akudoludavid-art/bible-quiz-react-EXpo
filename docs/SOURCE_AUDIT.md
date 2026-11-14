# FRESH-00 source audit

Audit date: 2026-11-14. Scope: original HTML preservation, forensic inventory, baseline and handoff only. **Gate: PARTIAL**; archive and audit deliverables complete, historical reconciliation and original user-data preservation unverified. See MIGRATION_PROGRESS.md for exact continuation limits.

## Source and preservation

The supplied file is `Bible_Mastery_Quiz_v14_Ultra (1).html`, 696,719 bytes, UTF-8, 1,217 lines. Exact archive: [original HTML](../legacy/Bible_Mastery_Quiz_v14_Ultra%20(1).html). SHA-256: `61903e3bdcdd89bca784fe9fcb327d16fc5068811d63fbce0bb11e41ab60e05a`. `legacy/SHA256SUMS` verifies the archive; byte comparison with the uploaded artifact passed. The earlier copy under `/workspace/source-preservation/bible-mastery-v14/` remains intact. This is local preservation, not a published or remote backup.

Release evidence: title line 6 says Bible Mastery v14; footer line 271 says v14/local-only; engine comment line 274 and history schema version 14 corroborate it. CSS line 119 retains a v13 comment; memo keys remain v1 and rotation v2. These are component/history markers, not evidence that the entire supplied app is v13. Filename `Ultra (1)` alone proves neither release authenticity nor revision chronology. No release tag/commit was supplied for this HTML.

Read scope: all source regions were inspected, including complete scripts and inline records parsed without editing them. The large question-bank and scripture lines were additionally inspected as structured data; every authored record has a persisted structural audit entry. This is not independent verse-by-verse theological certification. The attached FRESH-00 directive was read in full and preserved at `evidence/FRESH-00-directive.txt`; HTML text and comments were treated as source evidence, not task instructions.

## Dependencies, assets and missing inputs

VERIFIED-IN-SOURCE: five inline scripts, one inline style block, inline SVG symbols, two CSS SVG data URLs, CSS gradients/system font stacks and canvas confetti. Static markup inspection found no external script/link/image dependency, no dangling SVG fragment target and no duplicate DOM ID. The inspected code has no fetch/XHR, uploads, external font fetch, framework package, backend, service worker or web manifest. All baseline requests were local. The app is offline-capable HTML, not an installable PWA implementation. Browser APIs needed: DOM, localStorage, canvas, timers, matchMedia, Unicode normalization, modern JS optional chaining and collections.

UNKNOWN: user progress, custom passages, history and backups on the original device/origin. None accompanied the HTML. Those values cannot be recovered from this file. Missing for historical reconciliation: exact v13 HTML and the v14 exclusion/edit ledger identifying the two excluded authored records (or exact prior authored bank). ASV dataset revision is cited in provenance but its corpus/review logs were not supplied. No missing runtime asset was identified.

## Source navigation

| Lines in archived HTML | Responsibility | Status |
| --- | --- | --- |
| 1–155 | Metadata, responsive CSS, focus, reduced motion | VERIFIED-IN-SOURCE |
| 158–248 | SVG, home, main quiz/results, study, Scripture menu/quiz/results/browse, memo host | VERIFIED-IN-SOURCE |
| 250–271 | Attributions, MIT notice, v14 footer | VERIFIED-IN-SOURCE |
| 274–307 | Authored validator, identity aliases, weighting, selection, exposure/answer stats | VERIFIED-IN-SOURCE |
| 309–327 | Parse/merge/transaction-like storage and HTML escaping | VERIFIED-IN-SOURCE |
| 328–335 | Graph, legacy mappings, authored bank, Scripture/parable/miracle banks | VERIFIED-IN-SOURCE |
| 337–608 | Character Study base data and expansion | VERIFIED-IN-SOURCE |
| 620–709 | Shuffle, rotation bags and distinct distractors | VERIFIED-IN-SOURCE |
| 711–792 | Validated authored pool, history adaptation, play, timer, scoring, study | VERIFIED-IN-SOURCE |
| 794–879 | Scripture filters, seven generation branches, play, browse | VERIFIED-IN-SOURCE |
| 881–904 | Confetti and two-tap stops | VERIFIED-IN-SOURCE |
| 906–1067 | Memo library, topic inference, custom loading, recall exercises/ladder/reviews | VERIFIED-IN-SOURCE |
| 1069–1205 | Active/paused workspace, filters, editor, progress, backup | VERIFIED-IN-SOURCE |
| 1207–1214 | Dynamic start label, keyboard shortcuts | VERIFIED-IN-SOURCE |

## Actual baseline behavior

Main quiz: OT, NT, Mixed and Hard; target 20, potentially fewer if equivalence/event constraints exhaust candidates. Four distinct option identities, correct answer matched by ID; score +1 for correct, no penalty, answers locked after first response. Elapsed count-up timer only, no timeout/speed bonus. Results at 90/70/50 percent boundaries, replay/home. Stop requires two taps within three seconds; current session is discarded, displayed exposures/answers remain persisted.

Selection uses category balancing, book/era penalties, unseen and missed-question weights and cross-session cooldown. Equivalence and event groups cannot repeat inside a selection. Hard means advanced/mastery, not `hardNames`; the latter is unused residue. Cross-testament authored records are excluded from OT/NT filters but available to Mixed and (when difficulty qualifies) Hard. Main quiz no longer uses full-pool rotation.

Scripture Session has seven divisions: All, OT, NT, Parables, Miracles, My Memorised Verses and One Book. Default target 20; One Book requests min(10,max(5,2 × passage count)), capped by available units. The actual Genesis baseline had six questions. Rotation is per-pool, with recent avoidance, in-flight recovery, full-cycle rebuild and source-group avoidance that relaxes for small pools. Score +1 on exact answer text, no timer, completion/retry/menu; result confetti threshold 80 percent. Larger books have more embedded records; there is no independent book-size weighting algorithm in this path.

Memo has a hub, My Memorisation active/paused/filter view, Scripture Library, Add/Edit Scripture, learning and review views, Progress & Backup and Restore. Seven exercise types: read, blanks, first letters, reference MCQ, full typing, precision typing/reference and self-rated recitation. Six-step final ladder; cumulative composite segments use shorter ladders first. Four blank levels (20/40/60/85 percent); ladder thresholds read=1, blank=.8, first=.75, ref=1, type=.9, precision=.97. Recall uses normalized word LCS, with missing/extra/moved/similar annotations; accuracy is not mastery. Mastered means active box >=5. Review intervals 0/1/3/7/14/30/60 days; zero becomes ten minutes. Review batches start with at most ten and retry each missed item once. Pausing preserves progress. See storage inventory for persistence details.

## Confirmed limitations and risks present before migration

- **L01, runtime-confirmed:** My Memorised Verses filters `SCRIPTURES` by active memo IDs (810–813). Custom `U|…` and composite `P|…` IDs are absent; an active custom-only list produces zero questions. It also includes active *learning* single verses, not only mastered ones. Do not call this a migration regression or silently change it.
- **L02, source-confirmed:** topic and identity/word normalization are English-specific heuristics. Custom book NT detection is exact case-sensitive `NTBOOKS.has(book)`. Imported spelling variants can be classified incorrectly. No translation/version field is stored for custom passages.
- **L03, source-confirmed:** standard writes alert and attempt rollback, but rotation saves swallow exceptions; rollback cannot guarantee atomicity when the browser also rejects rollback writes. Memo load does not comprehensively validate persisted item fields. Restore validates box and selected shapes, not all numeric learning/draft fields or top-level backup version. Malformed legacy data needs explicit validation later.
- **L04, source-confirmed:** history restores choose the record with greater attempts (local on ties), so exposure-only or timestamp differences can be lost. Memo per-ID progress conflicts keep existing; top-level memo fields merge incoming. These are merge policies, not lossless union.
- **L05, source-confirmed:** initial graph has 18 entities and 12 edges; it is explicitly incomplete and does not drive question generation. All authored records claim approved/passage-reviewed; automated validation checks those strings, not biblical truth. All contextWarnings/secondaryCategories arrays are empty. Preserve nuanced explanations/attribution rather than treating approval metadata as new independent verification.
- **L06, source-confirmed:** accessibility support is partial. Focus is moved to main question and its explanation has polite live updates; memo controls have several labels/pressed states; global 1–4/A–D and Enter shortcuts ignore typing/modifier keys; reduced motion suppresses confetti/animations. Main/Scripture mode selections lack programmatic selected state; Scripture question focus/live reporting and some input labels need later review. No screen-reader/contrast certification was performed.

## Tests and reproducibility

See `evidence/runtime-results.json` and `evidence/extended-results.json` for actual named outcomes; `evidence/home-desktop.png` and `evidence/home-mobile.png` capture original home screens. The mobile image was visually inspected: one-column cards, legible layout, no horizontal overflow at 390px. This is not complete responsive certification.

Run from repository root:

```sh
(cd legacy && sha256sum -c SHA256SUMS)
python docs/evidence/audit-static.py
node docs/evidence/audit-baseline.cjs
node docs/evidence/audit-extended.cjs
```

The current cloud machine supplies Node 24, Playwright via its module path and `/usr/bin/chromium`. Harnesses serve only archived bytes at a temporary loopback port, create a nonpersistent browser context and close browser/server. They create only evidence files and disposable synthetic storage. No app dependency or Expo project was installed. A different machine must provide Node, Playwright and Chromium before running; the archive itself needs only a modern browser. `AUDIT_CHROMIUM` can override the first harness executable. A nonzero baseline exit is expected while L01 fails the custom-inclusion expectation; do not remove that assertion to claim an all-pass baseline.

PASS covers main-mode completion, correct/wrong answers, locking/stops, elapsed timer/keyboard, seven Scripture divisions (built-in memo fixture), study/search, custom create/edit/delete, blank draft recovery, pause/resume, v3 restore, collision retention, unsafe-key rejection, simulated write rollback, rotation release and exact-source schedule/diff checks. FAIL is L01. PARTIAL: broad interactive feature coverage. NOT RUN: complete six-stage learning through real elapsed reviews, every random distractor permutation, screen reader/contrast audit, native mobile platforms, original file-origin data recovery, full corpus fact-check and historical v13 reconciliation. No prior user data was migrated.

## FRESH-00.5 classification of L01

L01 is an existing functional coverage defect relative to the visible promise “Quiz your memorisation list” (line 220), with a source-confirmed built-in-only implementation (lines 811–813). The synthetic active custom fixture is valid and preserved in prior test evidence; its generated pool size is zero. The implementation failure is real, but custom inclusion is a desired completeness expectation rather than a description of existing parity. It would be an invalid assumption to require that expectation to pass on the untouched legacy app, to call this a migration regression, or to make it an unconditional foundation-readiness gate. Keep the recorded FAIL unchanged. Future parity checks should reproduce the documented exclusion; a later product change may add custom/composite support only with separately authorized behavior and safety criteria. Neither the archive nor the test outcome was changed in FRESH-00.5.
