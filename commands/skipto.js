const { canModifyQueue } = require("../util/EvobotUtil");

module.exports = {
  name: "skipto",
  aliases: ["st"],
  description: "Salta la cola hasta cierto número de la fila de reproducción",
  execute(message, args) {
    if (!args.length)
      return message
        .reply(`Usage: ${message.client.prefix}${module.exports.name} <Queue Number>`)
        .catch(console.error);

    if (isNaN(args[0]))
      return message
        .reply(`Usage: ${message.client.prefix}${module.exports.name} <Queue Number>`)
        .catch(console.error);

    const queue = message.client.queue.get(message.guild.id);
    if (!queue) return message.channel.send("No hay ninguna fila de reproducción.").catch(console.error);
    if (!canModifyQueue(message.member)) return;

    if (args[0] > queue.songs.length)
      return message.reply(`¡La cola solo tiene ${queue.songs.length} canciones restantes!`).catch(console.error);

    queue.playing = true;
    if (queue.loop) {
      for (let i = 0; i < args[0] - 2; i++) {
        queue.songs.push(queue.songs.shift());
      }
    } else {
      queue.songs = queue.songs.slice(args[0] - 2);
    }
    queue.connection.dispatcher.end();
    queue.textChannel.send(`${message.author} ⏭ se saltó ${args[0] - 1} canciones`).catch(console.error);
  }
};
