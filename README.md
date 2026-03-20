# The ROSE Network

**ICA Resettlement & Support for Employment 'Rose' Network**

The official website of The ROSE Network — the Intelligence Corps Association's professional network supporting the career transition, employment, and professional development of the Corps family: Regulars, Reserves, Veterans, and immediate family.

**Live site:** [www.therosenetwork.co.uk](https://www.therosenetwork.co.uk)

## Site Structure

| Route | Page |
|---|---|
| `/` | Homepage — three-pillar overview, governance, get involved |
| `/transition` | Pillar 1: Transition support for Service Leavers |
| `/professional-network` | Pillar 2: The civilian professional network |
| `/enterprise` | Pillar 3: Enterprise engagement |
| `/events` | The Rose RV monthly networking + ROSE Forums |
| `/about` | Chairman profile (Stephen James) |
| `/contact` | Contact form (HubSpot) + info sidebar |
| `/about/constitution` | Network constitution |
| `/brand-guidelines` | Visual identity and component reference (noindex) |
| `/privacy-policy` | Privacy policy |
| `/cookie-policy` | Cookie policy |
| `/terms-of-use` | Terms of use |
| `/404` | Custom 404 page |

## Tech Stack

- **Type:** Static HTML/CSS/JS (no framework)
- **Hosting:** Vercel (clean URLs enabled via `vercel.json`)
- **Styling:** Single stylesheet (`css/style.css`) with CSS custom properties
- **Fonts:** Spectral (headings) + Figtree (body) via Google Fonts
- **Forms:** HubSpot embedded forms (EU region)
- **Analytics:** Google Tag Manager with Consent Mode v2
- **Cookie consent:** Custom banner with localStorage persistence

## Project Structure

```
├── index.html                  # Homepage
├── transition.html             # Transition pillar
├── professional-network.html   # Network pillar
├── enterprise.html             # Enterprise pillar
├── events.html                 # Events (Rose RV + Forums)
├── about.html                  # Chairman profile
├── contact.html                # Contact page
├── brand-guidelines.html       # Brand & component reference
├── about/
│   └── constitution.html       # Network constitution
├── privacy-policy.html         # Legal pages
├── cookie-policy.html
├── terms-of-use.html
├── 404.html                    # Custom 404
├── css/
│   └── style.css               # All styles
├── assets/
│   ├── rose-network-logo-horizontal.png
│   ├── rose-network-logo-portrait.png
│   ├── stephen-james-headshot.png
│   ├── sandhurst.jpg
│   └── favicon.ico
├── output/
│   └── email-signature.html    # HTML email signature template
├── vercel.json                 # Vercel config (clean URLs)
└── CLAUDE.md                   # Project context for AI assistants
```

## Design

- **Aesthetic:** British institutional prestige meets modern editorial design
- **Colour palette:** Dark teal (`#1A3A4A`), gold accent (`#C4975C`), sage (`#3D6B56`), ICA red (`#B82E35`), warm off-white background (`#F7F5F0`)
- **Tone:** Professional, supportive, military-aware, accessible
- **Language:** British English throughout

## Development

No build step required. Open any `.html` file directly or serve locally:

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

## Deployment

Pushes to `main` auto-deploy to Vercel. Clean URLs are enabled — `/about.html` serves at `/about`.

## Managed By

[Hermes Digital UK](https://hermesdigital.co.uk/) on behalf of the Intelligence Corps Association.

**Parent organisation:** Intelligence Corps Association — Registered Charity No. 1175211 (England & Wales)
