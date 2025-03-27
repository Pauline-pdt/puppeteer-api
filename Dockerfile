FROM ghcr.io/puppeteer/puppeteer:latest

WORKDIR /app

COPY . .

RUN npm install

EXPOSE 3000

CMD ["node", "index.js"]
