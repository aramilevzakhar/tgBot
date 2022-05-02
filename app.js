process.env.NTBA_FIX_319 = 1;

const TelegramBot = require('node-telegram-bot-api');
const _ = require('lodash')

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


let token = fs.readFileSync('token.json', 'utf-8');

token = JSON.parse(token);
//console.log(token);
//_.sortBy(token, Object.keys);
/*
console.log(Object.keys)
for (i=0; i < token.keys; i++) {
	console.log(i, Object.keys(token));
}
*/
arr = [{name: 'Fred', likes: 10}, {name: 'John', likes: 20}, {name: 'Alex', likes: 1}];
console.log(arr);
console.log(_.sortBy(arr, x => { return x["likes"] }));
// _.sortBy(arr, 'likes')
//arr = _.sortBy(arr, 'likes')
console.log(arr);


//console.log(token);

/*
// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {polling: true});


//bot.onText('/echo (.+)/', (msg, match) => {
bot.onText(/\/echo (.+)/, (msg, match) => {
  // 'msg' is the received Message from Telegram
  // 'match' is the result of executing the regexp above on the text content
  // of the message

	console.log('---------');
	console.log(msg, match);
	console.log('---------');
  const chatId = msg.chat.id;
  const resp = match[1]; // the captured "whatever"


	console.log('---------');
	console.log(chatId);
	console.log('---------');
  // send back the matched "whatever" to the chat
  bot.sendMessage(chatId, resp);
});

// Listen for any kind of message. There are different kinds of
// messages.


bot.on('message', (msg, info) => {
  const chatId = msg.chat.id;
	//console.log(info)
	
	if (msg.hasOwnProperty('new_chat_participant')) {;
		if (msg['new_chat_participant']['is_bot'] == false) {
			bot.sendMessage(chatId, 'Welcome to us');
		}
	}

	//console.log(info);
  // send a message to the chat acknowledging receipt of their message
});



*/
