# Use the official Node.js image
FROM node:18-alpine

# Set the working directory
WORKDIR /home


COPY package*.json ./


RUN npm install -g @nestjs/cli && npm install 


# Copy the rest of the application code
COPY . .


# Expose the application port
EXPOSE 3000

# Start the application
CMD ["npm", "run", "start:dev"]
