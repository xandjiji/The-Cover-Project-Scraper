// scraper libs
const rp = require('request-promise');
const $ = require('cheerio');

// download file libs
var http = require('http');
var fs = require('fs');

// compression lib
const sharp = require('sharp');

// urls
const url = 'http://www.thecoverproject.net/view.php?cover_id=';
const baseURL = 'http://www.thecoverproject.net'

sharp.cache(false);

console.log("bot iniciado!");

function vai(id){

     var timestamp = new Date().toLocaleTimeString('en-US', { hour12: false, hour: "numeric", minute: "numeric"});

     rp(url + id)
          .then(function(html){

               // parser pra pegar o link
               var link = baseURL + $('h2 > a', html).attr('href');

               // parser pra pegar o titulo do jogo
               var gameConsole = $('title', html).text();

               var index = gameConsole.indexOf('(');
               gameConsole = gameConsole.substring(index, gameConsole.length - 19);

               var title = link;
               title = title.substring(55, title.length);

               // salva a imagem
               const file = fs.createWriteStream("cover.jpg");
               const request = http.get(link, function(response) {

                    // comprime a imagem
                    response.pipe(file.on('finish', function() {

                         sharp("cover.jpg")
                              .jpeg( { quality: 50 } )
                              .toFile('saved/' + gameConsole + title)
                              .then(info => {
                                   console.log('[' + timestamp + '] ' + gameConsole + title + ' finished (#' + id + ')');
                                   if(id != 16706){
                                        vai(id+1);
                                   }
                              })
                              .catch(err => {
                                   console.log('[' + timestamp + '] ' + 'ERROR: #' + id + ' failed.');
                                   if(id != 16706){
                                        vai(id+1);
                                   }
                              });
                    }));
               })
               .on("error", (err) => {
                    console.log('[' + timestamp + '] ' + 'ERROR: #' + id + ' failed.');
                    if(id != 16706){
                         vai(id+1);
                    }
               });

          })
          .catch(function(err){
               console.log(err);
          });
}

vai(1);
