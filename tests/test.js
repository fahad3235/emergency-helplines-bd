/* emergency-helplines-bd — headless-Chrome test suite (puppeteer-core + system Chromium) */
"use strict";

const path = require("path");
const puppeteer = require("puppeteer-core");

const ROOT = path.resolve(__dirname, "..");
const CHROME = "/opt/meta-chromium/chrome";

const results = [];
function check(name, fn) {
  return Promise.resolve()
    .then(fn)
    .then(() => { results.push({ name, ok: true }); console.log("  PASS " + name); })
    .catch((err) => { results.push({ name, ok: false, err: String(err && err.message || err) }); console.log("  FAIL " + name + " :: " + (err && err.message || err)); });
}
function assert(cond, msg) { if (!cond) throw new Error(msg || "assertion failed"); }

(async () => {
  const base = "file://" + ROOT + "/index.html";
  const browser = await puppeteer.launch({
    executablePath: CHROME,
    args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-dev-shm-usage", "--allow-file-access-from-files"]
  });

  const consoleErrors = [];
  const pageErrors = [];
  const page = await browser.newPage();
  page.on("console", (m) => { if (m.type() === "error") consoleErrors.push(m.text()); });
  page.on("pageerror", (e) => pageErrors.push(String(e && e.message || e)));

  console.log("tests: emergency-helplines-bd @ " + base);
  await page.goto(base, { waitUntil: "networkidle0" });
  await page.waitForSelector(".card");

  await check("banner present with tel:999 and always visible (sticky)", async () => {
    const info = await page.evaluate(() => {
      const b = document.getElementById("banner");
      const a = b && b.querySelector("a.banner-call");
      return b ? { href: a && a.getAttribute("href"), pos: getComputedStyle(b).position } : null;
    });
    assert(info, "banner missing");
    assert(info.href === "tel:999", "banner href = " + info.href);
    assert(info.pos === "sticky", "banner not sticky: " + info.pos);
  });

  await check("12 helpline cards rendered", async () => {
    const n = await page.$$eval(".card", (els) => els.length);
    assert(n === 12, "expected 12 cards, got " + n);
  });

  await check('search "999" filters to exactly 1 card', async () => {
    await page.evaluate(() => { document.getElementById("search").value = ""; document.getElementById("search").dispatchEvent(new Event("input")); });
    await page.type("#search", "999");
    await new Promise((r) => setTimeout(r, 150));
    const n = await page.$$eval(".card", (els) => els.length);
    assert(n === 1, "expected 1 card, got " + n);
    const id = await page.$eval(".card", (el) => el.getAttribute("data-id"));
    assert(id === "999", "wrong card: " + id);
  });

  await check('category chip "Health" shows exactly 1 card (16263)', async () => {
    await page.evaluate(() => { document.getElementById("search").value = ""; document.getElementById("search").dispatchEvent(new Event("input")); });
    await page.click('[data-chip="health"]');
    await new Promise((r) => setTimeout(r, 150));
    const ids = await page.$$eval(".card", (els) => els.map((e) => e.getAttribute("data-id")));
    assert(ids.length === 1 && ids[0] === "16263", "got " + JSON.stringify(ids));
    await page.click('[data-chip="all"]');
  });

  await check("favorites add/remove persists after reload", async () => {
    await page.evaluate(() => { document.getElementById("search").value = ""; document.getElementById("search").dispatchEvent(new Event("input")); });
    await page.click('.card[data-id="106"] [data-fav]');
    await new Promise((r) => setTimeout(r, 100));
    await page.click('[data-chip="favs"]');
    await new Promise((r) => setTimeout(r, 150));
    let ids = await page.$$eval(".card", (els) => els.map((e) => e.getAttribute("data-id")));
    assert(ids.length === 1 && ids[0] === "106", "fav filter got " + JSON.stringify(ids));
    await page.reload({ waitUntil: "networkidle0" });
    await page.waitForSelector(".card");
    await page.click('[data-chip="favs"]');
    await new Promise((r) => setTimeout(r, 150));
    ids = await page.$$eval(".card", (els) => els.map((e) => e.getAttribute("data-id")));
    assert(ids.length === 1 && ids[0] === "106", "after reload got " + JSON.stringify(ids));
    // remove it again; favorites filter should then show empty state
    await page.click('.card[data-id="106"] [data-fav]');
    await new Promise((r) => setTimeout(r, 150));
    const emptyVisible = await page.evaluate(() => !document.getElementById("empty").hidden);
    assert(emptyVisible, "empty favorites state not shown after removal");
    await page.click('[data-chip="all"]');
  });

  await check("BN toggle flips card numbers to Bengali digits", async () => {
    await page.click("#langToggle");
    await new Promise((r) => setTimeout(r, 150));
    const num = await page.$eval('.card[data-id="999"] .card-num', (el) => el.textContent.trim());
    assert(num === "৯৯৯", "expected ৯৯৯, got " + num);
    const chipLabel = await page.$eval('[data-chip="health"]', (el) => el.textContent.trim());
    assert(chipLabel === "স্বাস্থ্য", "health chip not Bengali: " + chipLabel);
    // back to English for remaining tests
    await page.click("#langToggle");
    await new Promise((r) => setTimeout(r, 150));
    const numEn = await page.$eval('.card[data-id="999"] .card-num', (el) => el.textContent.trim());
    assert(numEn === "999", "expected 999, got " + numEn);
  });

  await check("390px viewport: no horizontal overflow", async () => {
    await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
    await new Promise((r) => setTimeout(r, 200));
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    assert(overflow <= 1, "horizontal overflow: " + overflow + "px");
  });

  await check("tel: hrefs correct on all 12 cards", async () => {
    await page.setViewport({ width: 1280, height: 900 });
    const links = await page.$$eval(".card", (els) =>
      els.map((el) => ({ id: el.getAttribute("data-id"), href: el.querySelector("a.call-btn").getAttribute("href") }))
    );
    assert(links.length === 12, "expected 12, got " + links.length);
    const expected = await page.evaluate(() => window.HELPLINES.map((h) => h.number));
    links.forEach((l) => assert(l.href === "tel:" + l.id, "card " + l.id + " href=" + l.href));
    assert(JSON.stringify(links.map((l) => l.id)) === JSON.stringify(expected), "card ids mismatch dataset order");
  });

  await check("search 'no results' empty state appears", async () => {
    await page.type("#search", "zzz-no-such-helpline");
    await new Promise((r) => setTimeout(r, 150));
    const st = await page.evaluate(() => ({
      cards: document.querySelectorAll(".card").length,
      emptyHidden: document.getElementById("empty").hidden,
      emptyText: document.getElementById("empty").textContent.trim()
    }));
    assert(st.cards === 0 && !st.emptyHidden && st.emptyText.length > 0, JSON.stringify(st));
    await page.evaluate(() => { document.getElementById("search").value = ""; document.getElementById("search").dispatchEvent(new Event("input")); });
  });

  await check("zero console errors and zero page errors", async () => {
    assert(consoleErrors.length === 0, "console errors: " + JSON.stringify(consoleErrors.slice(0, 3)));
    assert(pageErrors.length === 0, "page errors: " + JSON.stringify(pageErrors.slice(0, 3)));
  });

  await browser.close();

  const passed = results.filter((r) => r.ok).length;
  console.log("\nRESULT: " + passed + "/" + results.length + " passed");
  if (passed !== results.length) {
    console.log("failures:");
    results.filter((r) => !r.ok).forEach((r) => console.log(" - " + r.name + " :: " + r.err));
    process.exit(1);
  }
})().catch((e) => { console.error("HARNESS ERROR:", e); process.exit(2); });
