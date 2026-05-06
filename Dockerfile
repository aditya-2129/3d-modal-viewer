FROM node:20-bookworm-slim

WORKDIR /app

# Copy package files first for caching
COPY package*.json ./
RUN npm install

# Copy source
COPY . .

# Build the Next.js application
RUN npm run build

EXPOSE 3000
ENV NODE_ENV=production

# Start the application
CMD ["npm", "start"]