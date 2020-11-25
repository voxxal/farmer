import { Command, CmdArgs } from ".";
import { Message } from "discord.js";
import { pool, sql } from "../modules/sql";
import { Embed } from "../modules/embed";
import { Player } from "../data/Player";
import { crops } from "../data/crops";
import { Crop } from "../data/Crop";
// import * as ADNotations from "@antimatter-dimensions/notations";
// const standard = new ADNotations.StandardNotation();

export class CommandPlant implements Command {
  aliases = ["plant", "p"];
  cmdDocs = {
    description: "Plant a crop",
    args: ["crop"],
  };
  async execute(cmdArgs: CmdArgs): Promise<void | Message> {
    const { msg, args } = cmdArgs;
    const crop = args[0];
    let cropData: Crop;
    let playerData: Player;

    pool
      .query("SELECT data FROM data WHERE ID =$1;", [msg.author.id])
      .then((res) => {
        playerData = res.rows[0].data;
        if (!playerData) {
          msg.channel.send(
            new Embed({
              title: "Plant Crops",
              description:
                "You don't have an account use `~create` to create an account",
            })
          );
          return;
        }
        if (!playerData.crops.includes(crop)) {
          msg.channel.send(
            new Embed({
              title: "Plant Crops",
              description: "You don't own that crop or it doesn't exist!",
            })
          );
          return;
        }
        cropData = crops.find((currPlant) => (currPlant.id = crop));
        if (
          Date.now() - playerData.lastPlant <=
          playerData.farm.cooldown * playerData.farm.cooldownMultiplier
        ) {
          msg.channel.send(
            new Embed({
              title: "Plant Crops",
              description: `Your farm is still on cooldown, wait \`${(
                (playerData.farm.cooldown * playerData.farm.cooldownMultiplier -
                  (Date.now() - playerData.lastPlant)) /
                1000
              ).toFixed(2)}\`s`,
            })
          );
          return;
        }
        playerData.farm.current = crop;
        playerData.farm.cooldown = cropData.cooldown;
        playerData.lastPlant = Date.now();
        playerData.money += cropData.value;
        msg.channel.send(
          new Embed({
            title: "Plant Crops",
            description: `You have ${playerData.money} coins`,
            color: cropData.color,
          })
        );
        sql.update(msg.author.id, playerData);
      });
  }
}
