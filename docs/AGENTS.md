# Documentation — Agent Rules

> Extends the root [AGENTS.md](../AGENTS.md). Read the root document first for project-wide rules.

---

## Purpose

**All project documentation lives in this directory.** This is the single location for design documents, feature specifications, deployment guides, architecture decision records, and any other technical writing.

---

## Directory Structure

```text
docs/
├── SYSTEM_DESIGN.md       ← High-level architecture & system design
├── FEATURES.md            ← Feature requirements, user stories, milestones
├── DESIGN.md              ← Tech stack decisions & design rationale
├── DEPLOYMENT.md          ← Deployment runbook & server setup guide
└── adr/                   ← Architecture Decision Records
    └── 0001-*.md          ← Individual ADR files
```

---

## Rules

### 1. All Docs Go Here
- **Every documentation file (`.md`) must live under `docs/`.** The only exceptions permitted at the repo root are:
  - `README.md` (project overview)
  - `CONTRIBUTING.md` (contributor guide)
  - `AGENTS.md` files (agent rules at any directory level)
- If you are writing a new document (API reference, runbook, design spec, meeting notes, postmortem), it belongs in `docs/`.

### 2. Architecture Decision Records (ADRs)
- Place ADRs in `docs/adr/`.
- Use sequential numbering: `0001-short-title.md`, `0002-short-title.md`.
- ADR format:
  ```markdown
  # ADR-NNNN: Title

  ## Status
  Accepted | Superseded by ADR-XXXX | Deprecated

  ## Context
  What is the issue or decision being addressed?

  ## Decision
  What was decided and why?

  ## Consequences
  What are the trade-offs and implications?
  ```

### 3. Updating Documentation
- When making architectural changes, **update the relevant docs in the same PR**. Do not defer documentation to a follow-up.
- Keep `SYSTEM_DESIGN.md` and `FEATURES.md` as living documents — update them as the system evolves.
- When referencing docs from other files (README, CONTRIBUTING, issue templates), use relative paths from the repo root: `docs/SYSTEM_DESIGN.md`.

### 4. Formatting
- Use GitHub-Flavored Markdown.
- Include Mermaid diagrams for architecture and flow visualizations.
- Use tables for structured comparisons.
- Keep line lengths reasonable for readability in code review diffs.
