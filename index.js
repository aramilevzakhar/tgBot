// const request = require("request");
// url = 'https://ru.wikipedia.org/wiki/%D0%9A%D0%B2%D0%B0%D0%BD%D1%82%D0%BE%D0%B2%D1%8B%D0%B9_%D0%BA%D0%BE%D0%BC%D0%BF%D1%8C%D1%8E%D1%82%D0%B5%D1%80';
//query = "Sex"
//url = `https://en.wikipedia.org/w/api.php?action=opensearch&search="+ ${query} +"&format=json`;
//url = `'https://en.wikipedia.org/wiki/Sexual_intercourse`
// request(url, function (err, response, body) {
//   if (err) {
//     var error = "cannot connect to the server";
//     console.log(error);
//   } else {
//     let wiki = JSON.parse(body);
//     console.log(wiki);
//   }
// });

const axios = require('axios');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

// var regex = /<p>\w+<p>/g;
let regex = /html(?=[^>]*<html)/
// names.split(pattern);

axios.get('https://en.wikipedia.org/wiki/Quantum_computing').then(res => {
  // console.log(`statusCode: ${res.status}`);
  // console.log(res.status);
  res = res.data;
  // res = res.getElementById('toc');

  const dom = new JSDOM(res);
  console.log();
  // console.log(res);
  // res = res.search(regex);
  // console.log(res);
  // console.log(res.search(regex));
}).catch((error) => {
  console.error(error);
});


// var request = require(‘request’);
// var query = ‘english’;
// var url = `https://en.wikipedia.org/w/api.php?action=opensearch&search="+ ${query} +”&format=json`;
// request(url, function (err, response, body) {
//  if(err){
//  var error = “cannot connect to the server”;
//  console.log(error);
// } else {
//  console.log(‘body:’, body);
//  }
// });
