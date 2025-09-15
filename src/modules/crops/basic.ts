import { plantArgs } from "../../data/Crop";
import { Embed } from "../embed";

export const basicPlant = (
  { playerData, crop, cmdArgs }: plantArgs,
  value: number
): void => {
  playerData.farm.current = crop.id;
  playerData.farm.cooldown = crop.cooldown;
  playerData.lastPlant = Date.now();
  playerData.money += value;
  cmdArgs.msg.channel.send(
    new Embed({
      title: `Plant ${crop.name}`,
      description: `
      ${cmdArgs.msg.author.toString()} grew their crops and get \`${value}\` coins
      You have \`${playerData.money}\` coins
      `,
      color: crop.color,
    })
  );
};
