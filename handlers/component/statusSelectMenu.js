const {
    ActionRowBuilder,
    ButtonBuilder,
    EmbedBuilder,
} = require('discord.js');

exports.run = async (client, interaction, options) => {
    const suggestionStatuses = [
        "🔴 Denied",
        "🟡 In Progress",
        "🟢 Implemented",
    ];

    suggestionEmbed.fields.push({
        name: "Status",
        value: `\`\`\`\n${suggestionStatus}\`\`\``,
        inline: false,
    });

    await suggestionMessage.edit({ embeds: suggestionEmbed });

}