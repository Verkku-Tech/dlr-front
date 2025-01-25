# Stage 1: Build the Angular application
FROM node:22 AS build

WORKDIR /app

# Install dependencies (clean install to avoid caching issues)
COPY package*.json ./
RUN npm ci install

# Install Angular CLI globally
RUN npm install -g @angular/cli

# Copy application source
COPY . .

# Build the application
RUN npm run build

RUN rm package*.json

# Stage 2: Build the Angular application
FROM nginx:latest AS deploy

# Copy the nginx configuration
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

# Copy the build output to replace the default nginx contents.
COPY --from=build /app/dist/dlr-e-commerce/browser /usr/share/nginx/html

# Expose port 80
EXPOSE 80
