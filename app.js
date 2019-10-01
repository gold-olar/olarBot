const express = require('express')
const app = express()

app.get('/', (req, res)=>{
    res.status(200).json({
        message: 'Welcome to Olarbot',
        owner: 'Olamide Samuel'
    })
})




const http = require('http');
const port = process.env.port || 3000;
const Telegraf = require('telegraf');
require('dotenv').config()
const bot = new Telegraf(process.env.BOT_TOKEN);
const axios = require('axios');
const validator = require('validator');

// const server = http.createServer();
// server.listen(port, (err) => {
//     if (err) {
//         return console.log('something bad happened', err)
//     }
//     console.log(`server is listening on ${port}`)
// });

app.listen(port, () => console.log(` app listening on port ${port}!`))


bot.start((ctx) => {
    const name = ctx.message.from.first_name;
    ctx.reply(`Hey there ${name} , Enter a long link to be shortened...
    or enter "/help" to get a list of things i could do..
    `)
    .then()
});
bot.hears('hi', (ctx) => {
    const name = ctx.message.from.first_name;
    ctx.reply(`Hey there, ${name}`)
});
bot.help((ctx) => ctx.reply(`
    Hi, i'm OlarBot the url Shortner....
    You can use me to shorten urls, 
    You can send me a sticker
`));
bot.on('text', async (ctx) => {
    link = ctx.message.text;
    if (validator.isURL(link)) {
        axios({
            method: 'post',
            url: 'https://api-ssl.bitly.com/v4/shorten',
            data: {
                "long_url": "https://shortin.herokuapp.com",
                "group_guid": "Bj8dh1pdEfH"
            },
            headers: {
                "Content-Type": "application/json",
                "Authorization": 'Bearer ' + 'ced3fa5b1125069756cb5eb600ef96b0cd2e2bd2'
            }
        })
            .then(function (response) {
                ctx.reply(response.data.link)
            })
            .catch(function (error) {
                ctx.reply("Couldnt Shortin this link");
                ctx.reply(error.message);
                // console.log(error);
            });

        ctx.reply("Thank You for using OlarBot")

    } else {
        ctx.reply("Goldin made me just a url shorter, So i understand only links ....")
    }

})
bot.on('sticker', (ctx) => ctx.reply('Ode...'));



// bot.hears('Hi', (ctx) => ctx.reply('Hey there, What do u want to do today?'));
// bot.command('google', (ctx) => ctx.reply('What do u want to search for??'))
// bot.hears('google', (ctx) => {
//     console.log(ctx.message)
//     ctx.reply('What do you want to search for?')
// });




bot.launch();

module.exports = app;