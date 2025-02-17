# Basado de https://stackoverflow.com/questions/69393598/how-to-run-a-webpack-app-in-production-on-a-dockerfile
#           https://www.docker.com/blog/how-to-dockerize-react-app/
FROM node:20-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install all dependencies (including devDependencies)
RUN npm install

# Copy the rest of your application files
COPY . .

# Expose the port
EXPOSE 3000

# Run the app
CMD ["npm", "run", "production"]
