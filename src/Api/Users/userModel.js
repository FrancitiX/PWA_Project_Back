const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserModel = new Schema(
  {
    name: {
      name: String,
      paternal_surname: String,
      maternal_surname: String,
    },
    username: { type: String, unique: true },
    email: { type: String, unique: true },
    cellphone: {
      countryCode: { type: String, default: "+52" },
      number: { type: String, default: "" },
    },
    salt: String,
    password: String,
    role: Number,
    favGames: Array,
    myGames: Array,
    date: { date: String, time: String },
  },
  {
    collection: "users",
  }
);

UserModel.pre("save", function (next) {
  const dateMexico = new Date().toLocaleString("es-MX", {
    timeZone: "America/Mexico_City",
  });
  const [datePart, timePart] = dateMexico.split(", ");
  this.date = { date: datePart, time: timePart };
  next();
});

mongoose.model("user", UserModel);
