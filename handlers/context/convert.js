const {
    ContextMenuCommandBuilder,
    ApplicationCommandType,
    EmbedBuilder,
    ButtonBuilder,
    ButtonStyle,
    ActionRowBuilder,
    
} = require("discord.js");

const {
    parseOldEmbed
} = require("../../utils/parseOldEmbed.js");


exports.data = new ContextMenuCommandBuilder()
    .setName("Convert Suggestion")
    .setType(ApplicationCommandType.Message)
    .setDefaultMemberPermissions("0");

exports.run = async (client, interaction) => {
    await interaction.deferReply({ephemeral: true});
    const suggestionMessage = interaction.targetMessage;
    const suggestionEmbed = suggestionMessage.embeds[0];

    const parsedEmbed = await parseOldEmbed(interaction.guild, suggestionEmbed);

    await interaction.targetMessage.edit({ embeds: [parsedEmbed.toJSON()] });

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

    return interaction.followUp({
        embeds: [replyEmbed],
        components: [replyEmbedRow],
        ephemeral: true,
    });
};
