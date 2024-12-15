FROM node:18.12.0-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

CMD ["npm", "start"]



# docker build -t my-react-app .
# docker run -d -p 3001:3000 my-react-app
