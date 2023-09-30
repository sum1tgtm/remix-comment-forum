FROM node:18
WORKDIR /var/www/commentforum
COPY package.json .
RUN npm install
COPY . .
ENV NODE_ENV=production
EXPOSE 3000

RUN chmod +x start.sh
CMD ["./start.sh"]