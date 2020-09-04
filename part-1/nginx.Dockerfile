FROM nginx
RUN rm /etc/nginx/conf.d/default.conf
COPY src/config/nginx.conf /etc/nginx/conf.d/default.conf
