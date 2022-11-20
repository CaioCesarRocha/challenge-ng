FROM node:18-slim

WORKDIR /home/src/api

COPY . .


CMD ["sh", "-c","npm install && cd @core && cd infra && cd Prisma && npx prisma migrate dev && npm run express"]