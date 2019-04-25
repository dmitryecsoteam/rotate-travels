FROM node:8.11-alpine

# Create directory 
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install --only=production

# Copy sources
COPY src /app
COPY crontab /app

# Define environment variables
ENV NODE_ENV=production MONGO_HOST=192.168.0.42 MONGO_PORT=27017 MONGO_DB=ECSO-DB MONGO_USER=ecso_user MONGO_PASS=Qwerty12 API_PORT=4000 API_SERVER_HOST=0.0.0.0 API_SERVER_CORS=true API_CONTEXT_ROOT=v1

CMD ["cron", "-f"]