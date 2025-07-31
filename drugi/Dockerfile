# Step 1: Base image
FROM node:18-alpine

# Step 2: Set working directory
WORKDIR /app

# Step 3: Copy dependencies descriptor and install first (caching)
COPY package*.json ./
RUN npm install

# Step 4: Copy the rest of the frontend code
COPY . .

# Step 5: Build the React App
RUN npm run build

# Step 6: Install `serve` to serve the build folder
RUN npm install -g serve

# Step 7: Expose port used by serve
EXPOSE 3000

# Step 8: Serve the React app from the build folder
CMD ["serve", "-s", "build"]
