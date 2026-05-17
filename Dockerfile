FROM nginx:1.25.3-alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY index.html script.js styles.css /usr/share/nginx/html/
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
