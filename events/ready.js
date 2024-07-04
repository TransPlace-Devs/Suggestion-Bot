module.exports = async (client) => {
    console.log("Bot started!");

    for (const guildId in client.config) {
        client.updateSlashCommands(guildId)
    }
}