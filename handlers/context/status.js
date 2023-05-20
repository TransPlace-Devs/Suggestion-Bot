const {
    SlashCommandStringOption,
    ContextMenuCommandBuilder,
    ApplicationCommandType,
} = require('discord.js');


exports.data = new ContextMenuCommandBuilder()
    .setName("Set Status")
    .setType(ApplicationCommandType.Message);

exports.run = async (client, interaction) => {
    const suggestionEmbed = interaction.targetMessage.embeds[0];
};