import { Command, CmdArgs } from ".";
import { Message } from "discord.js";
import { shop } from "../data/shop";
import { Embed } from "../modules/embed";
import { Crop } from "../data/Crop";
import { sql } from "../modules/sql";
import { Player } from "../data/Player";
import { Upgrade } from "../data/Upgrade";

export const CommandBuy: Command = {
  aliases: ["buy", "b"],
  cmdDocs: {
    description: "Buy something from the shop",
    args: ["crop | upgrade"],
  },
  async execute(cmdArgs: CmdArgs): Promise<void | Message> {
    const { msg, args } = cmdArgs;
    const query = args.join(" ");
    let product = shop.find((product) => {
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
      // function isCrop(product: Crop | Upgrade): product is Crop {
      //   return (product as Crop).plant !== undefined;
      // }
      switch (true) {
        case "plant" in product: // figure this thing out, as it is no longer an instance of Crop
          product = product as Crop;
          if (!(playerData.money >= product.cost)) {
            msg.channel.send(
              new Embed({
                title: "Shop",
                description: `You need \`${
                  product.cost - playerData.money
                }\` more coins`,
              })
            );
            return;
          }
          playerData.money -= product.cost;
          playerData.crops.unshift(product.id);
          msg.channel.send(
            new Embed({
              title: "Shop",
              description: `
              ${msg.author.toString()}, has bought ${product.name}
              You now have \`${playerData.money}\` coins
              `,
            })
          );
          break;
      }
      sql.update(msg.author.id, playerData);
    });
  },
};
