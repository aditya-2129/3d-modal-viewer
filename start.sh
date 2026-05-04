#!/bin/bash

# If REDIS_URL points to the docker-compose service name, rewrite it for single-container mode
if echo "${REDIS_URL}" | grep -q "cad-redis"; then
  export REDIS_URL=$(echo "$REDIS_URL" | sed 's/cad-redis/127.0.0.1/g')
  echo "Rewrote REDIS_URL to use 127.0.0.1 (was cad-redis)"
fi

# Default to local Redis with password if REDIS_URL is unset
export REDIS_URL="${REDIS_URL:-redis://:securepassword123@127.0.0.1:6379}"

# Start Redis in the background with password
redis-server --requirepass securepassword123 --daemonize yes

# Wait for Redis to be ready
until redis-cli -h 127.0.0.1 -a securepassword123 ping; do
  echo "Waiting for Redis..."
  sleep 1
done

echo "Redis is ready!"

# Start the FreeCAD worker in the background
echo "Starting FreeCAD Worker..."
./node_modules/.bin/tsx workers/freecad.worker.ts &

# Start the Next.js application in the foreground
echo "Starting Next.js App..."
npm start
