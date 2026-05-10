# Use stable Alpine-based Node
FROM node:20-alpine AS builder

WORKDIR /app

# Copy dependency files
COPY package*.json ./
RUN npm install --legacy-peer-deps

ENV VITE_REACT_APP_WORKING_ENVIRONMENT="development"
ENV VITE_REACT_APP_REDUX_PERSIST_SECRET_KEY="absndjndjvni1151211"
ENV VITE_REACT_APP_API_BASE_URL_DEVELOPMENT="https://boompizza.chickenkiller.com/api/v1"
ENV VITE_REACT_APP_API_BASE_URL_PRODUCTION="https://api.hothousenorthwood.co.uk/api/v1"
ENV VITE_REACT_APP_API_BASE_URL_DEVELOPMENT_V2="https://boompizza.chickenkiller.com/api/v2"
ENV VITE_REACT_APP_API_BASE_URL_PRODUCTION_V2="https://boompizza.chickenkiller.com/api/v2"

# Copy the rest of the app and build
COPY . .
RUN npm run build

# --- Stage 2: Serve with nginx ---
FROM nginx:alpine AS runner

# Copy built files
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]