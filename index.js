const fs = require("fs");
const Discord = require('discord.js');

const client = new Discord.Client({
    intents: ['Guilds', 'GuildMembers', 'GuildMessages', 'GuildMessageReactions'],
    partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
});


require("dotenv").config();

client.commands = new Discord.Collection();
client.components = new Discord.Collection();
client.cache = new Discord.Collection(); // Dunno if this exists already; I don't think it does

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
        let pull = require(`./handlers/slash/${f}`);
        let slashName = pull.data.name;
        client.commands.set(slashName, pull);
    });
});

fs.readdir("./handlers/component/", (err, files) => {
    if (err) return console.error(err);
    files.forEach(f => {
        let componentName = f.split(".")[0];
        let pull = require(`./handlers/component/${f}`);
        client.components.set(componentName, pull);
    });
});

fs.readdir("./handlers/context/", (err, files) => {
    if (err) return console.error(err);
    files.forEach(f => {
        let pull = require(`./handlers/context/${f}`);
        let contextName = pull.data.name;

        client.commands.set(contextName, pull);
        console.log(contextName)
    });
});

require('./utils/registerCommands')(client);


client.login(process.env.TOKEN);