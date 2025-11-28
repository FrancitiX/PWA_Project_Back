const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const NotificationSubscriptionModel = new Schema(
  {
    user: {
      type: String,
      ref: "user",
      required: true,
    },
    endpoint: { type: String, required: true },
    keys: {
      p256dh: { type: String, required: true },
      auth: { type: String, required: true },
    },
    date: {
      date: String,
      time: String,
    },
  },
  { collection: "notificationSubscriptions" }
);

NotificationSubscriptionModel.pre("save", function (next) {
  const dateMexico = new Date().toLocaleString("es-MX", {
    timeZone: "America/Mexico_City",
  });

  const [datePart, timePart] = dateMexico.split(", ");

  this.date = { date: datePart, time: timePart };
  next();
});

mongoose.model("notificationSubscription", NotificationSubscriptionModel);
