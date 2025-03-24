# Build stage
FROM node:22.2.0-alpine AS builder

WORKDIR /app

# Copy package files
COPY package.json yarn.lock ./

# Install dependencies with npm registry instead of CodeArtifact
# This avoids the 401 Unauthorized error with @faker-js/faker
RUN yarn config set registry https://registry.npmjs.org && \
    yarn install --frozen-lockfile

# Copy source code
COPY . .

# Generate routes and build the application
RUN yarn spec-and-routes-gen && yarn build

# Production stage
FROM node:22.2.0-alpine

WORKDIR /app

# Copy package files and install production dependencies only
COPY package.json yarn.lock ./
RUN yarn config set registry https://registry.npmjs.org && \
    yarn install --frozen-lockfile --production

# Copy built files from builder stage
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/src ./src

# Set environment variables
ENV ENV=production

# Expose the port your app runs on
EXPOSE 3000

# Start the application
CMD ["node", "--stack-size=10240", "--max-http-header-size=32768", "dist/main/server.js"]