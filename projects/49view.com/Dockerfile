FROM node:13.7.0 as builder

ARG REACT_APP_EH_CLOUD_HOST_ARG
ENV REACT_APP_EH_CLOUD_HOST=$REACT_APP_EH_CLOUD_HOST_ARG

ARG REACT_APP_EH_ANTIFORGERYTOKEN_COOKIE_ARG
ENV REACT_APP_EH_ANTIFORGERYTOKEN_COOKIE=$REACT_APP_EH_ANTIFORGERYTOKEN_COOKIE_ARG

ARG REACT_APP_EH_STELLE_E_STRISCE_PK_ARG
ENV REACT_APP_EH_STELLE_E_STRISCE_PK=$REACT_APP_EH_STELLE_E_STRISCE_PK_ARG

ARG REACT_APP_EH_STELLE_E_STRISCE_SK_ARG
ENV REACT_APP_EH_STELLE_E_STRISCE_SK=$REACT_APP_EH_STELLE_E_STRISCE_SK_ARG

WORKDIR /app
COPY ./package.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx
EXPOSE 3000
COPY ./nginx-portal/http.conf /etc/nginx/conf.d/http.conf
COPY ./nginx-portal/nginx.conf /etc/nginx/nginx.conf

COPY --from=builder /app/build /usr/share/nginx/html
