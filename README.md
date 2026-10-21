# Workser documentation

Mintlify documentation for Workser, the proactive AI workforce, plus Workser Code, the desktop app and security information. `docs.json` controls navigation. Product guides use MDX.

## Preview and validate

Use Node.js 22 LTS. The installed Mintlify CLI rejects Node.js 25 and newer.

```bash
mint dev --no-open
mint validate --telemetry=false
mint broken-links --telemetry=false
```

On a Mac with Homebrew Node 22 installed, select that runtime for the command:

```bash
PATH="/opt/homebrew/opt/node@22/bin:$PATH" mint validate --telemetry=false
```

`mint dev` normally uses port 3000. If the marketing app already uses it, select another available port. Do not stop the existing app just to preview documentation.

## Product sources

When updating a claim, check the current source in the surrounding Workser workspace:

| Documentation | Source to verify |
| --- | --- |
| AI workforce positioning, FAQ and key facts | `web/workser-web/src/constants/faq.ts`, `src/lib/seo/llms-text.ts` (the site's `/llms-full.txt`) and `src/app/(marketing)/blog/posts.ts` |
| AI agent roles and teams | `web/workser-web/src/app/(marketing)/ai-agents/ai-agents-copy.ts` and `src/lib/computer-web/workforce-templates.pure.ts` |
| Use cases and comparisons | `web/workser-web/src/app/(marketing)/for/segments.ts` and `compare/competitors.ts` (dated, sourced facts: link, don't copy) |
| Automations, Company knowledge, side panel tabs | `web/workser-web/src/lib/computer-web/automation-browse.pure.ts`, `brain-thread.pure.ts` and `src/design/one/react/chat/side-tabs.pure.ts` |
| Workser Code positioning and role groups | `web/workser-web/src/app/code/page.tsx`, `feature-sections.tsx`, `data.ts` and `faq.tsx` |
| Published plans, allowances and cloud rates | `web/workser-web/src/constants/pricing.ts` and `src/app/(marketing)/pricing/page.tsx` |
| Supported agents and app creation options | `on-device/computer-use-ai-agent/workser-desktop-ai-agent/src/app/orbit/lib/agents.ts` and `useAppTypes.ts` |
| Mobile store availability | Desktop `src/app/orbit/components/PublishMobileDialog.tsx` |
| Role configuration and approvals | Desktop `src-electron/orbit/daemon/agent-roles.ts` and `approval.ts` |
| CLI syntax and owner-only refusals | `cli/workser-cli/src/commands/` |
| SDK methods | `workser-sdk/src/resources/connect.ts`, `agents.ts` and `src/index.ts` |
| Built-in coding-agent billing | Core API `src/modules/orbit/orbit-agent-gateway.service.ts` and `gateway-pricing-catalog.ts` |
| Live statistics definitions | Core API `src/modules/public-stats/` and web `src/lib/platform-stats.ts` |
| Cloud overage activation | Core API `src/modules/subscription/subscription-usage-reconciliation.service.ts` and the configured organization billing meters |

The detailed public plan documentation lives in `ai-workforce/plans-and-credits.mdx`; `code/pricing.mdx` covers only what is specific to building and hosting apps. Other pages should link to them rather than maintain another full allowance table. Use the owner's words: Task (not job), Automations (not Routines or Duties), Company knowledge, Logins, Stuck, and "AI agent", never "assistant". Keep the published offer separate from live account entitlements, provider terms and Enterprise agreements.

## September 6, 2026 audit follow-ups

This update documents current product source and published marketing data. It does not change backend entitlements, deploy services or activate billing.

- The earlier read-only billing audit in this work session found Spark file storage missing in live configuration (falling back to 0 GB), against the published 5 GB. It also found Spark and Starter app limits of 2 and 4 against published 5 and 10. Those discrepancies still need an explicit product decision and a separate backend change; do not silently rewrite live customer allowances as part of a docs edit.
- The database and file overage meter price configuration was empty in that audit. Publishing $1.25/GB and $0.15/GB rates does not activate automatic Stripe charging. Egress is published at $0.50/GB; verify its metering path separately before claiming it is actively charged.
- Store submission remains disabled in the desktop's `STORE_ROUTE_ENABLED` flag. Hidden app types are not launch promises.
- Platform totals are aggregate operational evidence, not Workser Code-only adoption, revenue, active users or paying customers. Keep counts on the dated live product display rather than copying a quickly stale number into prose.
- Existing web AI Employee controls, local coding-agent controls and deployed SDK authorization are different execution paths. Do not describe one as covering all three.

Recheck these observations before resolving them; live configuration can change independently of this repository. Never store credentials, customer records or environment values in documentation.

## Publishing

The repository's Mintlify integration may publish pushes to its configured branch. Validate and review before pushing. Editing or locally validating these files does not publish them.
