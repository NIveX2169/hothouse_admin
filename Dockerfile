# --- Stage 1: Build the Vite React app ---
FROM node:lts-trixie-slim AS builder


# Set working directory
WORKDIR /app

# Copy dependency files first (for better caching)
COPY package*.json ./

# Install dependencies
RUN npm install --legacy-peer-deps

# Copy the entire app
COPY . .

# Build the app (Vite will use environment variables from .env file)
RUN npm run build

# --- Stage 2: Serve with nginx ---
FROM nginx:alpine AS runner

# Copy built files from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]

