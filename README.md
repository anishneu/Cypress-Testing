# Cypress Testing — Talon Vault

End-to-end UI test suite for [Talon Vault(EAMS)](https://github.com/anishneu/Enterprise-Asset-Management-System-PLM), covering authentication, form building, navigation, and the document approval workflow.

This repo exercises Talon Vault's React frontend the way a real user would — logging in, filling out forms, driving the drag-and-drop form builder, and pushing a document all the way through its Draft → Review → Approved lifecycle. Rather than one-off scripts, it's organized as reusable custom commands layered under focused spec files, so a multi-step flow like "build a form, create a document, submit it, approve it" reads as a handful of readable commands instead of a wall of raw Cypress calls.

**Stack:** Cypress 12.6.0 · TypeScript · Mocha/Chai (via Cypress)

**Author:** Anish Kuila

## Table of contents
- [What it does](#what-it-does)
- [Architecture](#architecture)
- [Scale](#scale)
- [Install](#install)
- [Quickstart](#quickstart)
- [Project structure](#project-structure)
- [Test suite reference](#test-suite-reference)
- [Custom commands](#custom-commands)
- [Limitations](#limitations)

## What it does

```
Spec files ──▶ [Custom Commands] ──▶ [Cypress Runner] ──▶ Talon Vault (localhost:3000)
                     │                       │
        ┌────────────┼───────────────┐      ▼
        ▼            ▼               ▼   Assertions on DOM state,
   Navigation    Form Builder    Doc Workflow   URL, and success/error
   (sidebar/     (drag-drop      (draft →       modals
    submenus)     field add)     review →
                                  approved)
```

Each spec targets one screen or flow of the app — login, registration, form validation, menu navigation, form creation, or the document approval pipeline — and asserts against real rendered UI (field visibility, labels, types, button states, page titles) rather than mocked responses. Multi-step flows (building a form template, creating a document, routing it through approval) are composed from the shared command layer in `cypress/support/commands.ts`, so the same building blocks get reused instead of duplicated per test.

## Architecture

| Layer | Technology |
|---|---|
| Test runner | Cypress 12.6 |
| Language | TypeScript |
| Assertions | Mocha/Chai (bundled with Cypress) |
| Test data | JSON fixtures (`cypress/fixtures/`) |
| Target app | Talon Vault frontend, `http://localhost:3000` |

## Scale

Numbers below are counted directly from the codebase, not estimated:

| Metric | Count |
|---|---|
| Spec files | 8, across 3 feature areas |
| Individual test cases (`it` blocks) | 155 |
| Custom Cypress commands | 15 |
| Fixture files | 2 |

## Install

Requires Node 18+ and a running instance of Talon Vault's frontend on `http://localhost:3000`.

```bash
git clone https://github.com/anishneu/Cypress-Testing.git
cd Cypress-Testing
npm install
```

## Quickstart

```bash
# Interactive test runner (recommended while writing/debugging specs)
npx cypress open

# Headless run of the full suite (CI-style)
npx cypress run
```

Cypress is configured (`cypress.config.js`) with `baseUrl: http://localhost:3000`, a 10s default command timeout, and `testIsolation: false` so multi-step flows (e.g. login once, then navigate across several specs) can share session state within a suite.

## Project structure

```
Cypress-Testing/
├── cypress/
│   ├── e2e/
│   │   ├── administration/   Login content checks, form input/submit,
│   │   │                     user registration, form validation
│   │   ├── navigation/        Sidebar menu and submenu navigation
│   │   ├── formcreate/        Login + drag-drop Formbuilder flow
│   │   └── documents/         Document creation → review → approval
│   ├── fixtures/               Test user credentials, sample data
│   └── support/
│       ├── commands.ts         Reusable custom commands (navigation,
│       │                       document lifecycle, modal handling)
│       └── e2e.ts               Global support file, loads commands
├── cypress.config.js
├── package.json
└── tsconfig.json
```

## Test suite reference

Grouped by feature area (see `cypress/e2e/` for full test steps):

| Suite | File | Covers |
|---|---|---|
| testsuite-001 | `login_page_content_checks.spec.ts` | Login page field, label, and button content |
| testsuite-002 | `login_forminput_submit.spec.ts` | Entering credentials and submitting the login form |
| — | `user_registration_page_check.spec.ts` | Registration page fields, labels, and form contents |
| — | `user_registration_submit.spec.ts` | Filling and submitting a new user registration |
| testsuite-006 | `form_validation.spec.ts` | Required-field validation and Register button enablement |
| testsuite-007 | `menu_navigation.spec.ts` | Sidebar menu/submenu navigation via custom commands |
| testsuite-005 | `formcreation.spec.ts` | Login, Formbuilder field library, and saving a new form |
| testsuite-008 | `document_workflow.spec.ts` | Draft creation, submission for review, and approval |

## Custom commands

The command layer in `cypress/support/commands.ts` wraps recurring UI interactions so specs read as intent rather than raw selectors:

```
navigateToDashboard / Parts / Documents / Forms / Formbuilder /
SavedForms / Training / Approvals / Users   ──▶ sidebar navigation
createDocumentFormTemplate                  ──▶ builds a form for doc creation
createDocumentDraft                          ──▶ creates a Draft-status document
submitDocumentForReview                      ──▶ routes a document into Approvals
approvePendingDocument                       ──▶ approves from the queue
closeSuccessModal                            ──▶ dismisses success/confirmation dialogs
```

Every command is typed via a `Cypress.Chainable` interface declaration, so autocomplete and type-checking work the same as any first-party Cypress command.

## Limitations

- Assumes Talon Vault's frontend is already running locally on port 3000 — no app bootstrapping is scripted here.
- No CI workflow configured yet (e.g. GitHub Actions).
- `video` and `screenshotOnRunFailure` are both disabled in `cypress.config.js`, so failures currently rely on terminal/log output rather than artifacts.
- Test data (users, form values) lives in static fixtures rather than being seeded per run.

## License

MIT — see [LICENSE](LICENSE).
