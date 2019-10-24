# htz-ms-gif2webp

A dockerized miscroservice for converting (animated) gifs to webp

## USAGE

To build a deployment-ready docker image, run
```sh
docker build --rm -t htz-ms-gif2webp
```

The container runs an Express server, which is exposed on port 3000 and can convert
animated `gif` images (and other video formats) to animated `webp` images.

To run the container:
```sh
doker run -d -p <public-port>:3000 --restart=always htz-ms-gif2webp
```

### QUERY PARAM API

* **`source`** - A url pointing to the source file to be converted
  * **example1:** `https://gif2webp.haaretz.co.il/?source=https://foo.com/bar.gif`
  * **example2:** `https://gif2webp.haaretz.co.il/?source=https://foo.com/bar.mp4`
  * **note:** It is much faster to convert actual video files into animated `webp`
  than it is to transcode animated `gif` files, so it is preferable to provide
  an `mp4` file as source whenever possible.
* **`debug`** - Will print debug information to the server console when set to `true`.
  Prints url of converted file and timing information.


## DEVELOPMENT

`yarn start` runs the Express server locally. By default it runs on port `3000`
and host `localhost`, which can both be overridden with the `PORT` and `HOST`
env variable, e.g.,
```sh
HOST="foo.bar.com" PORT="8080" yarn start
```
