#!/bin/bash

# Start Redis in the background with password
redis-server --requirepass securepassword123 --daemonize yes

# Wait for Redis to be ready
until redis-cli -a securepassword123 ping; do
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
