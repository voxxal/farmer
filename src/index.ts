import { Client, Message, Guild } from "discord.js";
import { commands } from "./commands/index";
import { config } from "dotenv";
const client = new Client();
config();
client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
  client.user.setActivity(`for ${process.env.PREFIX}help`, {
    type: "WATCHING",
  });
});
client.on("message", async (msg) => {
  if (msg.author.bot) return;
  if (msg.author.id == client.user?.id) return;
  if (!msg.content.startsWith(process.env.PREFIX)) return;
  const [cmd, ...args] = msg.content
    .slice(process.env.PREFIX.length)
    .replace(/ +/g, " ")
    .split(" ");
  const commandClass = commands.find((command) => {
    return command.aliases.some((c) => c.toLowerCase() === cmd.toLowerCase());
  });
  if (!commandClass) return;
  await commandClass
    .execute({
      msg: msg as Message & { guild: Guild },
      cmd,
      args: args,
    })
    .catch((e) => {
      console.log(e);
      msg.channel.send(e);
    });
});
client.login(process.env.DISCORD_TOKEN);
