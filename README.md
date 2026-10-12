# Life Source Church Kenya — website

A fast, mobile-friendly static website for **Life Source Church Kenya — An Oasis of Healing**.
Plain HTML, CSS and JavaScript: no build step, no frameworks, and no external fonts or CDNs, so it
loads quickly even on slow mobile data and can be hosted anywhere for free.

## Pages

| File | What it is |
| --- | --- |
| `index.html` | Home — welcome, **next gathering** card, weekly events, what we're about, first-visit guide |
| `about.html` | Our name, mission & vision, what we believe, values |
| `events.html` | Weekly gatherings in detail, with **Add to calendar** buttons |
| `contact.html` | Contact details, map, and a message / prayer-request form |
| `404.html` | Friendly "page not found" page |

## Weekly events

- **Tuesday Prayers** — every Tuesday, 8:00 – 9:00 pm
- **Thursday Bible Study** — every Thursday, 8:00 – 9:00 pm

All times are East Africa Time (EAT). The home page's "Up next / Happening now" card is calculated in
Kenyan time, whatever time zone the visitor is in. Each event has *Google Calendar* and
*Apple / Outlook (.ics)* buttons that create a **weekly recurring** event.

### Changing or adding an event

Each event is an `<article class="event-card" data-event ...>` block (in `index.html` and `events.html`):

```html
<article class="event-card event-card--tue" data-event
         data-title="Tuesday Prayers"
         data-day="2" data-start="20:00" data-end="21:00"
         data-desc="Shown in calendar invites">
```

- `data-day`: `0` = Sunday, `1` = Monday … `6` = Saturday
- `data-start` / `data-end`: 24-hour time in Kenyan time (`20:00` = 8:00 pm)

To add one (for example a Sunday service), copy an existing card, change those values and the visible
text. The "next gathering" card and calendar buttons pick it up automatically. Don't forget the
"Weekly gatherings" list in the footer (every page) and on `contact.html`.

> **Assumption to check:** Thursday Bible Study was given as "8:00 to 9:00" — I've shown it as **8:00 – 9:00 pm**,
> the same as Tuesday. Change it if that's not right.

## Add your contact details (do this first)

Open **`js/site-config.js`** and fill in the phone, WhatsApp, email, address, map and social links.
They appear automatically in the footer, on the Contact page and in calendar invites.
**Anything left empty is hidden**, so the site never shows blank or broken details. Until you add them,
the Contact page shows a friendly "details are being updated" note and hides the message form. The form
opens a pre-written message in **WhatsApp** and/or **email** (whichever you configure) — there's no
server to run and no spam inbox to manage.

## Logo and colours

The logo mark in `img/` was **traced to SVG from the image supplied** (the original file wasn't
available to the build), and the name is live text in the logo's blue-to-gold gradient:

- `img/logo-mark.svg` — full colour (used on light backgrounds)
- `img/logo-mark-light.svg` — light-cross version (used in the footer and in dark mode)
- `img/favicon.svg` — browser-tab icon

To use the original artwork instead, replace those SVGs with exported versions (a transparent-background
SVG is ideal; the header expects a tall, narrow mark, about 26 × 50 px — adjust `.brand img` in
`css/styles.css` if yours differs). Brand colours are the variables at the top of `css/styles.css`
(`--brand` blue, `--accent` gold). The site follows each visitor's light / dark mode setting.

## Content to review

The wording on **About** (mission, vision, statement of belief, values) and the descriptions of each
gathering are **drafts written in a general, mainstream Christian voice** — please have your pastors
review and edit them so they reflect your church's own beliefs. Scripture quotations are from the NIV.

## Not included yet (needs your input)

- **Giving** (e.g. M-Pesa Paybill / Till details) — send the details and a Give page can be added.
- **Leadership / pastors** and **photos** — add when you have names and pictures.
- **Sunday service** — the schedule only lists the two midweek events provided.
- **Link-preview image** — for WhatsApp/Facebook previews, add once the domain is known:
  `<meta property="og:image" content="https://YOUR-DOMAIN/img/preview.png">` (1200 × 630 px).

## Preview locally

```sh
python3 -m http.server 8000     # then open http://localhost:8000
```

(Or just double-click `index.html`.)

## Publish for free

Upload the whole folder to any static host:

- **GitHub Pages** — Settings → Pages → deploy from the branch root.
- **Netlify** or **Cloudflare Pages** — connect the repo (no build command, publish directory `/`), or drag-and-drop the folder.

`404.html` carries its own styles but uses root-relative links (`/img/…`, `/`), so it is complete on a
custom domain; on a `username.github.io/repo` address its logo and "home" link would point at the wrong place.
