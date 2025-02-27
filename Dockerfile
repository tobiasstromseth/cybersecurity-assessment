# Produksjons-Dockerfile for React-applikasjon

# Byggesteg
FROM node:18-alpine as build

# Sett arbeidskatalogen i containeren
WORKDIR /app

# Kopier package.json og package-lock.json
COPY package*.json ./

# Installer avhengigheter
RUN npm install

# Kopier resten av applikasjonskoden
COPY . .

# Bygg applikasjonen
RUN npm run build

# Kjøresteg
FROM nginx:alpine

# Kopier bygde filer til Nginx-serveren
COPY --from=build /app/build /usr/share/nginx/html

# Kopier Nginx-konfigurasjon (valgfritt)
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# Eksponer port 80
EXPOSE 80

# Start Nginx-serveren
CMD ["nginx", "-g", "daemon off;"]