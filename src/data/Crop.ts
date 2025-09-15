import { CmdArgs } from "../commands";
import { Player } from "./Player";

export interface plantArgs {
  playerData: Player;
  crop: Crop;
  cmdArgs: CmdArgs;
}
export interface Crop {
  id: string;
  name: string;
  description:string;
  unlock?:string;
  cost?: number;
  plant: ({ playerData, crop, cmdArgs }: plantArgs) => void;
  cooldown: number;
  color: string;
}
