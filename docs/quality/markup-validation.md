# Markup validation report

Generated: 2026-11-04

Rendered DOM of every route was captured with Playwright (headless Chrome) and checked
with the [W3C Nu HTML Checker](https://validator.w3.org/nu/). Line numbers refer to the
serialized DOM snapshot, not to the React sources.

| Route | Errors | Warnings | Info |
| --- | ---: | ---: | ---: |
| `/` | 0 | 0 | 5 |
| `/employees` | 0 | 0 | 4 |
| `/shift` | 0 | 0 | 4 |
| `/payroll` | 0 | 0 | 4 |
| `/tasks` | 0 | 0 | 4 |
| `/analytics` | 0 | 0 | 5 |
| `/vacation` | 0 | 0 | 4 |
| `/sick-days` | 0 | 0 | 4 |
| `/chat` | 0 | 0 | 2 |
| `/restaurants` | 0 | 0 | 1 |
| `/login` | 0 | 0 | 1 |
| `/tables` | 0 | 0 | 4 |
| `/tables/7` | 0 | 0 | 1 |
| `/orders` | 0 | 0 | 5 |
| `/statistics` | 0 | 0 | 5 |
| **Total** | **0** | **0** | **53** |

## Home (`/`)

No errors or warnings.

## Employees (`/employees`)

No errors or warnings.

## Shift (`/shift`)

No errors or warnings.

## Payroll (`/payroll`)

No errors or warnings.

## Tasks (`/tasks`)

No errors or warnings.

## Analytics (`/analytics`)

No errors or warnings.

## Vacation (`/vacation`)

No errors or warnings.

## Sick days (`/sick-days`)

No errors or warnings.

## Chat (`/chat`)

No errors or warnings.

## Restaurants (`/restaurants`)

No errors or warnings.

## Login (`/login`)

No errors or warnings.

## Admin · Tables (`/tables`)

No errors or warnings.

## Admin · Table order (`/tables/7`)

No errors or warnings.

## Admin · Orders (`/orders`)

No errors or warnings.

## Admin · Statistics (`/statistics`)

No errors or warnings.

## CSS

Checked with the [W3C CSS Validator](https://jigsaw.w3.org/css-validator/)
(CSS level 3, SVG profile, warnings enabled).

| Stylesheet | Errors | Warnings |
| --- | ---: | ---: |
| `src/index.css` | 4 | 7 |
| `dist/assets/index-CAB7Cp9e.css` | 64 | 63 |
| `dist/assets/restaurants-page-vh-t_kPv.css` | 13 | 21 |

The validator has not been updated for Tailwind CSS v4 syntax, so its findings are
informational. All reported errors come from Tailwind-specific constructs the validator
does not understand — unrecognized at-rules (`@theme`, `@custom-variant`, `@property`,
`@container`, …), parse errors on `@apply`, and modern properties or values
(`pointer-events`, `clip-path`, `margin-trim`, …). Totals:
57 unrecognized at-rules, 20 unknown
properties/values. The stylesheets are compiled by Tailwind and Vite without warnings,
so these reports are false positives rather than defects.

