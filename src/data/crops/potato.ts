import { basicPlant } from "../../modules/crops/basic";
import { Crop } from "../Crop";

export const CropPotato: Crop = {
  id: "potato",
  name: "Potato",
  description: "Irish people love this stuff.",
  cost: 0,
  cooldown: 5000,
  plant({ playerData, crop, cmdArgs }) {
    basicPlant({ playerData, crop, cmdArgs }, 5);
  },
  color: "#b79268",
};
