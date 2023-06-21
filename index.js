const { Client, Collection } = require("discord.js"),
      fs = require("fs"),
      Gamedig = require("gamedig");
require("dotenv").config();

class App extends Client {
    constructor() {
        super();

        this.commands = new Collection();
        for (const i of fs.readdirSync("./handlers")) {
            require("./handlers/" + i)(this);
        }
        

        this.login(process.env?.TOKEN).then(() => {
            console.log(`Połączono jako ${this.user.tag}`);
            
            setInterval(() => {
                Gamedig.query({ socketTimeout: 2000, attemptTimeout: 10000, type: "mtasa", host: "51.83.182.33", port: "20336" }).then((state) => {
                    this.user.setActivity(`NotMTA Bojowka | ${state.raw.numplayers}/45`, { type: "PLAYING" })
                });
            }, 30000)
        })
    }
}

new App();