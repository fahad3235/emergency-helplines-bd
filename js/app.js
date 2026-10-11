/* emergency-helplines-bd — app logic (vanilla JS, no build step) */
"use strict";

const LS_LANG = "ehl_lang_v1";
const LS_FAVS = "ehl_favs_v1";

const BN_DIGITS = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];

function toBnDigits(s) {
  return String(s).replace(/[0-9]/g, (d) => BN_DIGITS[Number(d)]);
}
function normDigits(s) {
  // Bengali digits -> ASCII, lowercased, for search
  return String(s)
    .replace(/[০-৯]/g, (d) => String(BN_DIGITS.indexOf(d)))
    .toLowerCase();
}

const I18N = {
  en: {
    htmlLang: "en",
    title: "Emergency Helplines BD",
    subtitle: "Verified emergency & helpline numbers for Bangladesh. Tap a number to call.",
    searchPh: "Search number or name…",
    bannerLabel: "EMERGENCY — CALL",
    langBtn: "বাংলা",
    chips: {
      all: "All",
      emergency: "Emergency",
      police: "Police",
      "women-children": "Women & Children",
      health: "Health",
      govt: "Govt Services",
      favs: "★ Favorites"
    },
    callBtn: "📞 Call",
    badgeFree: "Toll-free",
    badge247: "24/7",
    favAdd: "Add to favorites",
    favRemove: "Remove from favorites",
    emptySearch: "No helplines match your search.",
    emptyFavs: "No favorites yet — tap the ☆ star on any card to save it here.",
    offline: "📴 Works fully offline — saved on your device, no internet or sign-up needed.",
    dataNote: "Numbers verified from press reports, October 2026. Re-verify before relying in an emergency.",
    disclaimer: "A community directory — not an official government app.",
    sourcesTitle: "Data sources (press reports)"
  },
  bn: {
    htmlLang: "bn",
    title: "জরুরি হেল্পলাইন BD",
    subtitle: "বাংলাদেশের যাচাইকৃত জরুরি ও হেল্পলাইন নম্বর। কল করতে নম্বরে ট্যাপ করুন।",
    searchPh: "নম্বর বা নাম খুঁজুন…",
    bannerLabel: "জরুরি — কল করুন",
    langBtn: "English",
    chips: {
      all: "সব",
      emergency: "জরুরি",
      police: "পুলিশ",
      "women-children": "নারী ও শিশু",
      health: "স্বাস্থ্য",
      govt: "সরকারি সেবা",
      favs: "★ প্রিয়"
    },
    callBtn: "📞 কল করুন",
    badgeFree: "টোল-ফ্রি",
    badge247: "২৪/৭",
    favAdd: "প্রিয় তালিকায় যোগ করুন",
    favRemove: "প্রিয় তালিকা থেকে সরান",
    emptySearch: "আপনার খোঁজের সাথে কোনো হেল্পলাইন মেলেনি।",
    emptyFavs: "এখনো কোনো প্রিয় নম্বর নেই — কার্ডের ☆ তারায় ট্যাপ করে এখানে সংরক্ষণ করুন।",
    offline: "📴 সম্পূর্ণ অফলাইনে কাজ করে — আপনার ডিভাইসে সংরক্ষিত, ইন্টারনেট বা সাইন-আপ লাগে না।",
    dataNote: "অক্টোবর ২০২৬-এর সংবাদ প্রতিবেদন থেকে নম্বর যাচাইকৃত। জরুরি প্রয়োজনে ব্যবহারের আগে পুনরায় যাচাই করুন।",
    disclaimer: "একটি কমিউনিটি ডিরেক্টরি — সরকারি অফিসিয়াল অ্যাপ নয়।",
    sourcesTitle: "তথ্যসূত্র (সংবাদ প্রতিবেদন)"
  }
};

const state = {
  lang: "en",
  query: "",
  chip: "all",
  favs: new Set()
};

function t() {
  return I18N[state.lang];
}

function loadState() {
  try {
    const l = localStorage.getItem(LS_LANG);
    if (l === "en" || l === "bn") state.lang = l;
  } catch (e) { /* storage unavailable */ }
  try {
    const f = JSON.parse(localStorage.getItem(LS_FAVS) || "[]");
    if (Array.isArray(f)) state.favs = new Set(f.filter((x) => typeof x === "string"));
  } catch (e) { /* storage unavailable */ }
}

function saveFavs() {
  try {
    localStorage.setItem(LS_FAVS, JSON.stringify([...state.favs]));
  } catch (e) { /* storage unavailable */ }
}

function displayNumber(num) {
  return state.lang === "bn" ? toBnDigits(num) : num;
}

function filtered() {
  const q = normDigits(state.query.trim());
  let list = window.HELPLINES;
  if (state.chip === "favs") {
    list = list.filter((h) => state.favs.has(h.id));
  } else if (state.chip !== "all") {
    list = list.filter((h) => h.cat === state.chip);
  }
  if (q) {
    list = list.filter((h) => {
      const hay = normDigits(h.number + " " + h.nameEn + " " + h.nameBn + " " + h.descEn + " " + h.descBn);
      return q.split(/\s+/).every((tok) => hay.includes(tok));
    });
  }
  return list;
}

function badgeHtml(h) {
  const parts = [];
  if (h.tollFree) parts.push('<span class="badge free">' + escapeHtml(t().badgeFree) + "</span>");
  if (h.h24) parts.push('<span class="badge h24">' + escapeHtml(t().badge247) + "</span>");
  return parts.length ? '<div class="badges">' + parts.join("") + "</div>" : "";
}

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function cardHtml(h) {
  const lang = state.lang;
  const name = lang === "bn" ? h.nameBn : h.nameEn;
  const nameAlt = lang === "bn" ? h.nameEn : h.nameBn;
  const desc = lang === "bn" ? h.descBn : h.descEn;
  const warn = lang === "bn" ? h.warnBn : h.warnEn;
  const fav = state.favs.has(h.id);
  return (
    '<article class="card" data-id="' + escapeHtml(h.id) + '">' +
      '<div class="card-top">' +
        '<div class="card-names">' +
          "<h2>" + escapeHtml(name) + "</h2>" +
          '<p class="name-alt">' + escapeHtml(nameAlt) + "</p>" +
        "</div>" +
        '<button class="fav' + (fav ? " on" : "") + '" data-fav="' + escapeHtml(h.id) + '"' +
          ' aria-pressed="' + (fav ? "true" : "false") + '"' +
          ' aria-label="' + escapeHtml(fav ? t().favRemove : t().favAdd) + '">' +
          (fav ? "★" : "☆") +
        "</button>" +
      "</div>" +
      '<div class="card-num" dir="ltr">' + escapeHtml(displayNumber(h.number)) + "</div>" +
      '<p class="desc">' + escapeHtml(desc) + "</p>" +
      badgeHtml(h) +
      (warn ? '<p class="warn">⚠ ' + escapeHtml(warn) + "</p>" : "") +
      '<a class="call-btn" href="tel:' + escapeHtml(h.number) + '">' + escapeHtml(t().callBtn) + " " + escapeHtml(displayNumber(h.number)) + "</a>" +
    "</article>"
  );
}

function renderChips() {
  const order = ["all", "emergency", "police", "women-children", "health", "govt", "favs"];
  const el = document.getElementById("chips");
  el.innerHTML = order
    .map(
      (c) =>
        '<button class="chip' + (state.chip === c ? " active" : "") + '" data-chip="' + c + '"' +
        ' role="tab" aria-selected="' + (state.chip === c ? "true" : "false") + '">' +
        escapeHtml(t().chips[c]) +
        "</button>"
    )
    .join("");
}

function renderStatic() {
  const lang = t();
  document.documentElement.lang = lang.htmlLang;
  document.getElementById("appTitle").textContent = lang.title;
  document.getElementById("appSubtitle").textContent = lang.subtitle;
  const search = document.getElementById("search");
  search.placeholder = lang.searchPh;
  search.setAttribute("aria-label", lang.searchPh);
  document.getElementById("bannerLabel").textContent = lang.bannerLabel;
  document.getElementById("bannerNum").textContent = displayNumber("999");
  document.getElementById("langToggle").textContent = lang.langBtn;
  document.getElementById("offlineNote").textContent = lang.offline;
  document.getElementById("dataNote").textContent = lang.dataNote;
  document.getElementById("disclaimer").textContent = lang.disclaimer;
  document.getElementById("sourcesTitle").textContent = lang.sourcesTitle;
  renderChips();
  renderSources();
}

function renderCards() {
  const list = filtered();
  const wrap = document.getElementById("cards");
  const empty = document.getElementById("empty");
  wrap.innerHTML = list.map(cardHtml).join("");
  if (list.length === 0) {
    empty.hidden = false;
    empty.textContent = state.chip === "favs" && !state.query.trim() ? t().emptyFavs : t().emptySearch;
  } else {
    empty.hidden = true;
    empty.textContent = "";
  }
}

function renderSources() {
  const seen = [];
  window.HELPLINES.forEach((h) =>
    h.sources.forEach((s) => {
      if (!seen.includes(s)) seen.push(s);
    })
  );
  document.getElementById("sourcesList").innerHTML = seen
    .map((s) => "<li>" + escapeHtml(s) + "</li>")
    .join("");
}

function render() {
  renderStatic();
  renderCards();
}

function init() {
  loadState();
  render();

  document.getElementById("langToggle").addEventListener("click", () => {
    state.lang = state.lang === "en" ? "bn" : "en";
    try {
      localStorage.setItem(LS_LANG, state.lang);
    } catch (e) { /* storage unavailable */ }
    render();
  });

  const search = document.getElementById("search");
  search.addEventListener("input", () => {
    state.query = search.value;
    renderCards();
  });

  document.getElementById("chips").addEventListener("click", (ev) => {
    const btn = ev.target.closest("[data-chip]");
    if (!btn) return;
    state.chip = btn.getAttribute("data-chip");
    renderChips();
    renderCards();
  });

  document.getElementById("cards").addEventListener("click", (ev) => {
    const btn = ev.target.closest("[data-fav]");
    if (!btn) return;
    const id = btn.getAttribute("data-fav");
    if (state.favs.has(id)) state.favs.delete(id);
    else state.favs.add(id);
    saveFavs();
    renderCards();
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
