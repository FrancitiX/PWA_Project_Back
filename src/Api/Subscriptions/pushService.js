const webpush = require("web-push");
require("dotenv").config();
const keys = require("../../../keys.json");

webpush.setVapidDetails(
  "mailto:tu_correo@gmail.com",
  keys.publicKey,
  keys.privateKey
);

async function sendPushToUser(subscription, message) {
  try {
    await webpush.sendNotification(subscription, JSON.stringify(message));
    console.log("Notificación enviada");
  } catch (error) {
    console.error("ERROR AL ENVIAR PUSH:", error);
  }
}

module.exports = { sendPushToUser };
