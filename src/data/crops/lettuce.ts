import { basicPlant } from "../../modules/crops/basic";
import { Crop } from "../Crop";

export const CropLettuce: Crop = {
  id: "lettuce",
  name: "Lettuce",
  description: "Good ol lettuce.",
  cost: 100,
  cooldown: 15000,
  plant({ playerData, crop, cmdArgs }) {
    basicPlant({ playerData, crop, cmdArgs }, 10);
  },
  color: "#34a62f",
};
