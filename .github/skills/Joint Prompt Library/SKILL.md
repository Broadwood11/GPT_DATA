---
name: Joint Prompt Library
description: Create a page to host joint prompts for an IGEL partner portal. 

---

# Skill Instructions

IGEL + [Partner] Joint Prompt Library — Best Practices
===============================================================================

Audience
--------
Coding agents and LLM-driven systems producing customer-facing collateral
(sales, marketing, events, education) across IGEL + [Partner] collaborations.

Purpose & Scope
---------------
• Establish a canonical, reusable prompt library with uniform structure.
• Ensure predictable LLM behavior through consistent format-seeding and tone-locking.
• Exclude all internal engineering notes — this library is strictly external-facing.

Library Architecture
--------------------
Top-Level Groups (fixed):
• Education
• Sales Plays
• Events

Use tags to introduce subtopics; do not create new top-level groups.

Canonical Prompt Entry Format
-----------------------------
Each prompt MUST follow the structure below. This ensures formatting stability and 
predictable continuation behavior in all downstream LLMs.

id: igel-[partner]-[group]-[short-name]
title: short, outcome-oriented
summary: 1–2 sentences describing intent + when to use
category: Education | Sales Plays | Events
audience: customer | partner SE | BDR | event attendee

actionLabel: short UI label
recommendedTags: 3–6 tags
tone: concise, confident, professional, technically accurate

safety:
  - No pricing, roadmap, unverifiable claims, or invented PII.
  - Joint-value statements must remain benefit-oriented, not guaranteed outcomes.
  - Ensure brand accuracy for IGEL + [PARTNER].

qa:
  - Length limits enforced when specified.
  - CTA present (if required).
  - Spelling and placeholders validated.
  - Structure matches the template exactly.
  
UI Display Requirement (Prompt Library)
--------------------------------------
The prompt `title` must render as a compact, bolded entry in the Prompt Library UI (not as a large header).
- Keep titles short and scannable; avoid multi-line, poster-style titles.
- Prefer ~60 characters or fewer when possible.


Writing Standards by Category
-----------------------------

Global Rule
-----------------
Start each prompt with IGEL + [partner] collaboration so the LLM can retrieve the relevant context. 


Education Prompts
-----------------
Education Prompts should be designed to educate the end user on the [Partner] on IGEL and our joint offering. 

• Define acronyms and simplify technical concepts.  
• Follow a “foundation → frame → example” hierarchy for conceptual clarity.  
• Contrast IGEL + [Partner] approach with common alternatives.  
• Maintain precision; avoid internal jargon.

Always include the following:
• Domain glossary of joint terms

Sales Plays
-----------

• Include persona-specific hooks, objections, flips, customer outcomes, AND proof points.  
• Emails capped at ≤150 words unless otherwise specified.  
• Keep copy modular and translatable across channels.  
• Use strong action verbs with high semantic impact (Amplify, Distill, Calibrate, Elevate, Optimize, Synthesize).  
• Include: elevator pitches, talk tracks, prospecting emails, questions to ask, objection handling, persona-specific positioning (CIO, CISO, IT Manager, CFO).

Events
------
• Include who, what, why, when, where, and CTA.  
• Clearly identify content type: invite | reminder | follow-up.  
• Keep all logistics editable via placeholders.  
• Highlight related assets or recordings when relevant.

Partner & Placeholder Conventions
---------------------------------
• Placeholders (e.g., [PARTNER]) are used only in prompt templates.
  The generated output must always resolve placeholders into the actual
  partner name (e.g., “IGEL + Omnissa”) and never surface placeholders
  to the end reader.

Tone & Style
------------
• Customer-ready, concise, confident.  
• Model the structure you want the model to output — formatting is part of the instruction.  
• Use rhythm-limited sentences to control verbosity.  
• Maintain a consistent tone; avoid shifts that may propagate into generated content.

Quality & Safety Checklist
-------------------------- 
• No invented names, quotes, or PII.  
• Correct IGEL + [Partner] spellings.  
• Format-seed (structure) remains stable and reproducible.  
• QA block ensures clarity and correctness BEFORE output is generated.

File & Naming Hygiene
---------------------
• Store this guidance as plain text (.txt).  
• One prompt per file/object.  
• Always suffix variants (-email, -slides, -call-track).  
• Maintain a changelog line: “Updated YYYY-MM-DD: [what changed].”

Promptcraft Rules
---------------------------------------
• Action-first promptwriting for behavioral priming.  
• Structural discipline modeled on Pillars → Architecture → Evidence.  
• High-signal verbs + compact phrasing for clarity and precision.  
• Consistency with system-level persona and format meta-rules.  
• Inquiry-grade emphasis on clarity, recency relevance, and reasoning coherence.

Final Notes
-----------
This document is the gold master reference for IGEL + [Partner] prompt creation.  
All new prompts, variants, or extensions must trace their structure back to this standard to ensure cross-partner consistency, predictable LLM behavior, and unified communication quality.
