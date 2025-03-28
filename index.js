const express = require('express');
const bodyParser = require('body-parser');
const puppeteer = require('puppeteer');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.text({ type: '*/*', limit: '2mb' }));

app.post('/screenshot', async (req, res) => {
  const html = req.body;
  if (!html) return res.status(400).send('No HTML content');

  try {
    const browser = await puppeteer.launch({
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
      headless: true,
      defaultViewport: { width: 1200, height: 800 }
    });

    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: 'networkidle0' });

    const buffer = await page.screenshot({ fullPage: true });
    await browser.close();

    res.set('Content-Type', 'image/png');
    res.send(buffer);
  } catch (err) {
    console.error("🚨 Puppeteer error:", err);
    res.status(500).send('Error generating screenshot: ' + err.message);
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
