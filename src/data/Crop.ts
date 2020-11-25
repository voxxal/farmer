interface CropTemplate {
  id: string;
  name: string;
  cost: number;
  value: number;
  cooldown: number;
  color?: string;
}
export class Crop {
  id: string;
  name: string;
  cost: number;
  value: number;
  cooldown: number;
  color: string;
  constructor({
    id,
    name,
    cost,
    value,
    cooldown,
    color = "#000000",
  }: CropTemplate) {
    this.id = id;
    this.name = name;
    this.cost = cost;
    this.value = value;
    this.cooldown = cooldown;
    this.color = color;
  }
}
