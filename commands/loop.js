const { canModifyQueue } = require("../util/EvobotUtil");

module.exports = {
  name: "loop",
  aliases: ['l'],
  description: "Cambia el estado del loop de música",
  execute(message) {
    const queue = message.client.queue.get(message.guild.id);
    if (!queue) return message.reply("No se está reproduciendo ninguna pista.").catch(console.error);
    if (!canModifyQueue(message.member)) return;

    // toggle from false to true and reverse
    queue.loop = !queue.loop;
    return queue.textChannel
      .send(`El loop se encuentra ${queue.loop ? "**activado**" : "**desactivado**"}`)
      .catch(console.error);
  }
};
