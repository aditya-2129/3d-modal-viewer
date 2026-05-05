FROM node:20-bookworm-slim

# Install system dependencies
RUN apt-get update && DEBIAN_FRONTEND=noninteractive apt-get install -y --no-install-recommends \
    python3 \
    python3-pip \
    python3-setuptools \
    xvfb \
    && rm -rf /var/lib/apt/lists/*

# Install python dependencies globally
RUN pip3 install --no-cache-dir trimesh --break-system-packages

WORKDIR /app

# Ensure uploads directory exists
RUN mkdir -p /uploads && chmod 777 /uploads

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