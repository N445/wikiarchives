Installation
=

```
git clone git@github.com:N445/wikiarchives.git
cd wikiarchives
cp .env .env.local
composer install
# give permission to /var /public/uploads and /public/media
# if needed change in .env.local "APP_ENV=dev" to "APP_ENV=prod"
```


Dev
==

```
yarn install
yarn run encore dev
# or
yarn run encore dev --watch
# or
yarn run encore production
```
