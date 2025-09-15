import { plantArgs } from "../../data/Crop";
import { Embed } from "../embed";
import { time, timeOfDay } from "../time";

export const timePlant = (
  { playerData, crop, cmdArgs }: plantArgs,
  value: number,
  valueEffective: number,
  timeOfDay: timeOfDay
): void => {
  playerData.farm.current = crop.id;
  playerData.farm.cooldown = crop.cooldown;
  playerData.lastPlant = Date.now();
  time.timeOfDay() == timeOfDay
    ? (playerData.money += valueEffective)
    : (playerData.money += value);
  cmdArgs.msg.channel.send(
    new Embed({
      title: `Plant ${crop.name}`,
      description: `
      ${cmdArgs.msg.author.toString()} grew their crops and get \`${value}\` coins ${
        time.timeOfDay() == timeOfDay
          ? `\nBecause you grew it during ${timeOfDay.toLowerCase()}, you gain a bonus \`${
              valueEffective - value
            }\` coins \n In total you gained \`${valueEffective}\` coins`
          : ""
      }
      You have \`${playerData.money}\` coins
      `,
      color: crop.color,
    })
  );
};
