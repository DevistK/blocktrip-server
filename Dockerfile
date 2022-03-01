FROM node:12 as builder
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

FROM node:12-alpine
WORKDIR /app
COPY --from=builder /app ./
CMD ["node", "dist/main"]