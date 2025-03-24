# Build stage
FROM node:22.2.0-alpine AS builder

WORKDIR /app

# Copy package files
COPY package.json ./

# Install dependencies using npm
RUN npm config set registry https://registry.npmjs.org && \
    npm install

# Copy source code
COPY . .

# Generate routes and build the application
RUN npm run spec-and-routes-gen && npm run build

# Production stage
FROM node:22.2.0-alpine

WORKDIR /app

# Copy package files and install production dependencies
COPY package.json package-lock.json ./
RUN npm config set registry https://registry.npmjs.org && \
    npm ci --omit=dev

# Copy built files from builder stage
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/src ./src

# Set environment variables
ENV ENV=production

# Expose the port your app runs on
EXPOSE 3000

# Start the application
CMD ["node", "--stack-size=10240", "--max-http-header-size=32768", "dist/main/server.js"]