# Edit Link possession is the sole ownership model — no accounts

Comparable tools (e.g. Mysterious Note) gate creation behind a login. The Netrunner Handout Generator has no user accounts instead: a GM's only proof of ownership over a Device Instance is possessing its secret Edit Link. The creating browser additionally saves its own Edit Links to `localStorage` as a convenience list, but this is not a recovery mechanism.

Chosen to keep the tool frictionless for GMs who just want to hand out a prop, and to avoid building and maintaining auth infrastructure for a hobby-scale tool.

## Consequences

Losing an Edit Link (and clearing local storage) means losing edit access permanently — there is no account-based recovery path. A new Device Instance must be created instead.
