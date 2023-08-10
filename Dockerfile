FROM node:lts-alpine

# Create app directory
WORKDIR /usr/src/app
ENV NODE_OPTIONS="--max_old_space_size=4096"
# Install app dependencies
COPY . .
# RUN npm install -g yarn
RUN yarn install
RUN npm install -g nodemon mocha supervisor

# Typescript transpile
RUN yarn run build

# Set grants SA and bundle app source
RUN chown -R node:node .

# Change SA
USER node

# Run app
CMD [ "yarn", "start" ]
