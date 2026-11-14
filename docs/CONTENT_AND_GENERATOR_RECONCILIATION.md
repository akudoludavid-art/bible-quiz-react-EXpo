# Content and generator reconciliation

All counts refer only to the preserved v14 HTML. Machine evidence: [inventory](evidence/content-inventory.json), [all authored record checks](evidence/authored-record-audit.json), [static metadata inspection](evidence/static-inspection.json). Status of structural counts: VERIFIED-IN-SOURCE. Independent biblical accuracy of the entire corpus: UNKNOWN pending editorial review.

## Distinct inventories

| Unit | Count | Source / meaning |
| --- | ---: | --- |
| Authored single-choice question records | 289 | QUESTION_BANK, line 330; not runtime generator templates |
| Source-validator eligible authored records | 289 | BANK, line 712; 0 excluded by current validator |
| New / legacy-repaired metadata | 214 / 75 | origin metadata; not proof of historical completeness |
| Character Study records | 265 | DATA, lines 337–608; 153 OT, 112 NT |
| KJV scripture records / books | 115 / 66 | SCRIPTURES, line 333 |
| Parable records / miracle records | 20 / 20 | lines 334–335 |
| Composite memorisation passages | 6 | PV, lines 909–914; 17 verse segments |
| Built-in memorisation library | 121 | 115 singles + 6 composites; overlaps intentional |
| Question generator definitions | 7 | buildS, lines 828–852: 3 Scripture + 2 parable + 2 miracle |
| Determinable generator units | 425 | 115×3 + 20×2 + 20×2, ID plans at 820–826 |
| Knowledge graph entities / edges | 18 / 12 | line 328; partial ontology only |
| Legacy ID mappings | 14 | line 329; all targets exist |
| Authored reference entries / unique strings | 325 / 315 | Does not expand ranges or semicolon-separated verses |
| Knowledge/equivalence groups / events | 287 / 263 | Used to prevent within-session near-repetition |

Generator units are stable source×branch identities, not 425 authored questions and not the number of possible shuffled/distractor presentations. Distractor choice and order are randomized, so presentation variants are larger and not exhaustively enumerated. No bulk content generation was performed. Session sampling invoked only normal original-app gameplay. Main authored quiz has no character-template generator path in this source. `rankDistractors` is an unused evidence-filtered authoring helper, not an automatic content factory.

Seven branches: Scripture book identification, reference identification and suffix completion; parable name/reference; miracle name/reference. Scripture completion cuts near 72% of words and borrows wrong tails from other books. Distinct distractor values exclude the correct value; parable/miracle name distractors exclude identical reference strings. These mechanical checks do not independently establish that every alternative is biblically false.

## Distributions

Difficulty:

| Difficulty | Records |
| --- | ---: |
| advanced | 136 |
| intermediate | 110 |
| mastery | 15 |
| beginner | 28 |

Testament scope:

| Scope | Records |
| --- | ---: |
| OT | 186 |
| CROSS | 12 |
| NT | 91 |

Hard eligible pool has 151 records (136 advanced + 15 mastery). OT=186, NT=91, Mixed=289. Source validation has no minimum target size requirement.

Primary categories (33):

| Category | Records |
| --- | ---: |
| Royal deaths | 12 |
| Wars and battles | 6 |
| Textual nuance | 10 |
| Kings and succession | 15 |
| Geography | 30 |
| Same-name identities | 10 |
| Exile and restoration | 9 |
| Place names | 5 |
| Obscure people | 17 |
| Priesthood | 11 |
| Prophets | 23 |
| Scriptural connections | 22 |
| Genealogy | 21 |
| Offices and roles | 8 |
| Early church | 23 |
| Primeval history | 2 |
| Patriarchs | 2 |
| Exodus and wilderness | 4 |
| Tabernacle and temple | 6 |
| Law and offerings | 4 |
| Festivals | 2 |
| Law and ethics | 7 |
| Law and inheritance | 3 |
| Law and kingship | 1 |
| Conquest | 3 |
| Tribal territories | 1 |
| Judges | 3 |
| Family and customs | 4 |
| Early monarchy | 2 |
| Wisdom and poetry | 11 |
| Gospels | 5 |
| Literary imagery | 3 |
| Chronology | 4 |

Era:

| Era | Records |
| --- | ---: |
| Conquest and monarchy | 97 |
| Patriarchs and Torah | 31 |
| Exile, poetry and prophets | 59 |
| Jesus and apostles | 102 |

Memorisation topic regex matches over the 121 built-in entries (multi-label, do not sum as unique records):

| Topic | Matches |
| --- | ---: |
| Faith | 18 |
| Prayer | 4 |
| Salvation | 7 |
| Wisdom | 4 |
| Holiness | 5 |
| Love | 14 |
| Grace | 6 |
| God's promises | 7 |
| Fear and courage | 6 |
| Temptation | 1 |
| The Holy Spirit | 5 |
| Christ | 12 |
| Christian living | 11 |
| Evangelism | 2 |
| Spiritual warfare | 2 |
| God's character | 16 |
| Other (no match) | 49 |

Authored bookCoverage and Scripture per-book distributions, plus the full 315 unique reference strings, are in `content-inventory.json`. Both authored bookCoverage and Scripture entries cover all 66 book labels. Scripture counts range from one per book to six for Psalms. Secondary categories: zero assigned. Topic classifications are text heuristics, not verified semantic taxonomy.

## Validation, duplication and accuracy

The source validator accepted all 289 records: required identity/stem/category/era/difficulty/explanation/scope fields, allowed difficulty, four options, unique option IDs and alias-normalized labels, one answer-ID match, reference/book presence and approval metadata. Every wrong option has a rationale entry. These checks are structural and do not inspect the cited Bible corpus. All records cite ASV (1901), Scrollmapper revision `59b18c5af5845728c275d5b7178ad0d024172b1f`; no new independent proof status was assigned.

Required nonempty fields pass for all 115 Scripture, 20 parable and 20 miracle records; no exact duplicate records in those three banks. This does not verify the references against a Bible corpus.

Zero repeated authored IDs or punctuation-normalized stems. Two repeated knowledge/equivalence groups: `fact:amaziah-amos` (`bible-q-amaziah-amos`, `A|amos`) and `fact:gallio-achaia` (`bible-q-gallio-achaia`, `F|gallio:corinth`); these are related/reversed questions, not necessarily invalid duplicates. Eighteen repeated event groups are listed completely in machine evidence; broad event groups can suppress distinct facts in the same session. Zero repeated Scripture book/reference keys or exact texts; zero repeated parable/miracle names. Two Character Study entries named Joseph are distinct OT/NT people, not an accidental exact-record duplicate. No source record was deleted or renamed.

Preserve the distinctions already made in the bank: Joram of Israel vs Jehoram of Judah; Saul's narrated death vs the Amalekite's claim; Jehu's order vs eunuchs' physical action; named executioners vs rulers; recorded genealogical links vs unsupported kinship assumptions. IDs such as `bible-q-azariah-joash` need not match visible wording and must not be silently regenerated. Scripture excerpts are not a complete KJV corpus; quotations can be selections within a cited verse.

## Historical claim: 795 v13 generator units and two exclusions

**UNVERIFIABLE FROM SUPPLIED SOURCE.** Only v14 HTML was supplied. The numeric coincidence 265 study characters × 3 = 795 is not evidence of an actual v13 generator or its eligibility rules. Current source has seven Scripture generator definitions / 425 units and 289 authored records. It has 75 legacy-repaired labels and 14 legacy mappings, but no complete v13 bank, excluded-record ledger or implemented legacy character generator. Zero current invalid/excluded records does not disprove a previous exclusion.

Needed later: exact original v13 HTML, plus the pre-exclusion authored bank or explicit v14 change record naming the two excluded IDs, their content and exclusion reasons. Preserve these as separate immutable artifacts if supplied; reconcile by stable IDs and evidence. Do not invent the missing two, assume a 291-record baseline, restore excluded content or infer 795 authored questions.

## FRESH-00.5 availability recheck

Workspace discovery found only the supplied v14 HTML, its byte-identical preservation copies, the FRESH-00 directive and audit outputs. The authorized GitHub remote advertised no refs before the checkpoint; there is no reachable older history to inspect there. Exact v13 source and an exclusion ledger remain unavailable in these accessible sources. No claim is made about files on the user's other devices, other repositories or inaccessible accounts.

Track three separate unresolved/verified quantities: **425** current Scripture generator units (verified source×branch count); **795** historically reported/withheld v13 generator units (unverified, not an inventory of recoverable records); and **two** historically excluded authored records (identities, text and reasons unknown). The two are not subtracted from either generator count and are not implied by the current zero invalid authored records. No historical content has been restored, deleted, merged or activated.

Request later: (1) the exact pre-migration v13 HTML containing its complete generator/data definitions; (2) the pre-exclusion authored question bank, embedded or separate, with stable IDs and full text for the two records; (3) the v13→v14 change/exclusion ledger naming those IDs, reasons and replacement mappings, if any. Original filenames are unknown; do not substitute a newly reconstructed file. These block historical reconciliation, not a clearly scoped technical foundation.
