# The Cover Project Scraper

An image scrapper for [The Cover Project](http://www.thecoverproject.net).

<p align="center">
  <img src="https://i.imgur.com/Vo7Icat.png">
</p>

### Installation

  - You need [Node.js](https://nodejs.org/) to run this bot
  - You need the [sharp](https://www.npmjs.com/package/sharp) package to compress the images
  - You need the [request-promise](https://www.npmjs.com/package/request-promise) package to make HTTP requests
  - You need the [cheerio](https://www.npmjs.com/package/cheerio) package to parse through HTML data

Install the dependencies with:

```
npm install sharp
npm install request-promise
npm install cheerio
```

Simply run it with:

```
node index.js
```

Inside ```index.js```, use the argument to set an index from where you'll start scraping (from 1 to 16705):
```vai(1);```
Also, all images will be compressed. You can change de quality (from 0 to 100) here:
```.jpeg( { quality: 50 } )```
