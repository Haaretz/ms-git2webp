FROM ubuntu:disco

# Set the default shell to bash so we can source files
SHELL [ "/bin/bash", "-c" ]

# nvm environment variables
ENV DISTRO linux-64
ENV NODE_MAJOR 10
ENV NODE_VERSION 10.8.0
ENV NODE_DIR /usr/local/nvm
# ENV NVM_DIR /usr/local/nvm

# update the repository sources list and install dependencies
RUN apt-get update \
    && apt-get install -y ffmpeg curl
RUN curl -sL https://deb.nodesource.com/setup_${NODE_MAJOR}.x | bash -
RUN apt-get install -y nodejs \
    && apt-get -y autoclean

# confirm installation
RUN node -v
RUN npm -v
# RUN npm install --global npm
# RUN npm -v

# Prepare webapp
ENV APP_DIR /usr/src/app
RUN mkdir -p ${APP_DIR}
WORKDIR ${APP_DIR}
COPY index.js .
COPY package.json .
COPY yarn.lock .

# Install yarn
RUN npm install --global yarn

# Install project dependencies
RUN yarn

EXPOSE 3000
CMD ["yarn", "start"]
