import { Command, CmdArgs } from ".";
import { Message } from "discord.js";
import { pool } from "../modules/sql";
import { Player } from "../data/Player";
import { Embed } from "../modules/embed";

export const CommandCreate: Command = {
  aliases: ["create"],
  cmdDocs: {
    description: "Creates account",
  },
  async execute(cmdArgs: CmdArgs): Promise<void | Message> {
    const { msg } = cmdArgs;
    let queryResult: number;
    const queryConfig = {
      text: "INSERT INTO data(id, data) VALUES($1, $2);",
      values: [msg.author.id, JSON.stringify(new Player())],
    };
    pool
      .query("SELECT data FROM data WHERE ID =$1;", [msg.author.id])
      .then((res) => {
        queryResult = res.rowCount;
        if (queryResult == 1) {
          msg.channel.send(
            Embed.error("Create Account", "You already have an account")
          );
          return;
        }
        pool.query(queryConfig, (err) => {
          if (err) {
            return console.error(err);
          }
          msg.channel.send(
            new Embed({
              title: "Create Account",
              description: "Account created!",
              color: "#00ff00",
            })
          );
        });
      });
  }
}
