/* ==========================================================================
   Life Source Church Kenya — site behaviour
   Progressive enhancement only: every page is fully readable without this.
   ========================================================================== */
(function () {
  "use strict";

  var CFG = window.SITE_CONFIG || {};
  var DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  var ICS_DAYS = ["SU", "MO", "TU", "WE", "TH", "FR", "SA"];
  // Kenya (East Africa Time) is UTC+3 all year round — there is no daylight saving.
  var EAT_OFFSET_MIN = 180;
  var WEEK_MIN = 7 * 24 * 60;

  function $(sel, root) { return (root || document).querySelector(sel); }
  function $$(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }
  function pad(n) { return (n < 10 ? "0" : "") + n; }

  /* ---------- Icons (injected so the HTML stays small) ---------- */
  var ICONS = {
    clock: '<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>',
    calendar: '<rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>',
    "calendar-plus": '<rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/><line x1="12" y1="14" x2="12" y2="18"/><line x1="10" y1="16" x2="14" y2="16"/>',
    repeat: '<polyline points="17 1 21 5 17 9"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/><polyline points="7 23 3 19 7 15"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/>',
    pin: '<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>',
    phone: '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>',
    mail: '<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>',
    chat: '<path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>',
    book: '<path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>',
    heart: '<path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>',
    drop: '<path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/>',
    users: '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
    hand: '<path d="M18 11V6a2 2 0 0 0-4 0v-1a2 2 0 0 0-4 0v1a2 2 0 0 0-4 0v8"/><path d="M6 13v-2a2 2 0 0 0-4 0v4a8 8 0 0 0 8 8h2a8 8 0 0 0 8-8v-4a2 2 0 0 0-4 0"/>',
    arrow: '<line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>',
    send: '<line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>',
    download: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>',
    video: '<polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/>',
    sun: '<circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>'
  };

  $$("[data-icon]").forEach(function (el) {
    var path = ICONS[el.getAttribute("data-icon")];
    if (!path) return;
    el.innerHTML =
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" ' +
      'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">' + path + "</svg>";
  });

  /* ---------- Mobile navigation ---------- */
  var header = $(".site-header");
  var toggle = $(".nav-toggle");
  var nav = $("#site-nav");

  function setNav(open) {
    if (!toggle || !nav) return;
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    nav.classList.toggle("open", open);
  }
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      setNav(toggle.getAttribute("aria-expanded") !== "true");
    });
    nav.addEventListener("click", function (e) {
      if (e.target.closest("a")) setNav(false);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") {
        setNav(false);
        toggle.focus();
      }
    });
    window.addEventListener("resize", function () {
      if (window.innerWidth >= 960) setNav(false);
    });
  }

  function onScroll() {
    if (header) header.classList.toggle("scrolled", window.scrollY > 8);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Contact details from site-config.js ---------- */
  function getCfg(path) {
    var v = path.split(".").reduce(function (o, k) { return o && o[k] != null ? o[k] : ""; }, CFG);
    return typeof v === "string" ? v.trim() : "";
  }
  function isHttps(url) { return /^https:\/\//i.test(url); }
  var HREF = {
    phone: function (v) { return "tel:" + v.replace(/[^\d+]/g, ""); },
    email: function (v) { return "mailto:" + v; },
    whatsapp: function (v) { return "https://wa.me/" + v.replace(/\D/g, ""); }
  };

  // A setting counts as "present" if it is filled in — and, for link settings, is a safe https URL.
  // That way a mistyped link hides the buttons that depend on it instead of leaving dead ones.
  var URL_KEY = /(Url$|^social\.)/;
  function present(key) {
    var v = getCfg(key);
    return !!v && (!URL_KEY.test(key) || isHttps(v));
  }
  $$("[data-site-needs]").forEach(function (el) {
    el.hidden = !present(el.getAttribute("data-site-needs"));
  });
  $$("[data-site-needs-any]").forEach(function (el) {
    el.hidden = !el.getAttribute("data-site-needs-any").split(",").some(function (k) { return present(k.trim()); });
  });
  $$("[data-site-text]").forEach(function (el) {
    var v = getCfg(el.getAttribute("data-site-text"));
    if (v) el.textContent = v;
  });
  $$("[data-site-href]").forEach(function (el) {
    var key = el.getAttribute("data-site-href");
    var v = getCfg(key);
    if (!v) return;
    var href = HREF[key.split(".")[0]] ? HREF[key.split(".")[0]](v) : v;
    if (/^(tel:|mailto:)/.test(href) || isHttps(href)) el.setAttribute("href", href);
  });
  $$("[data-site-src]").forEach(function (el) {
    var v = getCfg(el.getAttribute("data-site-src"));
    if (isHttps(v)) el.setAttribute("src", v);
  });
  $$("[data-site-empty-notice]").forEach(function (el) {
    var any = ["phone", "whatsapp", "email", "address"].some(function (k) { return getCfg(k); });
    el.hidden = any;
  });

  /* ---------- Weekly events: "next gathering" + calendar links ---------- */
  function readEvents() {
    return $$("[data-event]").map(function (el) {
      var s = (el.getAttribute("data-start") || "").split(":");
      var e = (el.getAttribute("data-end") || "").split(":");
      return {
        el: el,
        title: el.getAttribute("data-title") || "Gathering",
        desc: el.getAttribute("data-desc") || "",
        online: el.hasAttribute("data-online"),
        day: parseInt(el.getAttribute("data-day"), 10),
        startMin: parseInt(s[0], 10) * 60 + parseInt(s[1] || "0", 10),
        endMin: parseInt(e[0], 10) * 60 + parseInt(e[1] || "0", 10)
      };
    }).filter(function (ev) { return !isNaN(ev.day) && !isNaN(ev.startMin) && !isNaN(ev.endMin); });
  }

  // Minutes since Sunday 00:00, in Kenyan time.
  function eatWeekMinute(now) {
    var t = new Date(now + EAT_OFFSET_MIN * 60000);
    return t.getUTCDay() * 1440 + t.getUTCHours() * 60 + t.getUTCMinutes();
  }

  function fmtClock(totalMin) {
    var h = Math.floor(totalMin / 60) % 24, m = totalMin % 60;
    return (h % 12 || 12) + ":" + pad(m) + " " + (h >= 12 ? "pm" : "am");
  }

  function describe(ev, now) {
    var nowM = eatWeekMinute(now);
    var start = ev.day * 1440 + ev.startMin;
    var end = ev.day * 1440 + ev.endMin;
    var live = nowM >= start && nowM < end;
    var delta = ((start - nowM) % WEEK_MIN + WEEK_MIN) % WEEK_MIN;
    return { ev: ev, live: live, delta: live ? 0 : delta, nowM: nowM, end: end };
  }

  function whenText(d) {
    var ev = d.ev;
    if (d.live) return "Until " + fmtClock(ev.endMin);
    var at = fmtClock(ev.startMin);
    if (d.delta < 60) return "Starts in " + Math.max(d.delta, 1) + " min · " + at;
    var dayDiff = Math.floor((d.nowM + d.delta) / 1440) - Math.floor(d.nowM / 1440);
    if (dayDiff === 0) return (ev.startMin >= 17 * 60 ? "Tonight" : "Today") + " at " + at;
    if (dayDiff === 1) return "Tomorrow at " + at;
    if (dayDiff >= 7) return "Next " + DAYS[ev.day] + " at " + at;
    return DAYS[ev.day] + " at " + at;
  }

  var events = readEvents();
  var card = $("[data-next-event]");

  function renderNext() {
    if (!card || !events.length) return;
    var now = Date.now();
    var all = events.map(function (ev) { return describe(ev, now); });
    var pick = all.filter(function (d) { return d.live; })[0] ||
      all.sort(function (a, b) { return a.delta - b.delta; })[0];
    card.classList.toggle("is-live", pick.live);
    $("[data-next=status]", card).textContent = pick.live ? "Happening now" : "Up next";
    $("[data-next=title]", card).textContent = pick.ev.title;
    $("[data-next=when]", card).textContent = whenText(pick);
    var join = $("[data-next-join]", card);
    if (join) {
      var link = meetLink();
      var show = !!(pick.ev.online && link);
      join.hidden = !show;
      if (show) {
        join.setAttribute("href", link);
        $("[data-next-join-label]", join).textContent = pick.live ? "Join now on Google Meet" : "Join on Google Meet";
      }
    }
  }
  renderNext();
  if (card) setInterval(renderNext, 30000);

  /* ---- Add-to-calendar (weekly recurring) ---- */
  // The Google Meet link for the online meetings (only if it is a safe https URL).
  function meetLink() { var v = getCfg("meetUrl"); return isHttps(v) ? v : ""; }
  // Where an event happens: online events use the Meet link; the others use the street
  // address if there is one, otherwise the Google Maps link.
  function venue(ev) { return ev && ev.online && meetLink() ? meetLink() : (getCfg("address") || getCfg("mapLinkUrl")); }
  // Calendar description; online events also carry the join link.
  function details(ev) { return ev.desc + (ev.online && meetLink() ? "\nJoin on Google Meet: " + meetLink() : ""); }
  function icsStamp(d) {
    return d.getUTCFullYear() + pad(d.getUTCMonth() + 1) + pad(d.getUTCDate()) +
      "T" + pad(d.getUTCHours()) + pad(d.getUTCMinutes()) + "00Z";
  }
  function icsEscape(t) {
    return String(t).replace(/\\/g, "\\\\").replace(/;/g, "\\;").replace(/,/g, "\\,").replace(/\r?\n/g, "\\n");
  }
  function icsFold(line) {
    var out = [], i = 0;
    while (line.length - i > 60) { out.push(line.substr(i, 60)); i += 60; }
    out.push(line.substr(i));
    return out.join("\r\n ");
  }
  // Next real start time of the event (UTC instant) and its weekly rule.
  function nextOccurrence(ev) {
    var base = Math.floor(Date.now() / 60000) * 60000;
    var delta = ((ev.day * 1440 + ev.startMin - eatWeekMinute(base)) % WEEK_MIN + WEEK_MIN) % WEEK_MIN;
    var start = new Date(base + delta * 60000);
    var end = new Date(start.getTime() + (ev.endMin - ev.startMin) * 60000);
    return { start: start, end: end, byday: ICS_DAYS[start.getUTCDay()] };
  }
  function buildIcs(ev) {
    var o = nextOccurrence(ev);
    var lines = [
      "BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//Life Source Church Kenya//Website//EN",
      "CALSCALE:GREGORIAN", "BEGIN:VEVENT",
      "UID:" + ev.title.toLowerCase().replace(/\W+/g, "-") + "-weekly@lifesourcechurch",
      "DTSTAMP:" + icsStamp(new Date()),
      "DTSTART:" + icsStamp(o.start), "DTEND:" + icsStamp(o.end),
      "RRULE:FREQ=WEEKLY;BYDAY=" + o.byday,
      "SUMMARY:" + icsEscape(ev.title + " — Life Source Church Kenya"),
      "DESCRIPTION:" + icsEscape(details(ev))
    ];
    if (venue(ev)) lines.push("LOCATION:" + icsEscape(venue(ev)));
    lines.push("END:VEVENT", "END:VCALENDAR");
    return lines.map(icsFold).join("\r\n") + "\r\n";
  }
  function googleUrl(ev) {
    var o = nextOccurrence(ev);
    var q = [
      "action=TEMPLATE",
      "text=" + encodeURIComponent(ev.title + " — Life Source Church Kenya"),
      "dates=" + icsStamp(o.start) + "/" + icsStamp(o.end),
      "details=" + encodeURIComponent(details(ev)),
      "recur=" + encodeURIComponent("RRULE:FREQ=WEEKLY;BYDAY=" + o.byday)
    ];
    if (venue(ev)) q.push("location=" + encodeURIComponent(venue(ev)));
    return "https://calendar.google.com/calendar/render?" + q.join("&");
  }

  events.forEach(function (ev) {
    var box = $("[data-calendar]", ev.el);
    if (!box) return;
    var g = $("[data-calendar-google]", box);
    var i = $("[data-calendar-ics]", box);
    if (g) g.setAttribute("href", googleUrl(ev));
    if (i) {
      i.addEventListener("click", function () {
        var blob = new Blob([buildIcs(ev)], { type: "text/calendar;charset=utf-8" });
        var url = URL.createObjectURL(blob);
        var a = document.createElement("a");
        a.href = url;
        a.download = ev.title.toLowerCase().replace(/\W+/g, "-") + ".ics";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        setTimeout(function () { URL.revokeObjectURL(url); }, 1000);
      });
    }
    box.hidden = false;
  });

  /* ---------- Contact form → WhatsApp / email ---------- */
  var form = $("[data-contact-form]");
  if (form) {
    var wa = getCfg("whatsapp").replace(/\D/g, "");
    var mail = getCfg("email");
    var section = form.closest("[data-contact-form-section]") || form;
    var status = $("[data-form-status]", form);
    var waBtn = $('[data-channel="whatsapp"]', form);
    var mailBtn = $('[data-channel="email"]', form);

    section.hidden = !(wa || mail);
    if (section.hidden && section.parentElement) section.parentElement.classList.add("split--single");
    if (waBtn) waBtn.hidden = !wa;
    if (mailBtn) mailBtn.hidden = !mail;
    var hint = $("[data-form-hint]", form);
    if (hint) {
      var apps = wa && mail ? "WhatsApp or your email app" : wa ? "WhatsApp" : "your email app";
      hint.textContent = "Your message opens in " + apps + " so you can review it before sending.";
    }

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var channel = (e.submitter && e.submitter.getAttribute("data-channel")) || (wa ? "whatsapp" : "email");
      var name = form.elements.name.value.trim();
      var reach = form.elements.reach.value.trim();
      var topic = form.elements.topic.value;
      var message = form.elements.message.value.trim();
      var text = "Hello Life Source Church Kenya,\n\n" + message + "\n\n— " + name +
        (reach ? " (" + reach + ")" : "") + "\nTopic: " + topic;

      if (channel === "whatsapp" && wa) {
        window.open("https://wa.me/" + wa + "?text=" + encodeURIComponent(text), "_blank", "noopener");
        if (status) status.textContent = "Opening WhatsApp — just press send. Thank you!";
      } else if (mail) {
        window.location.href = "mailto:" + mail + "?subject=" + encodeURIComponent(topic + " — " + name) +
          "&body=" + encodeURIComponent(text);
        if (status) status.textContent = "Opening your email app — if nothing opens, please email " + mail + ". Thank you!";
      }
    });
  }

  /* ---------- Copy-to-clipboard buttons (e.g. M-PESA till number) ---------- */
  function copyText(value) {
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(value);
    }
    return new Promise(function (resolve, reject) {
      var ta = document.createElement("textarea");
      ta.value = value;
      ta.setAttribute("readonly", "");
      ta.style.cssText = "position:fixed;top:0;left:0;opacity:0";
      document.body.appendChild(ta);
      ta.select();
      try { document.execCommand("copy") ? resolve() : reject(); } catch (e) { reject(e); }
      document.body.removeChild(ta);
    });
  }
  $$("[data-copy]").forEach(function (btn) {
    var source = $(btn.getAttribute("data-copy"));
    if (!source) return;
    var label = $("[data-copy-label]", btn);
    var status = $("[data-copy-status]");
    var original = label ? label.textContent : "";
    btn.hidden = false;
    btn.addEventListener("click", function () {
      // Numbers (the M-PESA till) are copied as digits only so they paste cleanly into M-PESA;
      // links (data-copy-raw) are copied exactly as shown.
      var raw = btn.hasAttribute("data-copy-raw");
      var value = raw ? source.textContent.trim() : source.textContent.replace(/\D/g, "");
      copyText(value).then(function () {
        if (label) label.textContent = "Copied!";
        if (status) status.textContent = raw ? "Link copied." : "Till number " + value + " copied.";
        setTimeout(function () { if (label) label.textContent = original; }, 2200);
      }, function () {
        if (status) status.textContent = "Couldn’t copy automatically — please select it and copy it.";
      });
    });
  });

  /* ---------- Footer year ---------- */
  $$("[data-year]").forEach(function (el) { el.textContent = new Date().getFullYear(); });

  /* ---------- Scroll reveal ---------- */
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if ("IntersectionObserver" in window && !reduce) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });

    $$("[data-reveal]").forEach(function (el) {
      // Anything already on screen stays put; only content below the fold animates in.
      if (el.getBoundingClientRect().top < window.innerHeight) return;
      el.classList.add("reveal");
      io.observe(el);
    });
  }
})();
