const mongoose = require("mongoose");
require("./subscriptionsModel");
const { sendPushToUser } = require("./pushService");

const NotificationSubscription = mongoose.model("notificationSubscription");

const saveSubscription = async (req, res) => {
  try {
    const { endpoint, keys, user } = req.body;

    if (!endpoint || !keys) {
      return res.status(400).json({ error: "Suscripción inválida" });
    }

    const existing = await NotificationSubscription.findOne({ user });

    if (existing) {
      existing.endpoint = endpoint;
      existing.keys = keys;
      await existing.save();

      return res.json({ status: "ok", data: "Suscripción actualizada" });
    }

    await NotificationSubscription.create({
      user,
      endpoint,
      keys,
    });

    res.json({ status: "ok", data: "Suscripción guardada" });
  } catch (error) {
    console.error("Error guardando suscripción:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

const notifyUser = async (req, res) => {
    const { title, message} = req.body
  try {
    const subs = await NotificationSubscription.find();

    for (const s of subs) {
      await sendPushToUser(
        {
          endpoint: s.endpoint,
          keys: s.keys,
        },
        {
          title: title,
          body: message,
        }
      );
    }

    res.json({ status: "ok", data: "Notificaciones enviadas" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error enviando notificaciones" });
  }
};

module.exports = {
  saveSubscription,
  notifyUser
};
