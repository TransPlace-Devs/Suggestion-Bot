const { ModalBuilder, ActionRowBuilder, TextInputBuilder } = require("discord.js");

exports.run = async (client, interaction, options) => {
    const modal = new ModalBuilder()
        .setCustomId("suggestModalSubmit")
        .setTitle(`Create a Suggestion!`)
        .addComponents([
            new ActionRowBuilder().addComponents([
                new TextInputBuilder()
                    .setCustomId("suggestion")
                    .setRequired(true)
                    .setMinLength(5)
                    .setMaxLength(195)
                    .setLabel('Suggestion')
                    .setStyle(1)
                    .setPlaceholder('Do X.'),
            ]),
            new ActionRowBuilder().addComponents([
                new TextInputBuilder()
                    .setCustomId("reason")
                    .setRequired(true)
                    .setMinLength(5)
                    .setMaxLength(1024)
                    .setLabel('Reason')
                    .setStyle(2)
                    .setPlaceholder('Because Y.'),
            ]),
            new ActionRowBuilder().addComponents([
                new TextInputBuilder()
                    .setCustomId("info")
                    .setRequired(false)
                    .setMinLength(5)
                    .setMaxLength(1024)
                    .setLabel('Additional Info')
                    .setStyle(2)
                    .setPlaceholder('Optional.'),
            ]),
            new ActionRowBuilder().addComponents([
                new TextInputBuilder()
                    .setCustomId("asset")
                    .setRequired(false)
                    .setMinLength(5)
                    .setMaxLength(1024)
                    .setLabel('Image/Gif Asset ')
                    .setStyle(2)
                    .setPlaceholder('Optional imgur image url (https://i.imgur.com/example.png)'),
            ])
        ],);


    await interaction.showModal(modal);
}