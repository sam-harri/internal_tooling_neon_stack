#!/bin/bash

set -e

echo "Running Drizzle migrations..."

npx drizzle-kit migrate

echo "Migrations applied successfully."