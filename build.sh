#!/bin/bash
set -e

echo "Installing server dependencies..."
cd server
npm install
cd ..

echo "Installing client dependencies..."
cd client
npm install
cd ..

echo "Building client..."
cd client
npm run build
cd ..

echo "Preparing production..."
cd server
npm install --production
cd ..

echo "Build complete!"
