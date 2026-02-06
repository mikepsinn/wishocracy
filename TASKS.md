# Wishocracy Agent Tasks

Tasks are ordered by priority. Work top-to-bottom. Mark status as you go.

## Status Key
- `todo` — not started
- `in_progress` — currently working on
- `done` — completed
- `blocked` — needs human input

---

## P0: Foundation

| # | Task | Status | Notes |
|---|------|--------|-------|
| 1 | Fix build — get `pnpm build` passing for all packages | todo | |
| 2 | Add vitest config to rappa and db packages | todo | |
| 3 | Add tests for `aggregateComparisons()` | todo | Test with paper's Alice scenario |
| 4 | Add tests for `principalEigenvector()` | todo | Verify against known AHP examples |
| 5 | Add tests for `consistencyRatio()` | todo | CR < 0.1 for consistent matrices |

## P1: Core RAPPA Math

| # | Task | Status | Notes |
|---|------|--------|-------|
| 6 | Statistical convergence analysis | todo | How many comparisons → stable weights? |
| 7 | Matrix completion from sparse data | todo | Infer missing pairs transitively |
| 8 | Bootstrap confidence intervals | todo | 95% CI on preference weights |
| 9 | Manipulation resistance analysis | todo | How much can one strategic voter shift results? |

## P2: Alignment & Gaps

| # | Task | Status | Notes |
|---|------|--------|-------|
| 10 | Add tests for alignment scoring | todo | |
| 11 | Add tests for preference gap calculation | todo | |
| 12 | Implement weighted Cosine similarity (alternative to distance) | todo | |
| 13 | Federal budget item catalog (seed data) | todo | Top 20 budget categories from USAspending.gov |

## P3: Data Integration

| # | Task | Status | Notes |
|---|------|--------|-------|
| 14 | Congress API data fetcher | todo | Vote records from ProPublica or congress.gov |
| 15 | USAspending.gov budget fetcher | todo | Actual federal allocations |
| 16 | Politician vote → item mapping | todo | Map bill votes to budget categories |

## P4: Database & API

| # | Task | Status | Notes |
|---|------|--------|-------|
| 17 | Prisma migration setup | todo | Needs DATABASE_URL |
| 18 | Seed script with federal budget items | todo | |
| 19 | API routes for submitting comparisons | todo | |
| 20 | API route for preference weights | todo | |
| 21 | Random pair selection algorithm | todo | Optimal sampling strategy from paper |

## P5: Documentation & Examples

| # | Task | Status | Notes |
|---|------|--------|-------|
| 22 | README with worked example | todo | Alice's federal budget scenario |
| 23 | CLI tool for running RAPPA on CSV data | todo | |
| 24 | Example: Federal budget with 20 categories | todo | Full pipeline demo |
