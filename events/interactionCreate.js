module.exports = async (client, interaction) => {
    if (interaction.isChatInputCommand()) {
        const command = interaction.commandName;
        const options = interaction.options._hoistedOptions;
        const slash = client.commands.get(command);

        if (!slash) return;
        else slash.run(client, interaction, options);

    } else if (interaction.isMessageContextMenuCommand()) {
        const command = interaction.commandName;
        const context = client.commands.get(command);

        if (!context) return;
        else context.run(client, interaction);

    } else if (interaction.isModalSubmit()) {
        const modalId = interaction.customId;
        const options = interaction.components;
        const modal = client.components.get(modalId);

        if (!modal) return;
        else modal.run(client, interaction, options);

    } else if (interaction.isStringSelectMenu()) {
        const selectMenuId = interaction.customId;
        const selected = interaction.values;
        const selectMenu = client.components.get(selectMenuId);

        if (!selectMenu) return;
        else selectMenu.run(client, interaction, selected);
    } else if (interaction.isButton()) {
        const buttonId = interaction.customId;
        const button = client.components.get(buttonId);

        if (!button) return;
        else button.run(client, interaction, null);
    }
};