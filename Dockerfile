#
# The Builder stage. This stage contains all of the dependencies required
# to compile any assets that will be used at runtime. By keeping build
# dependencies in a seperate step it prevents them from accidentally being
# shipped to production.
#
FROM node:12.14-alpine as builder

WORKDIR /app

# Install system dependencies
RUN apk --no-cache --quiet add \
      bash \
      build-base \
      curl \
      git \
      python

# Copy files required for installation of application dependencies
COPY package.json yarn.lock ./
COPY patches ./patches

# Install application dependencies
# I would usually use the yarn `--modules-folder` argument in place of a `mv`
# command however there is bug in heapdump that causes it to improperly look up
# depdendencies when it is running post-install hooks.
RUN yarn install --production --frozen-lockfile --quiet \
  && mv node_modules /opt/node_modules.prod \
  && yarn install --frozen-lockfile --quiet \
  && yarn cache clean --force

# Copy application code
COPY . ./

# Build application
# Update file/directory permissions
RUN yarn assets && \
    yarn build:server

#
# Release stage. This stage creates the final docker iamge that will be
# released. It contains only production dependencies and artifacts.
#
# TODO: Make the COPY steps more explicit, the iamge still copies in the all raw
# sources and configuration.
#
FROM node:12.14-alpine as release

RUN apk --no-cache --quiet add \
  bash \
  dumb-init \
  && adduser -D -g '' deploy

WORKDIR /app
RUN chown deploy:deploy $(pwd)

USER deploy

COPY --chown=deploy:deploy --from=builder /app/apollo.config.js .
COPY --chown=deploy:deploy --from=builder /app/babel.config.js .
COPY --chown=deploy:deploy --from=builder /app/data ./
COPY --chown=deploy:deploy --from=builder /app/jest.config.js .
COPY --chown=deploy:deploy --from=builder /app/manifest.json .
COPY --chown=deploy:deploy --from=builder /app/package.json .
COPY --chown=deploy:deploy --from=builder /app/public ./
COPY --chown=deploy:deploy --from=builder /app/relay.config.js .
COPY --chown=deploy:deploy --from=builder /app/scripts ./
COPY --chown=deploy:deploy --from=builder /app/server.dist.js .
COPY --chown=deploy:deploy --from=builder /app/server.dist.js.map .
COPY --chown=deploy:deploy --from=builder /app/src ./src
COPY --chown=deploy:deploy --from=builder /app/tsconfig.json .
COPY --chown=deploy:deploy --from=builder /app/webpack ./
COPY --chown=deploy:deploy --from=builder /app/yarn.lock .

# Production node modules.
COPY --chown=deploy:deploy --from=builder /opt/node_modules.prod /app/node_modules

ENTRYPOINT ["/usr/bin/dumb-init", "--"]
CMD ["yarn", "start"]
