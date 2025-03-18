# Produksjons-Dockerfile for React-applikasjon

# Byggesteg
FROM node:alpine as build

# Sett arbeidskatalogen i containeren
WORKDIR /app

# Kopier package.json og package-lock.json
COPY package*.json ./

# Installer avhengigheter
RUN npm install

# Kopier resten av applikasjonskoden
COPY . .

# Kjør sikkerhetsskanning
RUN npm audit --production || echo "Sikkerhetsproblemer funnet - vurder å fikse før produksjonssetting"

# Bygg applikasjonen
RUN npm run build

# Kjøresteg
FROM nginx:alpine

# Sikkerhetstiltak: Kjør Nginx som ikke-root
RUN touch /var/run/nginx.pid && \
    chown -R nginx:nginx /var/cache/nginx /var/run/nginx.pid /var/log/nginx

# Kopier bygde filer til Nginx-serveren
COPY --from=build /app/build /usr/share/nginx/html

# Sikkerhetstiltak: Sett riktig eierskap på innholdsfiler
RUN chown -R nginx:nginx /usr/share/nginx/html

# Kopier Nginx-konfigurasjon (valgfritt)
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# Eksponer port 80
EXPOSE 80

# Bruk nginx-bruker i stedet for root
USER nginx

# Start Nginx-serveren
CMD ["nginx", "-g", "daemon off;"]