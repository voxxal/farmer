import { Player } from "./Player";

interface UpgradeTempalate {
  id: string;
  name: string;
  cost: () => number;
  effect: (playerData: Player) => void;
  level: number;
}
export class Upgrade {
  cost: () => number;
  name: string;
  effect: (playerData: Player) => void;
  level: number;
  id: string;
  constructor({ id, name, cost, effect, level }: UpgradeTempalate) {
    this.id = id;
    this.name = name;
    this.cost = cost;
    this.level = level;
    this.effect = effect;
  }
}
