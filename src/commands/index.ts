import { Message } from "discord.js";
import { CommandCreate } from "./create";
import { CommandHelp } from "./help";
import { CommandPlant } from "./plant";

export interface CmdArgs {
  msg: Message;
  args: string[];
  cmd: string;
}
export interface Command {
  aliases: string[];
  cmdDocs: {
    description: string;
    args?: string[];
  };
  execute: (args: CmdArgs) => Promise<void | Message>;
}
export const commands: Command[] = [
  new CommandHelp(),
  new CommandCreate(),
  new CommandPlant(),
];
