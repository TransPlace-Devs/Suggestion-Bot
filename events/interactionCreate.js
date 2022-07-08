module.exports = async (client, interaction) => {
    if (interaction.isChatInputCommand()) {
        const command = interaction.commandName
        const options = interaction.options._hoistedOptions
        const slash = client.slash.get(command)
        if (!slash) return;
        slash.run(client, interaction, options);
    } else if (interaction.type == 5) {
        const modalId = interaction.customId
        const options = interaction.components
        const modal = client.modal.get(modalId)
        if (!modal) return;
        else modal.run(client, interaction, options);
    }
}