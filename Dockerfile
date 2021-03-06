FROM node:8.11-alpine

# Create directory 
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install --only=production

# Copy sources
COPY src /app

# Define environment variables
ENV NODE_ENV=production MONGO_HOST=192.168.0.42 MONGO_PORT=27017 MONGO_DB=ECSO-DB MONGO_USER=ecso_user MONGO_PASS=Qwerty12

# Apply cron job
RUN echo "* * * * * node /app/index.js" >> /app/crontab
RUN crontab /app/crontab

# Execute cron scheduler and redirect output to stdout
CMD ["crond", "-f", "-L", "/dev/stdout"]