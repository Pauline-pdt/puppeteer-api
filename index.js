const express = require("express");
const puppeteer = require("puppeteer-core");
const chrome = require("chrome-aws-lambda");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json({ limit: "10mb" }));

app.post("/screenshot", async (req, res) => {
  const { html } = req.body;

  if (!html) return res.status(400).send("Missing HTML");

  try {
    const browser = await puppeteer.launch({
      args: chrome.args,
      executablePath: await chrome.executablePath,
      headless: chrome.headless
    });

    const page = await browser.newPage();
    await page.setViewport({ width: 1200, height: 800 });
    await page.setContent(html, {
      waitUntil: "networkidle2",
      timeout: 15000
    });

    const screenshot = await page.screenshot({ fullPage: true });

    await browser.close();

    res.set("Content-Type", "image/png");
    res.send(screenshot);
  } catch (err) {
    console.error("🔥 Erreur Puppeteer :", err.message);
    res.status(500).send("Erreur serveur.");
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Puppeteer API running on port ${PORT}`);
});
