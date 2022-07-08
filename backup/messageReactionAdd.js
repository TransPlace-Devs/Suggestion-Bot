// const {
//     ActionRowBuilder,
//     ButtonBuilder,
//     EmbedBuilder
// } = require('discord.js');

// function reactionImage(reaction, attachment) {
//     const imageLink = attachment.split(".");
//     const typeOfImage = imageLink[imageLink.length - 1];
//     const image = /(jpg|jpeg|png|gif)/gi.test(typeOfImage);
//     if (!image) return "";
//     return attachment;
// };

// module.exports = async (client, reaction, user) => {

//     if (reaction.partial) {
//         try {
//             await reaction.fetch();
//         } catch (error) {
//             console.error('Something went wrong when fetching the message:', error);
//             return;
//         }
//     }

//     if (reaction.message.author.bot) return;

//     if (reaction.emoji.id === process.env.starboard_emoji) {

//         if (reaction.count >= process.env.starboardThreshold) {

//             const starboardChannel = reaction.message.guild.channels.cache.get(process.env.starboard_channel)

//             const fetchedMessages = await starboardChannel.messages.fetch({
//                 limit: 100
//             });

//             const stars = fetchedMessages.find(m => m.embeds[0].footer.text.startsWith("⭐") && m.embeds[0].footer.text.endsWith(reaction.message.id));
//             if (stars) {
//                 const star = /^\⭐\s([0-9]{1,3})\s\|\s([0-9]{17,20})/.exec(stars.embeds[0].footer.text);
//                 const foundStar = stars.embeds[0];
//                 const image = message.attachments.size > 0 ? await this.extension(reaction, message.attachments.array()[0].url) : "";
//                 const embed = new MessageEmbed()
//                     .setColor(foundStar.color)
//                     .setDescription(foundStar.description)
//                     .setAuthor(message.author.tag, message.author.displayAvatarURL)
//                     .setTimestamp()
//                     .setFooter(`⭐ ${parseInt(star[1])-1} | ${message.id}`)
//                     .setImage(image);
//                 const starMsg = await starChannel.messages.fetch(stars.id);
//                 await starMsg.edit({
//                     embeds: [embed]
//                 });
//                 if (parseInt(star[1]) - 1 == 0) return setTimeout(() => starMsg.delete(), 1000);
//             } else {
//                 const logEmbed = new EmbedBuilder()
//                     .setAuthor({
//                         name: user.nickname ? user.nickname : user.username,
//                         iconURL: user.avatarURL({
//                             forceStatic: false
//                         })
//                     })
//                     .setTitle(`<:starboard:992493515714068480> ${reaction.count}`)
//                     .setTimestamp()
//                     .setFooter({
//                         text: client.user.username + "#" + client.user.discriminator,
//                         iconURL: client.user.avatarURL()
//                     })


//                 return starboardChannel.send({
//                     embeds: [logEmbed],
//                     components: [
//                         new ActionRowBuilder().addComponents(
//                             new ButtonBuilder({})
//                             .setURL(`https://discord.com/channels/${reaction.message.guild.id}/${reaction.message.channel.id}/${reaction.message.id}`)
//                             .setLabel("View Message")
//                             .setStyle(5),
//                         )
//                     ]
//                 })

//             }


//             // Create a starboard message for reaction.message.author's message reaction.message.content and react with the starboard emoji.

//         }


//     }

// };