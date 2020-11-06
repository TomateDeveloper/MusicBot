const fs = require("fs");
let config;

try {
  config = require("../config.json");
} catch (error) {
  config = null;
}

module.exports = {
  name: "pruning",
  description: "Actualiza el estado de la limpieza de mensajes del bot",
  execute(message) {
    if (!config) return;
    config.PRUNING = !config.PRUNING;

    fs.writeFile("./config.json", JSON.stringify(config, null, 2), (err) => {
      if (err) {
        console.log(err);
        return message.channel.send("Hubo un error al actualizar la configuración.").catch(console.error);
      }

      return message.channel
        .send(`La configuración de limpiza automática está ${config.PRUNING ? "**activada**" : "**desactivada**"}`)
        .catch(console.error);
    });
  }
};
