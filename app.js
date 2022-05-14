process.env.NTBA_FIX_319 = 1;

const TelegramBot = require('node-telegram-bot-api');
// const axios = require('axios');
const _ = require('lodash');
const Math = require('math');
const cheerio = require('cheerio');
const ndl = require('needle');
const wiki = require('wikipedia');
//const config = require('config');

const pg = require('pg');
const fs = require('fs');
const { val } = require('cheerio/lib/api/attributes');
const { regexpToText } = require('nodemon/lib/utils');
const { summary } = require('wikipedia');

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
	const { chat: { id }} = msg;
	await bot.sendMessage(id, match)
});

function sum(msg, match){ 
  return new Promise(function(resolve, reject){
      const result = x + y;
      resolve(result);
  });
}

bot.onText(/\/wiki (.+)/, (msg, match) => {
  const value = async (msg, match) => {
    // let set = match[1].split(' ');
    // let set = match[1];

    // var re = /[^"].*.["$]/i;
    // var re = /\".*.\"/i;
    // let query = match[1].match(re);
    // query = query.split('"');
    // let tmp = query[0].split("\"")[1];

    // console.log(match);
    let query = match[1]

    // re = /(\w+)$/i;
    // let language = set.match(re);
    // console.log(language);
    // console.log(set.split(result));
    // let query = set[0];
    // let language = set[1] ?? 'ru';

    await wiki.setLang('ru');
    let page = await wiki.page(query);
    let summary = await page.summary();

    return Promise.resolve(summary.extract);
  };
  const res = value(msg, match)
  .then(async (p1) => {
    await bot.sendMessage(msg.chat.id, p1);
  })
  .catch(async (e) => { 
    await bot.sendMessage(msg.chat.id, "Ничего не найдено|Not found");
    console.log("not found")
  });


});

//   console.log(query);
//   // bot.sendMessage(msg.chat.id, );
//   try {
//     page = await wiki.page(query);
//     console.log(page);
//     summary = await page.summary();
//     // await bot.sendMessage(msg.chat.id, summary);
//   } catch (error) {
//     console.log(error);
//   }
//   return page;
//   await bot.sendMessage(msg.chat.id, page);
//   // console.log(`this is ${summary}`);
// }).;

bot.onText(/\/help/, async (msg, error) => {
  const chatId = msg.chat.id;

	await bot.sendMessage(chatId, 
    "/help - Справка\n" +
    "/getSource - Вывести текущий курс валют\n" +
    "/getSource [...] - Вывести указанные курсы валют\n" + 
    "/random - Вывести случайное число\n" +
    "/setNick [nickname]\n" + 
    "/wiki [request] [language] по умолчанию русский(ru)\n"
    
    
  );
});

json1 = {
  "reply_markup": {
    "inline_keyboard": [
      [
        {
          text: "click me",
          callback_data: "hello",
        },
        {
          text: "click me",
          callback_data: "hello",
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
    
  }
  
};

// bot.onText(/\/button/, async (msg, info) => {
//   await bot.sendMessage(msg.chat.id, "Select channel", json1);
//   console.log(json1.reply_markup.inline_keyboard[2])

// });
bot.onText(/\/random/, async (msg, info) => {
  const chatId = msg.chat.id;
  if (msg.hasOwnProperty('reply_to_message')) {
    console.log(msg.text);  
    
    let number = getRandomArbitrary(0,1000);
    await bot.sendMessage(chatId, number);
  }
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
  }
});

