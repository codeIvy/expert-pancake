# Netrunner Handout Generator

A web app (Cloudflare Workers + Durable Objects) that lets a GM pick one of the existing device props, customize its text/images, and get a shareable link to hand out as a physical/digital prop at their own table.

## Language

**Device Template**:
One of the existing static device props (WhatsApp, Email, PalmOS Launcher, WH40K Dataslate, Elevator Control, Security Camera, Building Management Terminal, Architect's Terminal) that defines a device's visual style and content shape.
_Avoid_: App, page (when referring to the customizable prop type)

**Device Instance**:
A single GM-customized copy of a Device Template. One instance corresponds to exactly one shareable device — this phase does not support bundling multiple devices behind a single link. Remains accessible via its Edit Link and Player Link for 3 months; a GM who wants it to outlive that window uses Standalone Export.
_Avoid_: Campaign, bundle, project

**Edit Link**:
The secret URL that lets its holder (the GM) modify a Device Instance's content. Possession of the link is the only proof of ownership — there are no user accounts in this phase.
_Avoid_: Admin link, owner link

**Player Link**:
The public URL a GM shares with their players. Opens the Device Instance in read-only, content-only form.
_Avoid_: Share link, view link, public link

**Puzzle Layer**:
The locked-screen + breach-animation wrapper used by some Device Templates in the original static prototype (Elevator Control, Security Camera, Building Management Terminal, Architect's Terminal). Out of scope for the Device Instance generator — Device Instances always render their underlying content directly, with no lock screen.
_Avoid_: Hacking minigame, lock screen (as a feature name)

**Standalone Export**:
A downloadable, self-contained copy of a Device Instance's current content that a GM can save offline or embed in campaign documents, independent of the live Edit Link / Player Link. Mechanics (file format, snapshot behavior) still being decided.
_Avoid_: Download, backup
