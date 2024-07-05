const {
    ActionRowBuilder,
    SlashCommandBuilder,
    EmbedBuilder,
    ButtonBuilder,
} = require('discord.js');


exports.data = new SlashCommandBuilder()
    .setName("suggest")
    .setDescription("Make a server suggestion");

exports.run = async (client, interaction, options) => {
    const config = client.config[interaction.guild.id];

    if (interaction.member.roles.cache.has(config.suggestion_ban_role)) {
        return interaction.reply({
            content: "You have been banned from making suggestions. Please open a staff ticket if you believe this is a mistake.",
            ephemeral: true,
        });
    }

    await interaction.reply({
        ephemeral: true,
        embeds: [
            new EmbedBuilder()
                .setTitle("Please read before suggesting!")
                .setDescription("Thank you for suggesting improvements to the server! Before you proceed, please read the following commonly rejected suggestions and make sure your suggestion does not fall under any of these.")
                .addFields({
                    name: "Politics Channels",
                    value: "We do not allow politics to be discussed in this server. There was previously a politics channel, but due to persistent issues, it was removed, and we will not bring it back."
                })
                .addFields({
                    name: "Venting Channels",
                    value: `This is not the server for venting, as it can be upsetting to other users. Additionally, staff are not trained to provide the help and support needed for those in distress. As such, we will not add any sort of venting or ranting channel${config.partnerships_channel ? `, but if you want one, please check <#${config.partnerships_channel}> for a list of our partners, some of which have venting channels` : ""}.`
                })
                .addFields({
                    name: "Age Roles",
                    value: "Roles for identifying users as minors/adults or tagging users by age have been proposed before, and due to the risks and dangers outweighing any potential benefits of having them, we will not consider those roles."
                })
                .addFields({
                    name: "Unbanning discussion on DIY HRT/medical treatment",
                    value: "DIY medical treatment is dangerous. We maintain the ban on all discussions about or advocacy of illegitimate/DIY treatment, including but not limited to HRT, binders, dosages, etc. due to the potential harm to users and will not consider changing this policy."
                })
                .addFields({
                    name: "Not related to any of these?",
                    value: "If you have a suggestion for a feature, improvement, or change that is not related to the above, click below to continue. Thank you!"
                })
        ],
        components: [
            new ActionRowBuilder()
                .addComponents([
                    new ButtonBuilder()
                        .setCustomId("launchSuggestionModal")
                        .setLabel("Continue")
                        .setStyle(1)
            ])
        ]
    })
};
