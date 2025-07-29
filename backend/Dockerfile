# Step 1: Base image
FROM node:18-alpine

# Step 2: Set working directory
WORKDIR /app

# Step 3: Copy package.json + lock
COPY package*.json ./

# Step 4: Install dependencies
RUN npm install

# Step 5: Copy the rest of the app
COPY . .

# Step 6: Expose port
EXPOSE 5000

# Step 7: Start server
CMD ["npm", "start"]
