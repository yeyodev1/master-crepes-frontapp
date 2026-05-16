# Master Crepes – FrontApp

Vue 3 + TypeScript + Vite frontend for Master Crepes, a French crêperie in Doral, FL.

## Stack

- **Framework:** Vue 3 (Composition API, `<script setup>`)
- **Build:** Vite
- **Styles:** SCSS (scoped per component), shared vars in `src/styles/`
- **i18n:** vue-i18n — all user-facing strings live in `src/locales/en.json` and `src/locales/es.json`
- **Package manager:** pnpm

## Project Structure

```
src/
  components/
    catering/     # CateringForm, CateringHero, CateringInfo
    contact/      # ContactForm, ContactHero, ContactInfo
    franchises/   # FranchiseForm, FranchiseBenefits, FranchiseComingSoon, FranchiseHero
    home/         # HeroSection, WelcomeSection, MenuHighlights, CateringTeaser
    layout/       # TheHeader, TheFooter, TheTopBar
    ui/           # CustomDatePicker, CustomTimePicker, PhoneInput, WhatsAppButton
  locales/        # en.json, es.json — ALL copy lives here
  views/          # Page-level components
  styles/         # Global SCSS, color/layout variables
  services/       # GHL (GoHighLevel) API, httpBase
```

## Business Info

- **Business:** Master Crepes
- **Address:** 3905 NW 107th Ave Suite 106, Doral, FL 33178
- **Phone:** (786) 478-2727
- **Toll-free:** +1 (866) 827-3737
- **Email:** info@themastercrepes.com
- **Instagram:** https://www.instagram.com/mastercrepesdoral/
- **Facebook:** https://www.facebook.com/mastercrepes1/
- **Online orders:** https://order.toasttab.com/online/master-crepes-new-3905-nw-107th-ave-106

## Images

- Primary Cloudinary cloud: **`dz6qozi9i`** (May 2026 onwards). Folders: `master-crepes/crepes/`, `master-crepes/cafe/`, `master-crepes/bebidas/`, `master-crepes/otros/`
- Legacy cloud: `dpjzfua3n` (still referenced by `gallery`, `contact`, `franchises`, `catering`, `bio` views — pending migration)
- New photoshoot manifest: `photos-pixieset-2026.json` (78 photos, source: gastronofoto.pixieset.com/mastercrepes2)
- All image URLs should use Cloudinary public URLs
- Old URLs from `www.themastercrepes.com/wp-content/uploads/` are broken — do not use
- **Client rule (Apr 2026):** Home page must show only crêpes. Café/bebidas live in `/restaurante` only. NEVER mix salads/non-crêpe foods on the home page.

## Key Rules

- Never edit copy directly in `.vue` files — add/edit keys in `src/locales/*.json`
- All phone numbers must be real: `(786) 478-2727` and `+1 (866) 827-3737`
- Address must always be: `3905 NW 107th Ave Suite 106, Doral, FL 33178`
- Use `pnpm` (not npm or yarn)

## Dev Commands

```bash
pnpm dev       # Start dev server
pnpm build     # Production build
pnpm preview   # Preview build
```

# CLAUDE.md - Token Efficient Rules

1. Think before acting. Read existing files before writing code.
2. Be concise in output but thorough in reasoning.
3. Prefer editing over rewriting whole files.
4. Do not re-read files you have already read unless the file may have changed.
5. Test your code before declaring done.
6. No sycophantic openers or closing fluff.
7. Keep solutions simple and direct.
8. User instructions always override this file.

# context-mode — MANDATORY routing rules

You have context-mode MCP tools available. These rules are NOT optional — they protect your context window from flooding. A single unrouted command can dump 56 KB into context and waste the entire session.

## BLOCKED commands — do NOT attempt these

### curl / wget — BLOCKED
Any Bash command containing `curl` or `wget` is intercepted and replaced with an error message. Do NOT retry.
Instead use:
- `ctx_fetch_and_index(url, source)` to fetch and index web pages
- `ctx_execute(language: "javascript", code: "const r = await fetch(...)")` to run HTTP calls in sandbox

### Inline HTTP — BLOCKED
Any Bash command containing `fetch('http`, `requests.get(`, `requests.post(`, `http.get(`, or `http.request(` is intercepted and replaced with an error message. Do NOT retry with Bash.
Instead use:
- `ctx_execute(language, code)` to run HTTP calls in sandbox — only stdout enters context

### WebFetch — BLOCKED
WebFetch calls are denied entirely. The URL is extracted and you are told to use `ctx_fetch_and_index` instead.
Instead use:
- `ctx_fetch_and_index(url, source)` then `ctx_search(queries)` to query the indexed content

## REDIRECTED tools — use sandbox equivalents

### Bash (>20 lines output)
Bash is ONLY for: `git`, `mkdir`, `rm`, `mv`, `cd`, `ls`, `npm install`, `pip install`, and other short-output commands.
For everything else, use:
- `ctx_batch_execute(commands, queries)` — run multiple commands + search in ONE call
- `ctx_execute(language: "shell", code: "...")` — run in sandbox, only stdout enters context

### Read (for analysis)
If you are reading a file to **Edit** it → Read is correct (Edit needs content in context).
If you are reading to **analyze, explore, or summarize** → use `ctx_execute_file(path, language, code)` instead. Only your printed summary enters context. The raw file content stays in the sandbox.

### Grep (large results)
Grep results can flood context. Use `ctx_execute(language: "shell", code: "grep ...")` to run searches in sandbox. Only your printed summary enters context.

## Tool selection hierarchy

1. **GATHER**: `ctx_batch_execute(commands, queries)` — Primary tool. Runs all commands, auto-indexes output, returns search results. ONE call replaces 30+ individual calls.
2. **FOLLOW-UP**: `ctx_search(queries: ["q1", "q2", ...])` — Query indexed content. Pass ALL questions as array in ONE call.
3. **PROCESSING**: `ctx_execute(language, code)` | `ctx_execute_file(path, language, code)` — Sandbox execution. Only stdout enters context.
4. **WEB**: `ctx_fetch_and_index(url, source)` then `ctx_search(queries)` — Fetch, chunk, index, query. Raw HTML never enters context.
5. **INDEX**: `ctx_index(content, source)` — Store content in FTS5 knowledge base for later search.

## Subagent routing

When spawning subagents (Agent/Task tool), the routing block is automatically injected into their prompt. Bash-type subagents are upgraded to general-purpose so they have access to MCP tools. You do NOT need to manually instruct subagents about context-mode.

## Output constraints

- Keep responses under 500 words.
- Write artifacts (code, configs, PRDs) to FILES — never return them as inline text. Return only: file path + 1-line description.
- When indexing content, use descriptive source labels so others can `ctx_search(source: "label")` later.

## ctx commands

| Command | Action |
|---------|--------|
| `ctx stats` | Call the `ctx_stats` MCP tool and display the full output verbatim |
| `ctx doctor` | Call the `ctx_doctor` MCP tool, run the returned shell command, display as checklist |
| `ctx upgrade` | Call the `ctx_upgrade` MCP tool, run the returned shell command, display as checklist |
