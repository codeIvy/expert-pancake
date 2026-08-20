# Reuse existing device prototypes as Device Templates

The static device props built for the "Веретено" tabletop handout (WhatsApp, email client, PalmOS launcher, WH40K dataslate, elevator control, security camera, BMS terminal, architect's terminal) already have working, tested visual styles and content-rendering logic. Rather than rebuilding these UIs from scratch for the Netrunner Handout Generator, the generator wraps them directly: their hardcoded `EDIT HERE` constants become values injected from GM-provided content instead.

## Considered Options

Rebuilding each Device Template fresh inside the generator app. Rejected — it would duplicate already-working code and risk visual drift between the standalone prototypes and the generator's rendered output.
