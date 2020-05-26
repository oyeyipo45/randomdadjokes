// const request = require('request')
// const fs = require('fs')

// const searchTerm = 

// const options = {
//     url : `https://icanhazdadjoke.com/search?terms${searchTerm}`,
//     headers: {
//         "User-Agent" : 'request',
//         "Accept" : "application/json"
//     }
// };

// request(options, (err, res, body) => {
   
//     if(!err && res.statusCode == 200){
//      const jokes = JSON.parse(body).results
//      parseJoke(jokes);
     
//     } else {
//         console.log('server error', err);
//     }

// })

// parseJoke = (jokes) => {
//   if (jokes.length !== 0) {
//     const randomJoke = jokes[Math.floor(Math.random() * jokes.length)];
//     const joke = randomJoke.joke;
//     console.log(joke);
    
//     fs.appendFile('joke.txt', joke + '\n', function (err) {
//       if (err) throw err;
//       console.log('New Joke Appended To File')
//     })
//   } 
//   else {
//     console.log('No joke matches the search term')
//     }
// }

const request = require('request');
const fs = require('fs');
const searchTerm = process.argv[2];
console.log(searchTerm)
// process.argv[2]


const options = {
  url: `https://icanhazdadjoke.com/search?term=${searchTerm}`,
  headers: {
    'User-Agent': 'request',
    'Accept': 'application/json',
  },
};

request(options, function (error, response, data){
  if (!error && response.statusCode == 200) {
    const jokes = JSON.parse(data).results;
    getJoke(jokes);
  } else {
    console.log('Error', error);
  }
});

getJoke = (jokes)  => {
  if (jokes.length !== 0) {
    const randomJoke = jokes[Math.floor(Math.random() * jokes.length)];
    const joke = randomJoke.joke;
    fs.appendFile('joke.txt', joke + '\n', (err) =>  {
      if (err) throw err;
      console.log('Joke Appended to Joke.txt');
      console.log(joke);
    });
  } else {
    console.log('No joke matches this searchTerm');
  }
}
