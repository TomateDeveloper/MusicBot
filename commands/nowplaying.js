const createBar = require("string-progressbar");
const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "np",
  description: "Muestra la canción que se reproduce actualmente",
  execute(message) {
    const queue = message.client.queue.get(message.guild.id);
    if (!queue) return message.reply("No se está reproduciendo ninguna pista.").catch(console.error);
    const song = queue.songs[0];
    const seek = (queue.connection.dispatcher.streamTime - queue.connection.dispatcher.pausedTime) / 1000;
    const left = song.duration - seek;

    let nowPlaying = new MessageEmbed()
      .setTitle("Reproduciendo ahroa")
      .setDescription(`${song.title}\n${song.url}`)
      .setColor("#F8AA2A")
      .setAuthor("Neptune Music")
      .addField(
        "\u200b",
        new Date(seek * 1000).toISOString().substr(11, 8) +
          "[" +
          createBar(song.duration == 0 ? seek : song.duration, seek, 20)[0] +
          "]" +
          (song.duration == 0 ? " ◉ EN DIRECTO" : new Date(song.duration * 1000).toISOString().substr(11, 8)),
        false
      );

    if (song.duration > 0)
      nowPlaying.setFooter("Tiempo restante: " + new Date(left * 1000).toISOString().substr(11, 8));

    return message.channel.send(nowPlaying);
  }
};
