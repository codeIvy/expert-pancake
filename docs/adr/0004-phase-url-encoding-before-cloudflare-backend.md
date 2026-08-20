# Build client-side URL-encoded sharing before the Cloudflare backend

Two feasible approaches were designed for "GM edits and shares a device": (1) encode the customized content directly in the share URL (base64 JSON in the hash), requiring no backend and deployable as a static site; (2) a Cloudflare Workers + Durable Objects backend giving short opaque links, server-side persistence, and the full Edit/Player Link + expiry model described in ADR 0002 and ADR 0003. `celld`, a self-hosted alternative to Durable Objects, was evaluated and rejected as too much operational overhead for this hobby-scale project.

Rather than building the Durable Objects backend first, the URL-encoding approach ships first as a zero-infrastructure MVP; the Workers/Durable Objects backend is a later phase.

## Consequences

The URL-encoding phase cannot fully implement the Edit Link/Player Link separation or the 3-month expiry model as specified in ADR 0002 and ADR 0003 — those describe the target state once the backend phase lands, not the initial build.
