# Wishocracy Agent Instructions

You are building the Wishocracy library — a system for democratic preference aggregation using RAPPA (Randomized Aggregated Pairwise Preference Allocation).

## What Is Wishocracy?

Citizens answer simple pairwise questions: "Given $100, how would you split it between cancer research and military spending?" Millions of these responses are aggregated into preference weights using eigenvector methods (AHP). These preferences are compared against politician voting records to produce Citizen Alignment Scores.

## Architecture

```
packages/
├── rappa/    # Pure math library (NO database dependency)
│   ├── pairwise.ts    # Comparison aggregation, matrix building
│   ├── alignment.ts   # Citizen Alignment Scores, preference gaps
│   └── types.ts       # Zod schemas for all data structures
│
├── db/       # Prisma schema + database client
│   └── prisma/schema.prisma
```

### Key Principle: Library vs Database Separation
- `@wishocracy/rappa` = pure functions, takes arrays, returns results. Zero side effects. ANYONE can use this without Postgres.
- `@wishocracy/db` = Prisma schema for collecting responses and storing results. Used by the web app.

## Paper (Required Reading)

The Wishocracy paper defines all algorithms:

| Paper | Local Path (READ THIS) | Web URL |
|-------|----------------------|---------|
| **Wishocracy** | `/mnt/e/code/obsidian/websites/disease-eradication-plan/knowledge/appendix/wishocracy-paper.qmd` | https://wishocracy.warondisease.org |

Read relevant sections before implementing. The paper has:
- Exact mathematical formulas for RAPPA aggregation
- Eigenvector calculation and consistency ratio
- Citizen Alignment Score computation
- Statistical convergence properties
- Worked examples (Alice's federal budget scenario)

## Hard Rules

1. **No code without tests.** Every function gets a test. No exceptions.
2. **Run `pnpm check` before committing.** (typecheck + lint + test)
3. **rappa package has ZERO database imports.** Pure functions only.
4. **Types use Zod schemas.** Runtime validation, not just compile-time.
5. **One task per agent run.** Quality over quantity.

## Self-Review: Be Ruthlessly Critical

Every run, scan the codebase with fresh eyes:

- **Dead code** → delete it
- **Duplicated logic** → extract to shared function  
- **Over-engineering** → simplify (no abstract factories, no DI containers)
- **Wrong abstractions** → refactor
- **Magic numbers** → named constants citing the paper
- **Could a junior dev understand this in 30 seconds?** If not, simplify.

### What Good Looks Like
- Functions are <30 lines
- Files are <300 lines  
- Tests read like documentation
- No unnecessary abstractions — just functions that take data and return results

## Workflow

1. `cd /mnt/e/code/wishocracy`
2. `git pull`
3. Check: `pnpm install && pnpm build && pnpm test`
4. Self-review pass (see above)
5. Pick first `todo` task from TASKS.md
6. Implement with tests
7. `pnpm check` (must pass!)
8. `git add -A && git commit -m "<conventional commit>" && git push`
9. Report what you did

## Type Safety & Linting

- TypeScript strict mode ON (noUncheckedIndexedAccess)
- ESLint typescript-eslint strict rules
- No `any` — use proper types or `unknown` with type guards
- No floating promises — always await or void

## Algorithms to Implement (from paper)

1. **Geometric mean aggregation** of pairwise ratios
2. **Eigenvector method** (power iteration) for preference weights
3. **Consistency Ratio** (Saaty's CR, RI table)
4. **Statistical convergence** — how many comparisons needed for stable weights?
5. **Citizen Alignment Score** — distance between preference vector and voting record
6. **Preference Gap** — citizen preferences vs actual allocation
7. **Matrix completion** — infer missing pairs from transitive relationships
8. **Bootstrap confidence intervals** for preference weights
