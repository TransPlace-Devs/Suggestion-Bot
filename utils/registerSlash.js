module.exports = client => client.updateSlashCommands = async (guildID) => client.guilds.cache.get(guildID).commands.create({
    name: "suggest",
    description: "Make a server suggestion",
})