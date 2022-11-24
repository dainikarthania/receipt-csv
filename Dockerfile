FROM node:latest as builder
WORKDIR /usr/app
    
COPY ./package.json ./
RUN npm i
COPY ./ ./