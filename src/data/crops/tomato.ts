import { basicPlant } from "../../modules/crops/basic";
import { Crop } from "../Crop";

export const CropTomato: Crop = {
  id: "tomato",
  name: "Tomato",
  description: "Juicy and delicious.",
  cost: 500,
  cooldown: 15000,
  plant({ playerData, crop, cmdArgs }) {
    basicPlant({ playerData, crop, cmdArgs }, 60);
  },
  color: "#ff6347",
};
