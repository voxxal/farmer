import { Command, CmdArgs } from ".";
import { Message } from "discord.js";
import { pool, sql } from "../modules/sql";
import { Embed } from "../modules/embed";
import { Player } from "../data/Player";
import { crops } from "../data/collections/allCrops";
import { Crop } from "../data/Crop";
// import * as ADNotations from "@antimatter-dimensions/notations";
// const standard = new ADNotations.StandardNotation();

export const CommandPlant: Command = {
  aliases: ["plant", "p"],
  cmdDocs: {
    description: "Plant a crop",
    args: ["crop"],
  },
  async execute(cmdArgs: CmdArgs): Promise<void | Message> {
    const { msg, args } = cmdArgs;
    const cropName = args[0];
    let crop: Crop;
    let playerData: Player;
//update this to sql api
    pool
      .query("SELECT data FROM data WHERE ID =$1;", [msg.author.id])
      .then((res) => {
        playerData = res.rows[0].data;
        if (!playerData) {
          msg.channel.send(
            new Embed({
              title: "Plant Crops",
              description:
                `${msg.author.toString()}, You don't have an account use \`~create\` to create an account`,
            })
          );
          return;
        }
        if (!playerData.crops.includes(cropName.toLowerCase())) {
          msg.channel.send(
            new Embed({
              title: "Plant Crops",
              description: `${msg.author.toString()}, You don't own that crop or it doesn't exist!`,
            })
          );
          return;
        }
        crop = crops.find(
          (currPlant) => currPlant.name.toLowerCase() == cropName.toLowerCase()
        );
        if (
          Date.now() - playerData.lastPlant <=
          playerData.farm.cooldown * playerData.farm.cooldownMultiplier
        ) {
          msg.channel.send(
            new Embed({
              title: "Plant Crops",
              description: `${msg.author.toString()}, Your farm is still on cooldown, wait \`${(
                (playerData.farm.cooldown * playerData.farm.cooldownMultiplier -
                  (Date.now() - playerData.lastPlant)) /
                1000
              ).toFixed(2)}\`s`,
            })
          );
          return;
        }
        crop.plant({ playerData, crop, cmdArgs });
        sql.update(msg.author.id, playerData);
      });
  }
}
