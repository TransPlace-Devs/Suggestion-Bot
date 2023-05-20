const {
    ActionRowBuilder,
    ButtonBuilder,
    EmbedBuilder,
} = require('discord.js');

exports.run = async (client, interaction, values) => {
    suggestionMessage = client.cache.get("suggestionMessage");

    const suggestionStatuses = {
        "denied": "🔴 Denied",
        "in progress": "🟡 In Progress",
        "implemented": "🟢 Implemented",
    };

    suggestionEmbed = new EmbedBuilder(suggestionMessage.embeds[0])
        .setDescription(
            suggestionMessage.embeds[0].description += `\n${suggestionStatuses[values[0]]}`
        );


    await suggestionMessage.edit({ "embeds": [suggestionEmbed.toJSON()] })
        .then(_ =>
            interaction.reply({ "content": "coolio", "ephemeral": true })
        )
        .catch(console.error);
};;