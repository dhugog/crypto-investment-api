FROM node:22.2-slim as build

RUN apt-get update -y && apt-get install -y python3 build-essential

WORKDIR /app
COPY package.json yarn.lock .yarnrc.yml ./
RUN yarn install
COPY . .
RUN npm run build

FROM node:22.2-slim as run
WORKDIR /app
COPY --from=build ["/app/dist", "./dist"]
COPY --from=build ["/app/node_modules", "./node_modules"]

CMD ["sh", "-c", "node dist/index.js"]
