FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
# Use npm ci to install exact versions from package-lock.json for reproducible builds
RUN npm ci --only=production

COPY . .

# ensure non-root runtime user for security scanners
RUN chown -R node:node /app
USER node

EXPOSE 3000
CMD ["node", "src/server.js"]
