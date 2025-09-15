import { CmdArgs } from "../commands";
import { Player } from "../data/Player";

export const inventory = {
  add({
    item,
    amount,
    playerData,
    cmdArgs,
  }: {
    item: string;
    amount: number;
    playerData: Player;
    cmdArgs: CmdArgs;
  }): void {
    Object.values(playerData).includes(item)
      ? (playerData.inventory[item] += amount)
      : (playerData.inventory[item] = amount);
  },
};
