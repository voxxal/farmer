import { Message } from "discord.js";
import { CommandBuy } from "./buy";
import { CommandCreate } from "./create";
import { CommandHelp } from "./help";
import { CommandPlant } from "./plant";
import { CommandShop } from "./shop";
import { CommandTime } from "./time";

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
  CommandHelp,
  CommandCreate,
  CommandPlant,
  CommandBuy,
  CommandShop,
  CommandTime,
];
