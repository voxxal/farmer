import { Command, CmdArgs } from ".";
import { Message } from "discord.js";
import { Embed } from "../modules/embed";
import { time } from "../modules/time";

export const CommandTime: Command = {
  aliases: ["time", "t"],
  cmdDocs: {
    description: "Shows in-game time",
  },
  async execute(cmdArgs: CmdArgs): Promise<void | Message> {
    const { msg } = cmdArgs;
    msg.channel.send(
      new Embed({
        title: "Time",
        description: `
        ${
          time.timeOfDay() == "Daytime" ? "☀" : "🌙"
        } Current Time of Day: ${time.timeOfDay()}
        Time Until Change: ${time.timeUntilChange()} minutes
        `,
        color: time.timeOfDay() == "Daytime" ? "#FDB813" : "#3686A0",
      })
    );
  },
};
