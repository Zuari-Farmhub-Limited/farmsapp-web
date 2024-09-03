# Use a lightweight web server as the base image
FROM nginx:alpine

# Copy the HTML page into the default Nginx public folder
COPY index.html /usr/share/nginx/html
COPY images /usr/share/nginx/html/images/


# Expose port 80 to the outside world
EXPOSE 80
