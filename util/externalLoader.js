const fs = require("fs");
const { apistart } = require('./api.js')

module.exports = {

    async externalLoader(client, Hyperz, config, con) {
        apistart(client);
    }
}
