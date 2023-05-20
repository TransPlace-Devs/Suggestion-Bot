module.exports = client => client.updateSlashCommands = async (guildID) => {

    client.commands.forEach((command, name, _) => {
        console.log(command, name);
        console.log(command.data)
        client.guilds.cache.get(guildID).commands.create(command.data.toJSON());
    });

};