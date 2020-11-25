interface Farm {
  size: number;
  cooldownMultiplier: number;
  cooldown: number;
  current: string | null;
}

export class Player {
  money = 0;
  farm: Farm = {
    size: 1,
    cooldownMultiplier: 1,
    cooldown: 0,
    current: null,
  };
  crops: string[] = ["potato"];
  lastPlant = Date.now();
}
