const Discord = require('discord.js')
const client = new Discord.Client();
const config = require('./config.json')
const fs = require('fs');

client.on('ready', () => {
    var ascii = `

    dP                                                             dP                
    88                                                             88                
    88d888b. dP    dP 88d888b. .d8888b. 88d888b. .d8888b. .d8888b. 88d888b. 88d888b. 
    88'  \`88 88    88 88'  \`88 88ooood8 88'  \`88 Y8ooooo. 88'  \`88 88'  \`88 88'  \`88 
    \88    88 88.  .88 88       88.  ... 88    88       88 88.  .88 88    88 88    88 
    dP    dP \`88888P' dP       \`88888P' dP    dP \`88888P' \`88888P' dP    dP dP    dP 

    `
    console.log(ascii)
    client.user.setActivity("hurensohn")
})

client.on("message", async message => {
    if(message.author.bot) return;
    if(message.content.indexOf(config.prefix) !== 0) return;
    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    if(command == "grab") {
        var data;
        fs.readFile('data.txt', 'utf8', function (err,rawData) {
          if (err) {
            return console.log(err);
          }
          data = rawData.split('\n');
        });
        
        function randomInt (low, high) {
            return Math.floor(Math.random() * (high - low) + low);
        }
        
        function getRandomLine(){
          return data[randomInt(0,data.length)];
        }
        message.channel.send({embed: {
          color: 545995,
          title: "check dms",
          footer: {
            text: "if you didnt recieve a dm from the bot enable your dms"
          }
        }})
        message.author.send({embed: {
            color: 545995,
            title: "reading...",
            description: 'made by auth'
        }}).then((msg ) =>{
            let embed = new Discord.MessageEmbed()
            .setTitle(getRandomLine())
            .setDescription("auth")
            .setColor(545995)
            msg.edit(embed)
            setTimeout(function () {
                msg.delete()
                console.log("Succesfully deleted the message in " + message.author.tag + " || user id: " + message.author.id + " || msg id: " + message.id)
              }, 20000)
        })

    }

})

client.login(config.token)
