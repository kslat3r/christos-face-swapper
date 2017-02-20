# Christos face swapper

## Instructions (OSX)

* `brew tap homebrew/science`
* `brew install open-cv`
* `nvm use v7.5.0`
* `npm install`
* `npm install -g nodemon`
* `npm run start-dev`

## Config

###For local development

* Create file `server/config/development.json`
* Populate it with the following keys:

```
{
  "s3AccessKeyId": "",
  "s3SecretAccessKey": "",
  "s3BucketName": "",
  "s3Region": ""
}
```

###For production

* Create file `server/config/production.json`
* Populate it with the following keys:

```
{
  "s3AccessKeyId": "",
  "s3SecretAccessKey": "",
  "s3BucketName": "",
  "s3Region": ""
}
```
