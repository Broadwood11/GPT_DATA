---
name: seller cockpit
description: Create a single-page “seller cockpit” that merges a partner playbook + Spike chat into one workflow.

---

# Skill Instructions

**Purpose**
- Create a single-page “seller cockpit” that merges a partner playbook + Spike chat into one workflow (read on the left/center, draft on the right).
- Keep the UI dense but not cluttered; optimize for “copy, paste, send” in under 60 seconds.

**Repo Pattern**
- Route: `app/spike-{partner}/page.tsx` should be a thin wrapper that renders `./seller-cockpit`.
- Layout: add `app/spike-{partner}/layout.tsx` to set metadata + a consistent font (Manrope is the current standard for partner cockpits).
- API: keep `app/api/spike-{partner}/chat/route.ts` aligned with the shared contract (`messages`, optional `promptId`, optional `focusTags`).
- Prompt library: create `lib/spike/{partner}PromptLibrary.ts` with categorized prompts (see “Prompt Library” below).

**Single-Page Cockpit Layout**
- Use a 3-column grid on desktop: `nav (sticky)` + `playbook content` + `Spike panel (sticky)`.
- Use a 2-column grid when the Spike panel is collapsed: `nav` + `content`.
- For mobile/tablet, keep the playbook readable and present Spike as a floating composer that can expand to a full-screen panel.
- Best practice: start Spike collapsed by default (floating composer). Expand only when the seller clicks `Expand` or applies a prompt from the playbook.

**Spacing + Width (Anti-Clutter)**
- Avoid huge side gutters on wide displays; prefer a full-width container (`w-full max-w-none`) with responsive padding over a hard max-width cap.
- Prefer tighter vertical rhythm: reduce “hero” padding before adding more sections; aim for 1 primary CTA per section.
- Keep the playbook scannable: short paragraphs, lists, and “cards” over long prose blocks.

**Spike Panel (Right Rail)**
- Goal: the chat composer and Send/Submit button must be visible without scrolling the page.
- Use a viewport-based height for the dock container (example: `lg:h-[calc(100vh-7rem)]`) and avoid fixed `min-height` values that can push the composer off-screen.
- Make the message transcript the only scroll region (`overflow-y-auto`), keeping the composer pinned at the bottom via a flex column layout.
- Default UX: collapsed Spike uses a fixed floating composer with `Expand`, `Prompt Library`, and `Submit`; expanded Spike becomes a sticky right rail on desktop and a full-screen modal on mobile.
- Default to a compact header: show the kicker and utility buttons; hide large titles and heavy explanatory text.
- Remove or disable “Active prompt” summary cards in the right rail (they add visual noise). If needed, show prompt context inline in the drafted message or as a small badge elsewhere.

**ChatPanel Configuration (Recommended Defaults)**
- For compact right-rail usage:
  - `variant="compact"`
  - `headerDescription=""`
  - `headerTitle=""` (or omit entirely if your component supports it)
  - `showActivePromptCard={false}` (hide the active prompt block)
  - Keep only essential header actions: `Prompt Library`, `Reset Chat`, and an explicit `Close` when the panel is modal/overlay.

**Playbook Source of Truth**
- Start from the partner HTML playbook (example: `app/spike-nutanix/nutanix.html`) and translate its information architecture into React components.
- Keep IDs and section anchors stable (`#hook`, `#plays`, etc.) so navigation remains predictable.
- Avoid embedding raw HTML directly unless there is a strong reason (maintainability and styling consistency matter more than perfect pixel matching).

**Prompt Library (Structure)**
- Use `PromptCategory[]` with a small number of high-signal categories (typical: Education, Sales Plays, Events).
- UI requirement: prompt `title` renders as a compact bolded entry in the library (not a large header), so keep titles short and scannable.
- Each prompt must have:
  - `id` (stable, unique; include partner prefix)
  - `title`, `summary`, `categoryId`
  - `audience`, `tone`
  - `inputs` (explicit placeholder list)
  - `recommendedTags` (for retrieval filtering)
  - `safety` (non-negotiable constraints)
  - `qa` (checklist the model must satisfy)
  - `template` (the instruction block inserted into the composer)

**Prompt Template Formatting (Space-Efficient)**
- Do not use Markdown headings like `##` inside templates (they waste vertical space in the composer).
- Use bold section labels instead:
  - `**Context**`
  - `**Structure**`
  - `**Style Locks**`
  - `**Output Guidance**`
  - `**Safety**`
  - `**QA**`
- Keep templates skimmable: bullets, short sentences, and explicit constraints.

**Prompt Template Content Rules**
- Always include a one-line opener stating the collaboration context (example: “For an IGEL + {partner} collaboration.”).
- Require that placeholders are resolved in the final output (no leftover bracket tokens).
- Ban ungrounded claims:
  - No pricing/licensing, roadmap, or contractual statements.
  - No invented metrics, certifications, or customer stories.
- Force product-name accuracy and acronym definitions on first use.
- Prefer “pilot-oriented” language over guarantees (validate, confirm, baseline, measure).

**Tagging + Retrieval Guidance**
- `recommendedTags` should map to how sellers search (example: `frame`, `ahv`, `flow`, `talktrack`, `objections`, `roi`).
- Keep tag sets small (3–8) and consistent across prompts for the same partner.
- Use tags as `focusTags` to filter knowledge-base retrieval when available.

**UX Interactions**
- Provide “apply prompt” actions from playbook sections (buttons that prefill the composer with the best prompt + optional extra context).
- When applying a prompt, auto-expand and scroll the Spike panel into view.
- Ensure keyboard support:
  - `Ctrl/Cmd+Enter` sends in the collapsed composer.
  - Focus-visible rings on interactive elements.

**Quality Bar (What “Good” Looks Like)**
- A seller can pick a play, click one button, and get a usable talk track/email in under 1 minute.
- The Spike panel feels calm: minimal header, no redundant boxes, composer always visible.
- Prompts are deterministic and checkable via `**QA**` bullets, not vague instructions.

**Common Pitfalls**
- Over-wide gutters that waste space and make the cockpit feel cramped.
- Fixed/min heights that push the composer off-screen.
- Templates with long Markdown headers, repeated disclaimers, or multi-screen instruction blocks.
- Prompt IDs that drift over time (breaking deep links and `applyPrompt` calls).
