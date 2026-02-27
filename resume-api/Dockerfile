FROM node:20-alpine AS builder

WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:20-alpine AS runner

WORKDIR /app

# Install necessary libraries for Puppeteer (Chromium) on Alpine
RUN apk add --no-cache \
    chromium \
    nss \
    freetype \
    harfbuzz \
    ca-certificates \
    ttf-freefont

# Tell Puppeteer to skip installing Chrome/Chromium and use the installed one
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser

COPY package.json package-lock.json* ./
RUN npm ci --only=production

COPY --from=builder /app/dist ./dist

EXPOSE 3001
ENV PORT 3001
ENV NODE_ENV production

CMD ["node", "dist/main"]
