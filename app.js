process.env.NTBA_FIX_319 = 1;

const TelegramBot = require('node-telegram-bot-api');
const axios = require('axios');
const _ = require('lodash');
const request = require('requests');
const Math = require('math');

//const config = require('config');

const pg = require('pg');
const fs = require('fs');

let token = fs.readFileSync('token.json', 'utf-8');
token = JSON.parse(token);
token = token[2].key;

function getRandomArbitrary(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}


const bot = new TelegramBot(token, {polling: true});

bot.onText(/\/echo (.+)/, async (msg, match) => {
	// console.log(msg, match);
  const chatId = msg.chat.id;
  const resp = match[1]; // the captured "whatever"
	// console.log(chatId);
  // send back the matched "whatever" to the chat
  await bot.sendMessage(chatId, resp);




});


bot.onText(/\/getid/, async (msg) => {

  const chatId = msg.chat.id;
  await bot.sendMessage(chatId, '123123');
});

bot.onText(/\/getCourse (.+)/, async (msg, [source, match] ) => {
	// console.log(msg);
	// console.log(source);
	// console.log(match);
	const { chat: { id }} = msg
	await bot.sendMessage(id, match)
});

bot.onText(/\/wiki (.+)/, (msg, math) => {
  axios
  .get('https://en.wikipedia.org/wiki/Quantum_computing')
  .then(res => {
    
    
    console.log(`statusCode: ${res.status}`);
    // console.log(res);
  })
  .catch(error => {
    console.error(error);
  });
});

bot.onText(/\/help/, async (msg, error) => {
  const chatId = msg.chat.id;

	await bot.sendMessage(chatId, "/help - Справка\n" +
    "/getSource - Вывести текущий курс валют\n" +
    "/getSource [...] - Вывести указанные курсы валют\n");
});

bot.on('message', async (msg, info) => {
  const chatId = msg.chat.id;
	//console.log(info)
	if (msg.hasOwnProperty('new_chat_participant')) {;
		if (msg['new_chat_participant']['is_bot'] == false) {
			await bot.sendMessage(chatId, 'Welcome to us');
		}
	} else if (msg.hasOwnProperty('reply_to_message')) {
    console.log(msg.text);  
    
    // let number = getRandomArbitrary(0,1000);
    // await bot.sendMessage(chatId, number);

    bot.sendMessage(msg.chat.id, "Select channel", {
      "reply_markup": {
        "inline_keyboard": [
          [
            {
              text: "Channel 1",
              callback_data: "click",
            },
          ],
          [
            {
              text: "Channel 2",
              callback_data: "click2",
            },
          ],
          [
            {
              text: "Channel 3",
              callback_data: "click",
            },
          ],
          [
            {
              text: "Channel 4",
              callback_data: "click2",
            },
          ],
          [
            {
              text: "Send post to channel",
              callback_data: "click2",
            },
          ],
        ],
        
      },
      
    });


  }



});



