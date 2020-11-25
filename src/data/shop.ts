import { Crop } from "./Crop";
import { crops } from "./crops";
import { Upgrade } from "./Upgrade";
import { upgrades } from "./upgrades";

export const shop : (Crop | Upgrade)[] = [
    ...crops,
    ...upgrades
]