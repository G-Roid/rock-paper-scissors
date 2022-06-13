const http = require('http');
const fs = require('fs')
const url = require('url');
const querystring = require('querystring');
const figlet = require('figlet')

const server = http.createServer((req, res) => {
  const page = url.parse(req.url).pathname;
  const params = querystring.parse(url.parse(req.url).query);
  console.log(page);
  if (page == '/') {
    fs.readFile('index.html', function(err, data) {
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(data);
      res.end();
    });
  }

  else if (page == '/api') {
    if('userchoice' in params){
      if(params['userchoice']== 'Rock' || params['userchoice']== 'Paper' || params['userchoice']== 'Scissors' ){
        res.writeHead(200, {'Content-Type': 'application/json'});  
        
        let computer = generateChoice()


        const objToJson = {
          user: params['userchoice'],
          computer: computer,
          result: checkWinner(params['userchoice'], computer)
        }
        res.end(JSON.stringify(objToJson));
      }//User Choice


      // else if(params['student'] != 'leon'){
      //   res.writeHead(200, {'Content-Type': 'application/json'});
      //   const objToJson = {
      //     name: "unknown",
      //     status: "unknown",
      //     currentOccupation: "unknown"
      //   }
      //   res.end(JSON.stringify(objToJson));
      // }//student != leon
    }//student if
  }//else if
  else if (page == '/css/style.css'){
    fs.readFile('css/style.css', function(err, data) {
      res.write(data);
      res.end();
    });
  }else if (page == '/js/main.js'){
    fs.readFile('js/main.js', function(err, data) {
      res.writeHead(200, {'Content-Type': 'text/javascript'});
      res.write(data);
      res.end();
    });
  }else{
    figlet('404!!', function(err, data) {
      if (err) {
          console.log('Something went wrong...');
          console.dir(err);
          return;
      }
      res.write(data);
      res.end();
    });
  }
});

server.listen(8000);

function generateChoice() {

  let randomNumber = Math.ceil((Math.random() * 3))
  console.log(randomNumber)
  if ( randomNumber === 1 ) {
    return 'Rock'
  } else if ( randomNumber === 2 ) {
    return 'Paper'
  } else {
    return 'Scissors'
  }
}

function checkWinner(a, b) {
  console.log(a)
  console.log(b)
  if (a === b) {
    return 'Draw'
  } else if ( (a === 'Rock' && b == 'Scissors') || (a === 'Paper' && b == 'Rock') || (a === 'Scissors' && b == 'Paper') ) {
    return "Win"
  } else {
    return 'Lose'
  }

}
