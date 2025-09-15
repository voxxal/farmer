import { MessageEmbed, MessageEmbedOptions } from "discord.js";

export class Embed extends MessageEmbed {
  static error(title: string, description?: string): Embed {
    return new Embed({
      title: title,
      description: description,
      color: "#ff0000",
    });
  }
  constructor(options?: MessageEmbed | MessageEmbedOptions) {
    super(options);
    this.attachFiles(["./assets/Carrot.png"]);
    this.setAuthor("Cropmaster", "attachment://Carrot.png");
  }
}
