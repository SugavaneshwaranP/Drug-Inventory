# Step 1: Base image
FROM node:18-alpine

# Step 2: Set working directory
WORKDIR /app

# Step 3: Copy package.json & install dependencies first (for caching)
COPY package*.json ./
RUN npm install

# Step 4: Copy the rest of the app
COPY . .

# Step 5: Build the Vite app
RUN npm run build

# Step 6: Use `serve` to serve the built files
RUN npm install -g serve

# Step 7: Expose port (Vite dev port is 5173, but serve uses 3000 by default)
EXPOSE 3000

# Step 8: Command to run the built app
CMD ["serve", "-s", "dist"]
