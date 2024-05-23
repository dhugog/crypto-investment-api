FROM node:20.10-slim as build

RUN apt-get update -y && apt-get install -y python3 build-essential

WORKDIR /app
COPY package.json package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:20.10-slim as run
WORKDIR /app
COPY --from=build ["/app/dist", "./dist"]
COPY --from=build ["/app/node_modules", "./node_modules"]

CMD ["sh", "-c", "node dist/index.js"]
