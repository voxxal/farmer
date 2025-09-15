import { basicPlant } from "../../modules/crops/basic";
import { Crop } from "../Crop";

export const CropOnion: Crop = {
  id: "onion",
  name: "Onion",
  description: "Makes you cry, ~~also great for use on the dark web~~.",
  cost: 10000,
  cooldown: 5000,
  plant({ playerData, crop, cmdArgs }) {
    basicPlant({ playerData, crop, cmdArgs }, 100);
  },
  color: "#34a62f",
};
