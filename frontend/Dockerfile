# Use a lightweight web server as the base image
FROM nginx:alpine

# Copy the HTML page into the default Nginx public folder
COPY ./index.html /usr/share/nginx/html/index.html  
COPY ./styles/ /usr/share/nginx/html/styles/
COPY ./images/  /usr/share/nginx/html/images/ 
# COPY ../images/  /usr/share/nginx/html/images/ 
COPY ./pages/  /usr/share/nginx/html/pages/
COPY ./scripts/  /usr/share/nginx/html/scripts/ 




# Expose port 80 to the outside world
EXPOSE 80