const { canModifyQueue } = require("../util/EvobotUtil");

module.exports = {
  name: "volume",
  aliases: ["v"],
  description: "Actualiza el volúmen de la canción actual",
  execute(message, args) {
    const queue = message.client.queue.get(message.guild.id);

    if (!queue) return message.reply("No hay ninguna canción reproduciendose actualmente.").catch(console.error);
    if (!canModifyQueue(message.member))
      return message.reply("¡Necesitas ingresar primero a un canal de voz!").catch(console.error);

    if (!args[0]) return message.reply(`🔊 El volúmen actual es: **${queue.volume}%**`).catch(console.error);
    if (isNaN(args[0])) return message.reply("Por favor utiliza un número para establecer el volúmen").catch(console.error);
    if (parseInt(args[0]) > 100 || parseInt(args[0]) < 0)
      return message.reply("Por favor ingresa un número entre 0 y 100.").catch(console.error);

    queue.volume = args[0];
    queue.connection.dispatcher.setVolumeLogarithmic(args[0] / 100);

    return queue.textChannel.send(`Volúmen establecido a: **${args[0]}%**`).catch(console.error);
  }
};
