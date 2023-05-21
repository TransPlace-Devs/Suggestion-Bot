const {
    ActionRowBuilder,
    ButtonBuilder,
    EmbedBuilder,
    ButtonStyle,
} = require('discord.js');

const {
    parseOldEmbed,
} = require('../../utils/parseOldEmbed.js');

exports.run = async (client, interaction, values) => {
    const suggestionMessage = client.cache.get("suggestionMessage");

    const suggestionStatuses = {
        "denied": "\`\`\`🔴 Denied\`\`\`",
        "in progress": "\`\`\`🟡 In Progress\`\`\`",
        "implemented": "\`\`\`🟢 Implemented\`\`\`",
    };

    let suggestionEmbed;

    if (suggestionMessage.embeds[0].fields?.length > 0) {
        suggestionEmbed = new EmbedBuilder(suggestionMessage.embeds[0]);
    } else {
        suggestionEmbed = await parseOldEmbed(interaction.guild, suggestionMessage.embeds[0]);
    }


    let suggestionFields = suggestionEmbed.data.fields;

    if (Object.values(suggestionStatuses).includes(suggestionFields.at(-2).value)) {
        suggestionFields.splice(-2, 1, { name: "Status", value: suggestionStatuses[values[0]] });
    } else {
        suggestionFields.splice(-1, 0, { name: "Status", value: suggestionStatuses[values[0]] });
    }

    suggestionEmbed.setFields(suggestionFields);

    await suggestionMessage.edit({ "embeds": [suggestionEmbed.toJSON()] });


    const replyEmbed = new EmbedBuilder()
        .setTitle("Succes!")
        .setDescription("Good job my code didn't break <3")
        .setColor(0x4e2f57);

    const replyEmbedRow = new ActionRowBuilder();

    replyEmbedRow.addComponents([
        (new ButtonBuilder()
            .setLabel("Jump to Suggestion")
            .setURL(suggestionMessage.url)
            .setStyle(ButtonStyle.Link))
    ]);

    return interaction.reply({
        embeds: [replyEmbed],
        components: [replyEmbedRow],
        ephemeral: true,
    });

};