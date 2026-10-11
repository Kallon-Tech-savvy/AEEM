# Issue tracker: GitHub

Issues and specs for this repo live as GitHub issues on `Kallon-Tech-savvy/aeem`.

**Use `gh api` REST calls, not the friendly `gh issue ...` commands.** GitHub GraphQL is blocked in Claude Code sessions, and `gh issue create`, `view`, `list`, `edit` and `comment` use GraphQL. Plain `gh api repos/...` calls work.

## Conventions

- **Create an issue**: `gh api -X POST repos/Kallon-Tech-savvy/aeem/issues -f title="..." -f body="..." -f 'labels[]=ready-for-agent'`. Use `-F body=@file.md` for multi-line bodies. The response includes `number` (the `#n`) and `id` (the database id used for sub-issues and blocking).
- **Read an issue**: `gh api repos/Kallon-Tech-savvy/aeem/issues/<n>` and `gh api repos/Kallon-Tech-savvy/aeem/issues/<n>/comments`.
- **List issues**: `gh api 'repos/Kallon-Tech-savvy/aeem/issues?state=open&labels=ready-for-agent&per_page=100'`. This endpoint also returns pull requests; drop entries that have a `pull_request` key.
- **Make an issue a sub-issue of a parent**: `gh api -X POST repos/Kallon-Tech-savvy/aeem/issues/<parent>/sub_issues -F sub_issue_id=<child-db-id>`. Without sub-issues, put `Part of #<parent>` at the top of the child body.
- **Comment on an issue**: `gh api -X POST repos/Kallon-Tech-savvy/aeem/issues/<n>/comments -f body="..."`
- **Apply / remove labels**: `gh api -X POST repos/Kallon-Tech-savvy/aeem/issues/<n>/labels -f 'labels[]=...'` / `gh api -X DELETE repos/Kallon-Tech-savvy/aeem/issues/<n>/labels/<label>`
- **Close**: `gh api -X PATCH repos/Kallon-Tech-savvy/aeem/issues/<n> -f state=closed -f state_reason=completed`, after commenting.

## Blocking

Use GitHub's native issue dependencies:

`gh api -X POST repos/Kallon-Tech-savvy/aeem/issues/<child>/dependencies/blocked_by -F issue_id=<blocker-db-id>`

`<blocker-db-id>` is the blocker's numeric database id (`gh api repos/Kallon-Tech-savvy/aeem/issues/<n> --jq .id`), not the `#number` or `node_id`. A ticket is unblocked when every blocker is closed. If the endpoint is unavailable, fall back to a `Blocked by: #<n>, #<n>` line at the top of the child body.

## Numbering

Issues and pull requests share one number space, so a bare `#42` may be either. Check `gh api repos/Kallon-Tech-savvy/aeem/issues/42`: a `pull_request` key means it is a PR.

## Pull requests as a triage surface

**PRs as a request surface: no.** _(Set to `yes` if this repo treats external PRs as feature requests.)_

## When a skill says "publish to the issue tracker"

Create a GitHub issue as above. Publish blockers first so each ticket's blocking edges can reference real database ids.

## When a skill says "fetch the relevant ticket"

Read it as in **Read an issue** above.
