process.env.NTBA_FIX_319 = 1;
const TelegramBot = require('node-telegram-bot-api');
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
token = JSON.parse(token).token;


console.log(token)



//console.log(data);



// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {polling: true});

// Matches "/echo [whatever]"
bot.onText(/\/echo (.+)/, (msg, match) => {
  // 'msg' is the received Message from Telegram
  // 'match' is the result of executing the regexp above on the text content
  // of the message

  const chatId = msg.chat.id;
  const resp = match[1]; // the captured "whatever"


  // send back the matched "whatever" to the chat
  bot.sendMessage(chatId, resp);
});

// Listen for any kind of message. There are different kinds of
// messages.
bot.on('message', (msg, info) => {
  const chatId = msg.chat.id;


	console.log(info)
	//console.log(msg);



	if (msg['new_chat_participant']['is_bot'] == false) {
		bot.sendMessage(chatId, 'Welcome to us');

	}


	//console.log(info);
  // send a message to the chat acknowledging receipt of their message
});
