# Storage and backup inventory

Status: VERIFIED-IN-SOURCE unless explicitly labeled otherwise. All runtime tests used synthetic data in fresh disposable browser contexts. **No personal data was supplied, recovered or migrated.**

## Complete application storage keys

| Exact key | Shape and fields | Source / use |
| --- | --- | --- |
| `bibleMasteryHistory_v14` | `{version:14, session, items:{[questionId]:record}}`; record: attempts, correct, incorrect, exposures, lastSeenSession, lastSeenAt, streak, lastAnsweredCorrectly | 278,290–303,714–716,718–742; shown questions and answers |
| `bibleQuizRotation_v2` | `{bags:{[poolKey]:{remaining:string[],seen:string[],recent:string[],inflight:string[]}}}`; recent capped60 | 629–698; Scripture shuffle bag plus prior legacy bags retained |
| `bibleMemo_v1` | `{items:{[scriptureId]:record}}`; cs=current part, ls=ladder stage, bl=blank level, fl=failed learning attempts, box=-1 learning/0–6 review, due=epoch ms, diff=difficulty counter, lapses, tn=typed attempts, ts=accuracy sum, tb=best accuracy, up=last promotion time, added=epoch ms, active=boolean; optional draft | 908,936–941,1005–1024,1036–1067 |
| `bibleCustomScriptures_v1` | Array of `{id,book,verse,text}`; derived ref,vs,nt,tp,custom are rebuilt | 908,919–935,1146–1167 |

No other localStorage key, sessionStorage, IndexedDB, cookie-based profile or file database implementation was found. Runtime test-only `audit-fixture*` keys are not application keys and lived only in disposable contexts.

IDs: built-in single = `book|ref`; composite = `P|book ref`; custom = `U|timestamp|random`; restored collision appends `|restored-timestamp-count`. Scripture question = `S|book|ref|book/ref/fill`, parable = `P|name|name/ref`, miracle = `M|name|name/ref`. Rotation pool keys: `scr:all`, `scr:ot`, `scr:nt`, `scr:parables`, `scr:miracles`, `scr:memo`, `scr:book:<book>`. Main quiz home also releases empty initial `activeKey`/`factKey`, so an empty-string bag may occur as harmless residue; do not treat every bag as a game registration.

Draft shapes: blanks `{key,blankIndices,values}`; typed modes `{key,text,ref}`. `key` contains part/stage/mode and blank level where relevant. Drafts save on input and clear on check/advance. Unknown item IDs can remain stored but disappear from visible lists because library membership is required. Old v11 records lacking active remain active (`active!==false`). No source implementation of remote cloud sync or active session resume exists.

## Backup export and restore

Only one explicit user export format was found: JSON text in the Progress & Backup textarea, copied manually. No automatic file download/import picker. Current shape:

```json
{
  "v": 3,
  "memo": {
    "items": {}
  },
  "rot": "{\"bags\":{}}",
  "quizHistory": {
    "version": 14,
    "session": 0,
    "items": {}
  },
  "custom": []
}
```

`rot` is a serialized JSON **string** or null, not an embedded object. `memo` preserves its in-memory record fields including drafts. The format supports custom text/newlines. A syntactically valid empty example above is a schema illustration, not a backup of user data.

Restore (312–324,1177–1184): recursive JSON reviver rejects `__proto__`, `prototype`, `constructor`. Require memo.items object and integer box in [-1,6] for incoming records; require custom array if present and nonempty string book/verse/text with U|-prefixed ID. No top-level v enforcement, comprehensive numeric field validation or reference/corpus check. Missing custom/quizHistory fields are tolerated; this is not proof of all older-version compatibility.

Existing per-ID memo progress wins; missing incoming IDs are added. Custom ID collision with different contents retains both records by remapping incoming to a restored ID; repeated same collision reuses matching restored content. Imported progress follows that new ID when available. Top-level memo fields merge incoming over current. History is sanitized to version14/nonnegative finite fields; local record wins when attempts >= incoming attempts; max session wins. Existing v2 rotation wins; incoming rotation is accepted only when no current rotation exists and parsed bags is object-like. It is not a merge of two rotation histories.

Storage14.commit records previous values, writes keys then attempts rollback on any error and alerts. This is best-effort, not a transactional browser database. Rotation's own save catches silently. In-memory state changes can outlive failed saves in some memo paths. Preserve these risks in future tests; never claim persistence solely from a visible UI state.

## Origin and personal-data preservation

UNKNOWN: whether the original device has any saved data. HTML uploads contain no runtime localStorage values. Browser storage is scoped to scheme/host/port and browser profile; file:// storage is browser-dependent and can change with file path. A cloud HTTP origin, future PWA origin and Android/iOS app sandbox cannot automatically read the original file-origin data. Clearing browsing data, losing the profile/device or replacing the original file can make unexported data irrecoverable.

Safe later procedure, requiring the original app/device: keep the original HTML and profile intact; open the working app at its original origin; visit Scripture Memorisation → Progress & Backup; copy the entire JSON to a separate secure file and retain an untouched copy. Record source version/origin/date without publishing private content. Validate schema in a disposable destination, show a merge/conflict preview, compare IDs/counts/text/newlines/progress/drafts, perform a reviewed import and re-export for comparison. Keep the original backup until restoration is verified. Do not paste private backups into public commits or clear/reset original storage to troubleshoot.

Missing originals are a prerequisite for claiming user-data migration, not for documenting the source or building a later empty foundation. No credentials/backend are needed for this original local-only app. Test fixtures are clearly synthetic and no personal backup file was created.

## Validation scope

PASS: multiline custom export, all four v3 fields, same-backup roundtrip without duplication, custom collision retention and original progress precedence, dangerous-key rejection, one simulated quota rollback, blank draft reload and pause/resume, custom edit/delete. NOT RUN: all malformed legacy field combinations, browser-wide storage denial, rollback itself failing, original file:// behavior or actual user's backup. Schedule pure-function fixtures do not prove multi-week real-user behavior.

## FRESH-00.5 readiness clarification

Missing personal backups do **not** block technical migration or the FRESH-01 foundation. They block recovery/verification of that user's actual progress and any claim that personal data has migrated. Keep legacy keys, ID mappings and importer requirements documented until a secure export is available; do not require private backup content in Git. The JSON example above was corrected for escaping in this checkpoint; the original HTML and backup implementation are unchanged.
