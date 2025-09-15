import { timePlant } from "../../modules/crops/time";
import { Crop } from "../Crop";
export const CropWheat: Crop = {
  id: "wheat",
  name: "Wheat",
  description: "Yum! Wheat grows better during the day",
  cost: 3500,
  cooldown: 15000,
  plant({ playerData, crop, cmdArgs }) {
    timePlant({ playerData, crop, cmdArgs }, 140, 220, "Daytime");
  },
  color: "#f8b423",
};
