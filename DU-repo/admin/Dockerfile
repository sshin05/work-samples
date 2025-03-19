# In order to use this value in the FROM statement, it must be declared before.
# However, because of docker scoping rules, it is not available after the FROM.
ARG CI_REGISTRY
FROM ${CI_REGISTRY}/bespin/products/digital-u/licensed/digital-university-docker-images/master:node-22-13-1-alpine-3-21

ARG DU_NPM_TOKEN
ENV DU_NPM_TOKEN=${DU_NPM_TOKEN}

ARG CACHE_BUST=1
RUN apk update && \
    apk add --upgrade --no-cache openssl libcrypto3 libssl3 ncurses-libs ncurses-terminfo-base

WORKDIR /usr/src/app

# Args needed for npm run build.
ARG ENV
ARG CI_COMMIT_REF_SLUG
ARG FEATURE

# Install DOD certs.
# Install DOD certs
COPY dodcerts.pem ./
ENV NODE_EXTRA_CA_CERTS=./dodcerts.pem

# Additional ENV needed for npm run build.
ENV ENV=$ENV
ENV CI_COMMIT_REF_SLUG=$CI_COMMIT_REF_SLUG
ENV FEATURE=$FEATURE

# Install dependencies.
COPY .npmrc panda.config.ts postcss.config.cjs ./
RUN npm install -g npm@next-9
COPY package*.json ./
RUN npm install

# Build.
COPY . .
RUN npm run build
RUN npm prune --production

# Start.
EXPOSE 8080
CMD [ "npm", "run", "start" ]
