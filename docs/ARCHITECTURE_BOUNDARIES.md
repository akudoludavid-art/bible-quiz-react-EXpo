# Architecture boundaries — design notes only

No Expo scaffold, production module extraction, screen rewrite, backend, multilingual system or multiplayer has been implemented. These are candidates for later authorized stages; future paths in the parity matrix are proposals.

## Carry forward and separate

| Boundary | Preserve / candidate pure inputs and outputs | Rewrite or isolate later |
| --- | --- | --- |
| Canonical knowledge | Stable entity IDs, aliases, directed graph relations, explicitness and citations; distinguish actors, orderers and reported claims | Expand the currently partial graph only through editorial evidence; do not auto-derive a complete ontology from character display names |
| Verified question records | All 289 original records, correct option IDs, 4 options, rationale, provenance, groups and reference strings; retain original archive | Typed schemas and validation; keep source approval metadata separate from newly verified editorial state |
| Selection / generation | Authored eligibility, weights and constraints; Scripture generator families/IDs; rotation state transformations; inject RNG/clock for deterministic tests | Separate DOM/localStorage from pure selector; do not conflate bag and weighted-history policies or turn generator units into authored content |
| Scoring / session rules | Correct option ID vs Scripture exact-text semantics; +1, lock, result bands, elapsed timer, stop/replay | Explicit state transitions and UI rendering; preserve baseline mechanics unless separately authorized |
| Memorisation | Topic inputs, normalization/diff, cumulative plan, thresholds, grade/interval logic, pause and draft semantics | Separate state calculations from DOM, mutable library and storage; cross-platform inputs, clock and persistence adapters |
| Versioned taxonomy | Current 33 categories, 4 levels, 4 eras, 3 testament scopes, book labels, English topic regexes and identity mappings | Explicit taxonomy version/migrations; maintain historical IDs rather than label-based regeneration |
| Storage / backup | Four exact legacy keys and v3 wrapper, stable IDs, raw custom text, collision handling, timestamps, exposure vs correctness | Versioned adapters for web/native; strict import validation, preview and reversible migration; keep old backups and archive read-only |
| Presentation/assets | Valid journeys, meaning, focus/labels, attribution, icon/mascot intent | DOM/global handlers/innerHTML/CSS to universal RN components and Expo Router later; accessibility parity across platforms |

Boundaries are not an implementation plan for this task. Main engine is already an exported pure API (274–307) except default RNG/time; Storage14 and Rotation still touch browser APIs. Memo is a closure with DOM, state and persistence intermixed, so later extraction requires behavioral fixtures before changes. `KNOWLEDGE_GRAPH` and `rankDistractors` are not currently wired into gameplay authoring. Avoid reactivating unused `hardNames`, blank active/fact bag keys or hypothetical old generators.

## Future product design constraints

- **Server authority:** offline Solo Quiz can remain local. Any competitive online mode eventually needs server-owned session roster, canonical question version, answer evaluation, deadlines, scores and replay protection. Local history and client-supplied scores must not become competitive truth. No server or schema implemented here.
- **Question exposure:** current local app embeds all correct answers. Future competitive delivery should reveal only permitted questions/options and disclose answers after closure; replay and reconnect contracts need decisions. Deterministic seeds do not by themselves hide answers. Preserve exposure counts separately from attempts/correctness.
- **Mastery:** memorisation's box>=5 is a local review status; quiz streak/accuracy is another measure. Self-rated recitation is explicitly self-reported. No unified or competitive mastery model is present; design separately without overwriting existing progress meaning.
- **Editorial verification:** preserve source provenance/revision and license. New verification should record reviewer, corpus/edition, exact passage and scope/ambiguity. Keep historical exclusions quarantined until the missing ledger is supplied. Do not label structurally valid records newly fact-checked.
- **Game registration:** future registry could identify Solo authored quiz, Scripture recognition and memorisation as distinct rule/version contracts. No gameplay registry exists in the HTML, and no multiplayer lobby/match/session table is implied by local bag names.
- **Four-language expansion:** languages were not specified in the supplied source. Choose locales later; preserve stable content/entity/option IDs independent of translated labels. Store translation provenance/version and adapt normalization, tokenization and reference aliases per language. Existing ASCII/English heuristics cannot be assumed multilingual. No translated text generated.
- **Multiplayer:** future public target is Solo + online Multiplayer, but original app has no online implementation. Separate design decisions for reconnects, timing, fairness, answer disclosure, moderation and persistence are required. No Supabase, auth, payments or speculative service installed.

## Safe carry-forward policy

The archived HTML remains the immutable behavior/content baseline. Preserve valid content and personal-data contracts even if appearance is redesigned later. Treat L01–L06 as known original limitations; a later corrective change needs explicit acceptance criteria and must not be presented as unchanged parity. Source archive integrity, runnable evidence and documented gaps are prerequisites for extraction. Historical reconciliation and original-user backup must finish before claiming complete content or personal-data migration.
