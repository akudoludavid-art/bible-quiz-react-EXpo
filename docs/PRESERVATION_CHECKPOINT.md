# FRESH-00.5 — secure preservation and readiness

Date: 2026-11-14. No application conversion work is authorized by this checkpoint.

## Verified preservation

Archived `legacy/Bible_Mastery_Quiz_v14_Ultra (1).html`: **696,719 bytes**. Recalculated SHA-256 equals the uploaded artifact, earlier preservation copy and documented checksum:

`61903e3bdcdd89bca784fe9fcb327d16fc5068811d63fbce0bb11e41ab60e05a`

All six required audit documents are present. Previously recorded evidence hashes matched before documentation updates. Preserve the unchanged archive, baseline scripts/results, authored audit, structured counts and two reviewed screenshots. Regenerate the documentation evidence manifest to account transparently for this checkpoint's clarifications and correction of the escaped JSON example. No generated question bank, runtime build, browser profile, user export or dependency tree is included.

Counts remain: 289 authored questions; 265 study characters; 115 Scripture records across 66 books; 20 parables; 20 miracles; six composite memorisation passages; 121 built-in memorisation entries; seven question-generator definitions with 425 source×branch units. Counts are distinct, not a sum of interchangeable question types.

## Git and publication protocol

Initial inspection: unborn local branch `work`, no tracked files/commits, untracked docs/ and legacy/. Fetch/push origin is the user-selected `https://github.com/akudoludavid-art/bible-quiz-react-EXpo.git`; read access succeeded with zero advertised refs. Existing Git author configuration is reused. `main` is the branch named in the user's original repository selection; create it by a normal initial push, retain local `work`, and set its upstream to origin/main. No force push, remote replacement, repository creation or deployment.

The initial commit contains the approved preservation/audit files plus this readiness report, security-review metadata and a narrow .gitignore and .gitattributes disabling archive line-ending normalization. Git's content-addressed archive and checksum provide integrity evidence; the local HTML also has write permission removed, but Git does not preserve that read-only filesystem mode.

The commit ID and push outcome cannot truthfully be embedded in their own initial commit. A separate post-operation receipt at `/workspace/source-preservation/FRESH-00.5-CHECKPOINT-RECEIPT.md` and the final response record the actual commit hash, push exit status, freshly fetched/advertised remote main hash and working-tree state. This document describes the checkpoint's intent and checks, not a preemptive claim that publication succeeded. If a remote update is rejected, preserve the local commit and report the actual blocker without force.

## Security review

Enumerated all files proposed for commit and scanned text for private-key headers, common GitHub/AWS token forms, bearer/JWT tokens, credential-bearing URLs and assigned secret values. No matches were found in the original candidate set; a final staged-content scan is required before commit. This is a bounded review, not a proof that every possible secret format can be recognized.

Reviewed screenshot content: original application home only, no browser chrome, account session or personal entries. Runtime evidence has source question IDs, public application text, loopback URLs and clearly synthetic audit fixture IDs. No original-user browser data, raw backup, .env, credential file or browser profile was supplied or included. Local workspace paths in prior evidence are provenance metadata, not authentication. Audit-generated JSON/images are intentional reproducibility evidence. Future private data and common build/test artifacts are excluded by .gitignore; a new export still requires individual review before staging.

## Historical evidence

**UNVERIFIABLE FROM SUPPLIED SOURCE.** Rechecked the workspace and empty authorized remote; no exact v13 HTML or exclusion ledger is accessible. The 425 units are current Scripture generators (115×3 + 20×2 + 20×2). The historical 795 claim is not proven, not the same count and not reinstated content. The arithmetic 265×3 does not establish an old implementation. Two excluded authored records are a separate unresolved issue: their IDs/text/reasons cannot be recovered from the supplied artifact. Do not infer a 291-record original bank.

Needed later: exact v13 HTML with generator definitions; exact pre-exclusion authored bank or two full records with IDs; v13→v14 exclusion/edit ledger and any replacement mappings. See CONTENT_AND_GENERATOR_RECONCILIATION.md. No content was restored, removed, merged or activated.

## Legacy test classification

Prior baseline remains **50 PASS, 1 FAIL** across the two retained harness outputs. No gameplay suite was rerun merely to change its label. The failed custom-inclusion assertion is genuine evidence of a pre-existing functional coverage gap relative to “Quiz your memorisation list”: only built-in single verses are queried even when a valid custom passage is active. It is not a source crash, invalid fixture or migration regression. Custom inclusion is a completeness expectation, not the behavior currently implemented; treating that expectation as a mandatory legacy parity/foundation pass condition would be the wrong assumption.

Retain FAIL and raw evidence unchanged. Future source-parity tests should explicitly model the exclusion; later improvement requires its own authorization/acceptance criteria. Composite passages have the analogous source-level exclusion. No source patch or test weakening was performed. The staged whitespace check reports the original trailing space on HTML line 716; it is intentionally retained to preserve the checksum. Documentation-only whitespace checks pass.

## Original user data

Supported export: manually copied **v3 JSON** with memo object, serialized rot string or null, version14 quizHistory object and custom array. Keys: `bibleMemo_v1`, `bibleQuizRotation_v2`, `bibleMasteryHistory_v14`, `bibleCustomScriptures_v1`. There is no automatic file importer or cloud backup in the original. Missing optional fields may be accepted by the existing parser, but compatibility with unspecified older formats is not established.

Future process: export from the original browser/profile/origin using Progress & Backup; securely retain an untouched JSON file outside Git; validate format and IDs in an isolated destination; preview merge/conflicts; import through a reviewed adapter; compare counts, text/newlines, progress, drafts and history by re-export. Retain both original source/profile and backup until verification succeeds. Browser/file:// origin data cannot be recovered from the HTML alone.

Status: original data **UNKNOWN / NOT MIGRATED**. No personal backup blocks technical foundation or source migration. Its absence blocks recovery of actual personal data and any assertion of successful personal-data continuity. Do not clear the original browser or promise recovery if its storage/export is lost.

## Gate and next-stage recommendation

**FRESH-00: PARTIAL. FRESH-01: CONDITIONAL GO.** Conditions: preservation commit is secured and remote synchronization verified where accessible; original archive/evidence remain intact; historical reconciliation and personal-data recovery stay explicitly open; the next stage is a separately instructed universal foundation only. Historical source/ledger, exhaustive biblical validation, accessibility review, long-term review lifecycle and L01 correction remain deferred. They do not prevent tooling setup, but they prevent an unqualified complete-migration claim.

No Expo, React Native, engine change, question addition, online service or redesign in this checkpoint. Stop after reporting; do not execute FRESH-01 automatically.
