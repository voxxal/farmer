import { Command, CmdArgs } from ".";
import { Message } from "discord.js";
import { shop } from "../data/shop";
import { Embed } from "../modules/embed";
import { Crop } from "../data/Crop";
import { sql } from "../modules/sql";
import { Player } from "../data/Player";

export class CommandBuy implements Command {
  aliases = ["buy", "b"];
  cmdDocs = {
    description: "Buy something from the shop",
    args: ["crop | upgrade"],
  };
  async execute(cmdArgs: CmdArgs): Promise<void | Message> {
    const { msg, args } = cmdArgs;
    const query = args.join(" ");
    const product = shop.find((product) => {
      return product.name.toLowerCase() === query.toLowerCase();
    });
    if (!product) {
      msg.channel.send(
        new Embed({
          title: "Shop",
          description: `The product \`${query}\` doesn't exist`,
        })
      );
      return;
    }
    sql.retrive(msg.author.id, (playerData: Player) => {
      if (!playerData) {
        msg.channel.send(
          new Embed({
            title: "Shop",
            description:
              "You don't have an account use `~create` to create an account",
          })
        );
        return;
      }
      switch (product.constructor) {
        case Crop:
          if (playerData.money >= product.cost) {
              
          }
          break;
      }
    });
  }
}
