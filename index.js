const fs = require("fs");
const Discord = require('discord.js');

const client = new Discord.Client({
	intents: ['Guilds', 'GuildMembers', 'GuildMessages', 'GuildMessageReactions'],
	partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
});

require('./utils/registerSlash')(client);

require("dotenv").config()

client.slash = new Discord.Collection();
client.modal = new Discord.Collection();

process.on('unhandledRejection', error => {
    console.error('Unhandled promise rejection:', error);
});

process.on('uncaughtException', function (err) {
    console.log('Caught exception: ' + err);
});


fs.readdir("./events/", (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
        const event = require(`./events/${file}`);
        let eventName = file.split(".")[0];
        client.on(eventName, event.bind(null, client));
    });
});

fs.readdir("./handlers/slash/", (err, files) => {
    if (err) return console.error(err);
    files.forEach(f => {
        let slashName = f.split(".")[0];
        let pull = require(`./handlers/slash/${slashName}`);
        client.slash.set(slashName, pull);
    });
});

fs.readdir("./handlers/modal/", (err, files) => {
    if (err) return console.error(err);
    files.forEach(f => {
        let slashName = f.split(".")[0];
        let pull = require(`./handlers/modal/${slashName}`);
        client.modal.set(slashName, pull);
    });
});

client.login(process.env.TOKEN);