const express = require("express");
const puppeteer = require("puppeteer");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json({ limit: "5mb" }));

app.post("/screenshot", async (req, res) => {
  const { html } = req.body;
  if (!html) return res.status(400).send("Missing HTML");

  try {
    const browser = await puppeteer.launch({
      headless: "new",
      args: ["--no-sandbox", "--disable-setuid-sandbox"]
    });
    const page = await browser.newPage();

    await page.setContent(html, { waitUntil: "networkidle0" });

    const screenshot = await page.screenshot({ fullPage: true });

    await browser.close();

    res.set("Content-Type", "image/png");
    res.send(screenshot);
  } catch (e) {
    console.error("Erreur Puppeteer:", e);
    res.status(500).send("Erreur serveur.");
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Serveur lancé sur le port ${PORT}`));
