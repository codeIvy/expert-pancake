# Device Instances expire after 3 months of inactivity, offset by Standalone Export

Status: describes the target state of the Cloudflare Workers + Durable Objects–backed phase (see ADR 0004 for phasing). **Not implemented in Phase 1**: the URL-encoding MVP has no server-side persistence, no expiry clock, and no Standalone Export — those features land with the backend phase. Standalone Export is explicitly out of scope for Phase 1 (not just "mechanics undecided" — it does not exist yet).

To keep storage and cleanup simple, a Device Instance's Edit Link and Player Link stay live for 3 months from its last edit; every edit resets the clock. At expiry the instance is hard-deleted — no soft-expiry or retention grace period. Standalone Export exists specifically so a GM can save a permanent offline copy before that window lapses, and the Edit page displays the current expiry date so GMs can act before losing access.

## Considered Options

Keeping instances indefinitely. Rejected once Standalone Export existed as an equivalent permanence mechanism — indefinite server-side storage adds ongoing cost and cleanup complexity that the export button makes unnecessary.
