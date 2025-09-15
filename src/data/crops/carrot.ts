import { timePlant } from "../../modules/crops/time";
import { Crop } from "../Crop";
export const CropCarrot: Crop = {
  id: "carrot",
  name: "Carrot",
  description: "Great Source of Vitamin A! Grows Better at night",
  cost: 1500,
  cooldown: 20000,
  plant({ playerData, crop, cmdArgs }) {
    timePlant({ playerData, crop, cmdArgs }, 120, 180, "Night");
  },
  color: "#ed9121",
};
