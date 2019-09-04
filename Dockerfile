FROM node:10-alpine
WORKDIR /app

# Copy root files to WORKDIR
COPY . /app
RUN npm install

EXPOSE 8080
CMD ["npm","start"]

