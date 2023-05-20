const {
    ActionRowBuilder,
    ButtonBuilder,
    EmbedBuilder,
    Message,
} = require('discord.js');

exports.run = async (client, interaction, values) => {
    suggestionMessage = client.cache.get("suggestionMessage");

    const suggestionStatuses = {
        "denied": "\`\`\`🔴 Denied\`\`\`",
        "in progress": "\`\`\`🟡 In Progress\`\`\`",
        "implemented": "\`\`\`🟢 Implemented\`\`\`",
    };
    console.log(typeof(suggestionStatuses))
    suggestionEmbed = new EmbedBuilder(suggestionMessage.embeds[0]);

    suggestionFields = suggestionMessage.embeds[0].data.fields;

    if (Object.values(suggestionStatuses).includes(suggestionFields.at(-2).value)) {
        suggestionFields.splice(-2, 1, { name: "Status", value: suggestionStatuses[values[0]] });
    } else {
        suggestionFields.splice(-1, 0, { name: "Status", value: suggestionStatuses[values[0]] });
    }

    suggestionEmbed.setFields(suggestionFields);

    await suggestionMessage.edit({ "embeds": [suggestionEmbed.toJSON()] })
        .then(_ =>
            interaction.reply({ "content": "coolio", "ephemeral": true })
        )
        .catch(console.error);
};