FROM ghcr.io/puppeteer/puppeteer:latest

WORKDIR /app

COPY . .

EXPOSE 3000

CMD ["node", "index.js"]
