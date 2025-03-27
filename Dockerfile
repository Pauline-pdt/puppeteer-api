FROM node:18-bullseye-slim

# Installe Chromium et ses dépendances
RUN apt-get update && apt-get install -y \
  chromium \
  fonts-liberation \
  libappindicator3-1 \
  libasound2 \
  libatk-bridge2.0-0 \
  libatk1.0-0 \
  libcups2 \
  libdbus-1-3 \
  libgdk-pixbuf2.0-0 \
  libnspr4 \
  libnss3 \
  libx11-xcb1 \
  libxcomposite1 \
  libxdamage1 \
  libxrandr2 \
  xdg-utils \
  libgbm1 \
  wget \
  curl \
  && rm -rf /var/lib/apt/lists/*

# Définit le dossier de travail
WORKDIR /app

# Copie et installe les dépendances
COPY package.json .
RUN npm install

# Copie le reste des fichiers
COPY . .

EXPOSE 3000

# Lance l'application
CMD ["node", "index.js"]
