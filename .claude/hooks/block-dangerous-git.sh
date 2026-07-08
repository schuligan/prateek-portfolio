#!/bin/bash
# Portfolio guardrail — blocks history-destroying + tree-wiping commands.
# Normal `git push` (feature branches) is ALLOWED so the CI/CD loop works.
# `main` is additionally protected server-side via GitHub branch protection.

INPUT=$(cat)
COMMAND=$(echo "$INPUT" | jq -r '.tool_input.command')

DANGEROUS_PATTERNS=(
  "push .*--force"
  "push .*-f( |$)"
  "push --force"
  "force-with-lease"
  "reset --hard"
  "git clean -f"
  "git clean -fd"
  "git branch -D"
  "git checkout \."
  "git restore \."
  "rm -rf"
  "rm -fr"
  "rm -r -f"
  "git push .*origin .*main"
  "git push .*origin .*master"
)

for pattern in "${DANGEROUS_PATTERNS[@]}"; do
  if echo "$COMMAND" | grep -qE "$pattern"; then
    echo "BLOCKED: '$COMMAND' matches protected pattern '$pattern'. Destructive/direct-to-main git and recursive deletes are disabled. Use a feature branch + PR." >&2
    exit 2
  fi
done

exit 0
