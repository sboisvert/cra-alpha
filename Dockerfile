FROM node:lts-alpine
LABEL maintainer="paul.craig@cds-snc.ca"

ARG GITHUB_SHA_ARG
ENV GITHUB_SHA=$GITHUB_SHA_ARG

WORKDIR /app
COPY . .

RUN npm install --production

EXPOSE 3000
CMD ["npm", "start"]

