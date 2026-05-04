FROM node:20-bullseye

RUN apt-get update && apt-get install -y --no-install-recommends \
    freecad \
    python3 \
    python3-pip \
    xvfb \
    && pip3 install trimesh \
    && mkdir -p /uploads && chmod 777 /uploads \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

EXPOSE 3000
ENV NODE_ENV=production
CMD ["npm", "start"]
