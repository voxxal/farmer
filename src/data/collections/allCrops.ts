import { Crop } from "../Crop";
import { normalCrops } from "./normalCrops";
import { specialCrops } from "./specialCrops";

export const crops: Crop[] = [...normalCrops, ...specialCrops];
