# Life Source Church Kenya — website

A fast, mobile-friendly static website for **Life Source Church Kenya — An Oasis of Healing**.
Plain HTML, CSS and JavaScript: no build step, no frameworks, and no external fonts or CDNs, so it
loads quickly even on slow mobile data and can be hosted anywhere for free.

## Pages

| File | What it is |
| --- | --- |
| `index.html` | Home — welcome, **next gathering** card, weekly events, pastors, what we're about, first-visit guide |
| `about.html` | Our name, **our pastors**, mission & vision, what we believe, values |
| `events.html` | Sunday service and midweek gatherings in detail, with **Add to calendar** buttons |
| `give.html` | **M-PESA till number** with a copy button and step-by-step instructions |
| `contact.html` | Contact details, map, and a message / prayer-request form |
| `404.html` | Friendly "page not found" page |

## Weekly schedule

All times are East Africa Time (EAT).

| Gathering | When |
| --- | --- |
| **Sunday Service** | Every Sunday, 9:30 am – 12:30 pm: **prayers** from 9:30, **worship** 10:00 – 11:00, **sermon** 11:00 – 12:30 |
| **Tuesday Prayers** | Every Tuesday, 8:00 – 9:00 pm — **online on Google Meet** |
| **Thursday Bible Study** | Every Thursday, 8:00 – 9:00 pm — **online on Google Meet** |

The home page's "Up next / Happening now" card is calculated in Kenyan time, whatever time zone the
visitor is in. Each event has *Google Calendar* and *Apple / Outlook (.ics)* buttons that create a
**weekly recurring** event.

### Changing or adding an event

Each event is an `<article class="event-card" data-event ...>` block (in `index.html` and `events.html`):

```html
<article class="event-card event-card--tue" data-event
         data-title="Tuesday Prayers"
         data-day="2" data-start="20:00" data-end="21:00"
         data-desc="Shown in calendar invites">
```

- `data-day`: `0` = Sunday, `1` = Monday … `6` = Saturday
- `data-online`: present on events held online (Tuesday and Thursday). Online events get the Google Meet link as their
  calendar location and a "Join on Google Meet" button; events without it (Sunday) use the church's map location.
- `data-start` / `data-end`: 24-hour time in Kenyan time (`20:00` = 8:00 pm). Sunday Service uses `09:30` – `12:30`.

To add one, copy an existing card, change those values and the visible text. The "next gathering" card
and calendar buttons pick it up automatically. Don't forget the "Weekly gatherings" list in the footer
(on every page) and on `contact.html`.

> **Assumptions to check**
> - Thursday Bible Study was given as "8:00 to 9:00" — shown as **8:00 – 9:00 pm**, like Tuesday.
> - No end time was given for Sunday prayers, so the service is shown as one block, **9:30 am – 12:30 pm**,
>   with prayers *starting* at 9:30 (and worship following at 10:00).

## Giving (M-PESA)

The Buy Goods **till number 157 8373** is on `give.html`. If it ever changes, search that file for `157`
and update every occurrence (the big number, the how-to step and the page description). The copy
button reads the number from the page, so it updates automatically.

The page tells givers to check the business name on the M-PESA confirmation screen before they confirm —
worth making sure your till is registered under a name your church family will recognise.

## Pastors

**Pastor Millicent Kaunda** and **Pastor Sospeter Kaunda** are listed on `about.html` (and mentioned on
the home page). They currently show monogram circles. To add photos, replace each
`<div class="avatar" aria-hidden="true">MK</div>` with
`<img class="avatar" src="img/pastor-millicent.jpg" alt="Pastor Millicent Kaunda">` (square photos, at least 220 px, work best).
Bios, titles (e.g. "Senior Pastor") and a short welcome message can be added to those cards too.

## Contact details

Everything lives in **`js/site-config.js`**. What's set so far:

- **Email:** `info@lifesourcechurch254.co.ke` — shown on the Contact page and in the footer of every page, and it
  powers the contact form's **Send via email** button.
- **Google Maps location:** the pin is "Life Source Church 254" (see *The map* below).

- **Google Meet link:** `meetUrl` — the link for the online Tuesday and Thursday meetings
  (`https://meet.google.com/vti-ypyp-hys`). It powers the **Join on Google Meet** buttons on the Home, Events and
  Contact pages, the join button in the home page's "Up next / Happening now" card, and the location in the
  calendar invites. It's the same link every week; to change it, edit `meetUrl` in `js/site-config.js`.

Still empty: **phone**, **WhatsApp** and the **street address** text. Add them there and they appear
automatically in the footer, on the Contact page and in calendar invites. **Anything left empty is hidden**, so
the site never shows blank or broken details. The contact form opens a pre-written message in **WhatsApp**
and/or **email** (whichever are configured) — there's no server to run and no spam inbox to manage — and its
small print adjusts to match. Adding a WhatsApp number also switches on a "Send via WhatsApp" button.

> The email address only works if the mailbox exists. Make sure `info@lifesourcechurch254.co.ke` is set up with
> an email provider (many registrars include mailboxes, or use Zoho / Google Workspace) and send yourself a test
> message. If you later connect the domain to this website, keep the provider's **MX** records when adding the
> website's `A` / `CNAME` records.

### The map

`mapEmbedUrl` is the live map on the Contact page and `mapLinkUrl` is the "Get directions" link used on the
Contact, Home and Events pages, the footer and calendar invites. The embedded map currently shows Google's
**satellite** view; to show the normal road map instead, change `!5e1` to `!5e0` in the `mapEmbedUrl` value.
To change the location, use Google Maps → Share → **Embed a map** (copy only the `src="…"` address) and Share →
**Copy link**.

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

- **Photos** of the church, services and pastors.
- **Street address as text** (optional) — the map and "Get directions" link are already set up; add `address` in
  `js/site-config.js` if you'd also like the written address to show.
- **Link-preview image** — for WhatsApp/Facebook previews, add once the domain is known:
  `<meta property="og:image" content="https://YOUR-DOMAIN/img/preview.png">` (1200 × 630 px).

## Preview locally

```sh
python3 -m http.server 8000     # then open http://localhost:8000
```

(Or just double-click `index.html`.)

## Publishing (GitHub Pages)

The site is published with **GitHub Pages**, set to **Deploy from a branch** (the repository's default
branch, `/ (root)` folder). Live address: **https://pizzatechies.github.io/lifesource/**

**Every push to the default branch republishes the site automatically**, usually within a minute or two.
You can watch it under the repository's **Actions** tab (a run called *pages build and deployment*); a green
tick means it's live. There is nothing to build or upload by hand.

- **Seeing your changes:** after the run finishes, hard-refresh the page (Ctrl/Cmd + Shift + R, or reopen the
  tab). Browsers can hold on to the old CSS/JS for up to ~10 minutes, so edits to `js/site-config.js`
  (your contact details) may take a little longer to appear for visitors.
- **Everything in the repository's root folder is public** at the site address (and the repository itself is
  public), so never commit passwords or private information.
- The setting lives at **Settings → Pages → Build and deployment**. If you ever rename the default branch
  (for example to `main`), check that **Source** still points at the new branch name.
- **Custom domain: not connected for now.** The site runs at **https://pizzatechies.github.io/lifesource/**. When
  you're ready to use your own domain (`lifesourcechurch254.co.ke`), first make the DNS records below work at
  your domain registrar (the company you bought the domain from), and only then connect it in GitHub — doing
  it in this order avoids the site disappearing while DNS catches up:

  | Type | Name / Host | Value |
  | --- | --- | --- |
  | A | `@` (the bare domain) | `185.199.108.153` |
  | A | `@` | `185.199.109.153` |
  | A | `@` | `185.199.110.153` |
  | A | `@` | `185.199.111.153` |
  | CNAME | `www` | `pizzatechies.github.io` |

  Remove any old "parking page" or "URL forwarding" records for the same names, and make sure the domain's
  nameservers are the ones where you added the records. DNS changes can take from a few minutes up to 48
  hours. Then go to **Settings → Pages → Custom domain**, enter the domain and press **Save** (GitHub adds a
  `CNAME` file to the repository by itself). When it shows *DNS check successful*, tick **Enforce HTTPS**.
  The `github.io` address then redirects to your domain automatically. **To disconnect the domain again:**
  Settings → Pages → Custom domain → **Remove**. If GitHub's records ever change, its guide
  *"Managing a custom domain for your GitHub Pages site"* always has the current ones.

`404.html` is fully self-contained (inline logo and styles), so it displays correctly at any depth. On a
`*.github.io/<repo>/` address its "Back to the home page" button automatically points at `/<repo>/`; on a
custom domain it points at `/`.

### Other hosts

The folder is plain static files, so it also works on **Netlify** or **Cloudflare Pages** (no build
command, publish directory `/`) or by drag-and-drop.
