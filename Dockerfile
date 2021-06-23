FROM node:14-alpine

WORKDIR /app

COPY package*.json ./

RUN npm i

COPY . .

ENV GENERATE_SOURCEMAP=false \
    REACT_APP_IMGBB="" \
    REACT_APP_STRIPEKEY="" \
    JWTSECRET="" \
    STRIPT_SECRET_KEY="" \
    MONGOURI="mongodb://mongo:27017/ecommerce" \
    PORT=3000 

RUN npm run build

CMD [ "npm", "start" ]