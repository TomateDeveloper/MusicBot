const { canModifyQueue } = require("../util/EvobotUtil");

module.exports = {
  name: "remove",
  description: "Elimina una canción de la cola",
  execute(message, args) {
    const queue = message.client.queue.get(message.guild.id);
    if (!queue) return message.channel.send("No hay fila de reproducción.").catch(console.error);
    if (!canModifyQueue(message.member)) return;
    
    if (!args.length) return message.reply(`Usage: ${message.client.prefix}remove <Queue Number>`);
    if (isNaN(args[0])) return message.reply(`Usage: ${message.client.prefix}remove <Queue Number>`);

    const song = queue.songs.splice(args[0] - 1, 1);
    queue.textChannel.send(`${message.author} ❌ eliminó **${song[0].title}** de la cola.`);
  }
};
