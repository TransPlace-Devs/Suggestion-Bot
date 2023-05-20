const {
    ActionRowBuilder,
    ButtonBuilder,
    EmbedBuilder,
} = require('discord.js');

exports.run = async (client, interaction, options) => {

    function escapeMarkdown(text) {
        var unescaped = text.replace(/\\(\*|_|`|~|\\)/g, '$1'); // unescape any "backslashed" character
        var escaped = unescaped.replace(/(\*|_|`|~|\\)/g, '\\$1'); // escape *, _, `, ~, \
        return escaped;
    }

    function isImgur(url) {
        return /^https:\/\/i\.imgur\.com\//.test(url)
    }

    const title = escapeMarkdown(options[0].components[0].value)
    const reason = escapeMarkdown(options[1].components[0].value)
    const info = escapeMarkdown(options[2].components[0].value)
    const asset = escapeMarkdown(options[3].components[0].value)

    let extra = ""
    let extraImage = ""

    let image = undefined

    if (info.length > 0) extra = `\`\`\`Additional Information:\n${info}\`\`\``

    let replyEmbed = new EmbedBuilder()
        .setTitle(`Successfully Created Suggestion!`)
        .setColor(0x5376e0)


    if (asset.length > 0) {
        extraImage = `\`\`\`Image/Gif Asset:\n${asset}\`\`\``
        replyEmbed.setDescription(`\`\`\`Suggestion:\n${title}\`\`\`\`\`\`Reason:\n${reason}\`\`\`${extra}${extraImage}`)
        if (isImgur(asset)) image = asset
        else {
            replyEmbed.setTitle("Attachment URL Invalid:\n***Must Be a valid imgur URL***")
            replyEmbed.setDescription(`Make sure the image is one of the following: png/jpg/jpeg/apng/gif.\nCheck that the url is formatted like: (https://i.imgur.com/image.png)\n\nIf you have a URL like (https://imgur.com/a/image):\nRight click the image on imgur and click \"Open image in New Tab\" and copy the url it opens it\n\n(It then should look like the https://i.imgur.com/\n\n\`\`\`Suggestion:\n${title}\`\`\`\`\`\`Reason:\n${reason}\`\`\`${extra}${extraImage})`)
            return interaction.reply({
                content: "Failed to send suggestion. (Attached is attempted values.)",
                embeds: [replyEmbed],
                ephemeral: true,
            })
        }

    }


    const suggestionChannel = interaction.guild.channels.cache.get(process.env.SUGGESTION_CHANNEL)

    if (!suggestionChannel) {
        return interaction.reply({
            content: "Unable to find suggestions channel, this should not occur, please notify server staff of this issue.",
            ephemeral: true,
        })
    }

    let suggestionEmbed = new EmbedBuilder()
        .setAuthor({
            name: `${interaction.member.displayName} Suggested:`,
            iconURL: interaction.user.displayAvatarURL({
                forceStatic: false
            })
        })
        .setTitle(`***${title}***`)
        .setDescription(`\`\`\`Reason:\n${reason}\`\`\`${extra}\nTo join the discussion, check out the thread below :arrow_down:`)
        .setColor(0x5376e0)
        .setImage(image)
        .setTimestamp()
        .setFooter({
            text: `/suggest | User ID: ${interaction.user.id}`,
            iconURL: client.user.avatarURL()
        })

    const suggestionMessage = await suggestionChannel.send({
        embeds: [suggestionEmbed]
    })

    let suggestionThreadTitle = `Suggestion - ${title}`.substring(0, 95)

    await suggestionMessage.startThread({
        name: suggestionThreadTitle,
        autoArchiveDuration: 10080,
    })

    // await suggestionMessage.react(interaction.guild.emojis.cache.get(process.env.UPVOTE))
    //     .catch(console.error);

    // await suggestionMessage.react(interaction.guild.emojis.cache.get(process.env.DOWNVOTE))
    //     .catch(console.error);

    await suggestionMessage.react("⬆️")
        .catch(console.error);

    await suggestionMessage.react("⬇️")
        .catch(console.error);

    const suggestionURL = `https://discord.com/channels/${interaction.guild.id}/${suggestionChannel.id}/${suggestionMessage.id}`


    const replyEmbedRow = new ActionRowBuilder()

    replyEmbedRow.addComponents([
        (new ButtonBuilder()
            .setLabel("Jump to Suggestion")
            .setURL(suggestionURL)
            .setStyle(5))
    ])

    return interaction.reply({
        embeds: [replyEmbed],
        components: [replyEmbedRow],
        ephemeral: true,
    })

}