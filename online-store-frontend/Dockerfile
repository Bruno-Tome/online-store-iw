# Use the official Node.js image
FROM node:18-alpine

# Set the working directory
WORKDIR /home


# Copy the rest of the application code
COPY . .

# Install dependencies
RUN npm install



# Expose the application port
EXPOSE 5000

# Start the application
CMD ["npm", "run", "dev"]
