process.env.NTBA_FIX_319 = 1;

const TelegramBot = require('node-telegram-bot-api');
const axios = require('axios');
const _ = require('lodash');
//const config = require('config');

const pg = require('pg');
const fs = require('fs');
// replace the value below with the Telegram token you receive from @BotFather
/*
fs.readFile('token.json', 'utf-8', (error, data) => {
	if (error) {
		console.error(error);
		return;
	}
	const token = JSON.parse(data).token;
});
*/
// axios
//   .get('https://akanji.ru')
//   .then(res => {
//     console.log(`statusCode: ${res.status}`);
//     console.log(res);
//   })
//   .catch(error => {
//     console.error(error);
//   });


let token = fs.readFileSync('token.json', 'utf-8');
//console.log(token);
token = JSON.parse(token);
token = token[2].key;
console.log(token)
//console.log(token);
//_.sortBy(token, Object.keys);

// console.log(Object.keys)
// for (i=0; i < token.keys; i++) {
// 	console.log(i, Object.keys(token));
// }

//arr = [{name: 'Fred', likes: 10}, {name: 'John', likes: 20}, {name: 'Alex', likes: 1}];
//let arr = fs.readFile('users.json', 'utf-8');
//arr = JSON.parse(arr);
//arr = [{name: 'user1', isActive: false}, {name: 'user2', isActive: true}, {name: 'user3', isActive: false}];
//console.log(arr);
//arr = _.groupBy(arr, 'isActive')
//console.log(arr);
//console.log(_.sortBy(arr, x => { return x["likes"] }));
// arr = _.sortBy(arr, 'id')
//arr = _.sortBy(arr, 'likes')
//console.log(arr);
//console.log(token);
// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {polling: true});
//bot.onText('/echo (.+)/', (msg, match) => {
bot.onText(/\/echo (.+)/, (msg, match) => {
  // 'msg' is the received Message from Telegram
  // 'match' is the result of executing the regexp above on the text content
  // of the message
	console.log(msg, match);
  const chatId = msg.chat.id;
  const resp = match[1]; // the captured "whatever"
	console.log(chatId);
  // send back the matched "whatever" to the chat
  bot.sendMessage(chatId, resp);
});


bot.onText(/\/getid (.+)/, (msg, match) => {
  // 'msg' is the received Message from Telegram
  // 'match' is the result of executing the regexp above on the text content
  // of the message
	console.log(msg, match);
  const chatId = msg.chat.id;
  const resp = match[1]; // the captured "whatever"
	console.log(chatId);
  // send back the matched "whatever" to the chat
  bot.sendMessage(chatId, resp);
});

bot.onText(/\/getCourse (.+)/, (msg, [source, match] ) => {
	console.log(msg);
	console.log(source);
	console.log(match);
	const { chat: { id }} = msg
	bot.sendMessage(id, match)
});

bot.onText(/\/help/, async (msg, error) => {
  const chatId = msg.chat.id;

	await bot.sendMessage(chatId, "/help - Справка\n" +
    "/getSource - Вывести текущий курс валют\n" +
    "/getSource [...] - Вывести указанные курсы валют\n");
});

//bot.sendMessage(msg.chat.id, "answer.", option);
// Listen for any kind of message. There are different kinds of
// messages.
bot.on('message', async (msg, info) => {
  const chatId = msg.chat.id;
	//console.log(info)
	if (msg.hasOwnProperty('new_chat_participant')) {;
		if (msg['new_chat_participant']['is_bot'] == false) {
			await bot.sendMessage(chatId, 'Welcome to us');
		}
	}



});



