const {
    EmbedBuilder
} = require('discord.js');

// Get Embed as param
// Parse embed description
// Turn embed image into thumbnail
// Change author avatar and username to
//    respective display version
// |__ Able to do so with avatar url
// |_____ https://cdn.discordapp.com/avatars/629300846500380676/c9d4ebb493a548a0f03ab22c1948cf6e.webp -> 629300846500380676

async function avatarURLToMember(guild, url) {
    id = url.split('/')[4];

    return await guild.members.fetch(id);
}

function descriptionToFields(description) {
    const reasonRegex = /```Reason:\n([^`]*)```/gm;
    const infoRegex = /```Additional Information:\n([^`]*)/gm;

    const reason = reasonRegex.exec(description);
    const info = infoRegex.exec(description);

    return {
        reason: reason?.at(1),
        info: info?.at(1)
    };
}

exports.parseOldEmbed = async (guild, embed) => {
    const parsedEmbed = new EmbedBuilder(embed);

    const member = await avatarURLToMember(guild, parsedEmbed.data.author.icon_url);

    parsedEmbed.setAuthor({
        name: `${member.displayName} Suggested:`,
        iconURL: member.displayAvatarURL({
            forceStatic: false
        })
    });


    let { reason, info } = descriptionToFields(parsedEmbed.data.description);

    if (info?.length > 0) {

        parsedEmbed.addFields(
            { name: "Reason:", value: `\`\`\`${reason}\`\`\`` },
            { name: "Additional Information:", value: `\`\`\`${info}\`\`\`` },
            { name: "Join the Discussion!", value: "check out the thread below :arrow_down:" }
        );

    } else {

        parsedEmbed.addFields(
            { name: "Reason:", value: `\`\`\`${reason}\`\`\`` },
            { name: "Join the Discussion!", value: "check out the thread below :arrow_down:" }
        );

    }

    parsedEmbed.setDescription(null);

    if (embed.data.image) {
        embedImage = embed.data.image.url;

        parsedEmbed
            .setImage()
            .setThumbnail(embedImage);
    }

    return parsedEmbed;
};