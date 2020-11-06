const { canModifyQueue } = require("../util/EvobotUtil");

module.exports = {
  name: "resume",
  aliases: ["r"],
  description: "Resume la música que se encontraba pausada",
  execute(message) {
    const queue = message.client.queue.get(message.guild.id);
    if (!queue) return message.reply("No se está reproduciendo nada actualmente.").catch(console.error);
    if (!canModifyQueue(message.member)) return;

    if (!queue.playing) {
      queue.playing = true;
      queue.connection.dispatcher.resume();
      return queue.textChannel.send(`¡${message.author} ▶ resumió la música!`).catch(console.error);
    }

    return message.reply("La fila de reproducción no está en pausa.").catch(console.error);
  }
};
