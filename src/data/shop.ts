import { Crop } from "./Crop";
import { Upgrade } from "./Upgrade";
import { upgrades } from "./upgrades";
import { normalCrops } from "./collections/normalCrops";

export const shop: (Crop | Upgrade)[] = [...normalCrops, ...upgrades];
