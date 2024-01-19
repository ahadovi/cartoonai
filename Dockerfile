FROM node:18-alpine  as build

WORKDIR /app
# Copy package.json and package-lock.json to the working directory
COPY package*.json ./
# Install dependencies
RUN npm install
# Copy the entire app to the container
COPY . .
# Build the app
RUN npm run build


# Expose port 4204
EXPOSE 4204

# Start production container
CMD ["npm", "run", "preview"]