#node
FROM node:14 as build
#working directory
WORKDIR /app
#copy the package.json
COPY package*.json ./
#angular install
RUN npm install -g @angular/cli
RUN npm install
# copy the rest of the code into the container
COPY . .
#server
FROM nginx:1.21.1
#copy the build folder into the docker
COPY --from=build /app/dist/m-aadhar-frontend-app /usr/share/nginx/html
#Expose the port
EXPOSE 80
#start the server of nginx on the container
CMD ["nginx", "-g", "daemon off;"]
