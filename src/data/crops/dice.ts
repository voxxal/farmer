import { Crop } from "../Crop";
import { Embed } from "../../modules/embed";

export const CropDice: Crop = {
  id: "dice",
  name: "Dice",
  description: "Legend has it that a bot died to create one anew",
  unlock: "Become top 3 on Dice, my first bot. (UNOBTAINABLE)",
  cooldown: 60000,
  plant({ playerData, crop, cmdArgs }) {
    const roll = Math.floor((Math.random() / 2) * playerData.money);
    playerData.farm.current = crop.id;
    playerData.farm.cooldown = crop.cooldown;
    playerData.lastPlant = Date.now();
    playerData.money += roll;
    cmdArgs.msg.channel.send(
      new Embed({
        title: "Plant Dice",
        description: `
        ${cmdArgs.msg.author.toString()} rolls the dice. The dice rolled \`${roll}\`
        You have \`${playerData.money}\` coins`,
        color: crop.color,
      })
    );
  },
  color: "#ffffff",
};
