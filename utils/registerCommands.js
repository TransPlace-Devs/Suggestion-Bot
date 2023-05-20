module.exports = client => client.updateSlashCommands = async (guildID) => {

    client.commands.forEach((command, name, _) => {
        client.guilds.cache.get(guildID).commands.create(command.data.toJSON());
    });

};