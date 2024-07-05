// IMPORTANT: Only add the partnerships_channel once that channel actually contains a server with a venting channel.
// That field is just used to provide the details for the "we will not add a venting channel" notice to the
// suggestion workflow, so it should not direct users to the channel if none of the servers there have a venting channel.

module.exports = {
    "959551566388547676": { // TransPlace
        "suggestion_channel": "977280417877090424",
        "suggestion_ban_role": "994776459086401576",
        "partnerships_channel": "987881457852776528"
    },
    "1087014898199969873": { // EnbyPlace
        "suggestion_channel": "1258486010996592701",
        "suggestion_ban_role": "1258486058425913345"
    }
}