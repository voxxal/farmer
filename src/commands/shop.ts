import { Command, CmdArgs } from ".";
import { Message } from "discord.js";
import { config } from "dotenv";
import { Embed } from "../modules/embed";
import { Crop } from "../data/Crop";
import { sql } from "../modules/sql";
import { Player } from "../data/Player";
import { normalCrops } from "../data/collections/normalCrops";
import { specialCrops } from "../data/collections/specialCrops";

config();
// const entry = (
//     strings: TemplateStringsArray,
//     cmd: string,
//     args: string[],
//     description: string
//   ) => {
//     return `\`${process.env.PREFIX}${cmd} ${args.map(
//       (arg) => `<${arg}> `
//     )}\` - ${description}
//     `;
//   };

export const CommandShop: Command = {
  aliases: ["shop", "s"],
  cmdDocs: {
    description: "Open The Shop",
    args: ["crops | upgrades", "page"],
  },
  async execute(cmdArgs: CmdArgs): Promise<void | Message> {
    const { msg, args } = cmdArgs;
    //   msg.channel.send('This is a test message:').then( async message =>{
    //     await message.react('👍');
    //   const filter = (reaction) => {
    //     return (reaction.emoji.name === '👍');
    //   };
    //   const collector = message.createReactionCollector(filter, { time: 15000 });
    //   collector.on('collect', (reaction, user) => {
    //     console.log(`Collected ${reaction.emoji.name} from ${user.tag}`);
    //   });
    //     collector.on('end', collected => {
    //     console.log(`Collected ${collected.size} items`);
    //   });
    // });
    let page: number = isNaN(parseInt(args[1])) ? 1 : parseInt(args[1]);
    let data;
    args[0] = args[0] || "";
    switch (args[0].toLowerCase()) {
      case "crops":
        data = normalCrops;
        break;
      case "upgrades":
        //collection = normalUpgrades;
        break;
      case "special":
        data = specialCrops;
        break;
      default:
        data = [];
        break;
    }
    let dataSet = data.slice((page - 1) * 5, (page - 1) * 5 + 5); //slice diffrently
    // const indexs = collection.slice((page - 1) * 10, (page - 1) * 10 + 5);
    const createEmbed = ({
      page,
      data,
      target,
      playerData,
    }: {
      page: number;
      data: any;
      target: string;
      playerData: Player;
    }) => {
      const embed = new Embed({ title: `Shop - Page ${page}` });

      switch (target.toLowerCase()) {
        case "crops":
          data.forEach((crop: Crop) => {
            embed.addField(
              //include stats of crop
              crop.name,
              `
                *${crop.description}*
                \`${
                  playerData.crops.includes(crop.id)
                    ? "Already Bought"
                    : `Cost: ${crop.cost}`
                }\`
            `
            );
          });
          break;
        case "upgrades":
          break;
        case "special":
          data.forEach((crop: Crop) => {
            embed.addField(
              crop.name,
              `
                *${crop.description}*
                \`${crop.unlock}\`
            `
            );
          });
          break;
        default:
          embed
            .setDescription(
              `
            \`${process.env.PREFIX}shop crops\` - Show all crops
            \`${process.env.PREFIX}shop upgrades\` - Show all upgrades
            \`${process.env.PREFIX}shop special\` - Show all special crops
            `
            )
            .setTitle("Shop Pages");
          break;
      }
      return embed;
    };
    sql.retrive(msg.author.id, (playerData) => {
      msg.channel
        .send(createEmbed({ page, data: dataSet, target: args[0], playerData }))
        .then(async (message) => {
          if (data.length <= 5) return;
          message.react("➡️");
          const collector = message.createReactionCollector(
            (reaction, user) =>
              ["⬅️", "➡️"].includes(reaction.emoji.name) &&
              user.id === msg.author.id,
            { time: 120000 }
          );

          collector.on("collect", (reaction) => {
            console.log(dataSet);
            message.reactions.removeAll().then(async () => {
              reaction.emoji.name === "⬅️" ? (page -= 1) : (page += 1);
              dataSet = data.slice((page - 1) * 5, (page - 1) * 5 + 5);
              message.edit(
                createEmbed({
                  page,
                  data: dataSet,
                  target: args[0],
                  playerData,
                })
              );
              if (page !== 1) message.react("⬅️");
              if (page < data.length / 5) message.react("➡️");
            });
          });
        });
    });
  },
};
