import express from "express";
import cors from "cors";

// SDK de Mercado Pago
import { MercadoPagoConfig, Preference } from "mercadopago";
// Agrega credenciales
const client = new MercadoPagoConfig({
  accessToken:
    "APP_USR-774859226326607-030417-7f112d2627d2008428103a1f2dee6592-1710704753",
});
// que inicialice
const app = express();
const port = process.env.PORT || 3000;
// le pide a app que use cords y la capacidad de entender formarto json
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Soy el server :)");
});

app.post("/create_preference", async (req, res) => {
  try {
    const body = {
      items: [
        {
          title: req.body.title,
          quantity: Number(req.body.quantity),
          unit_price: Number(req.body.price),
        },
      ],
      back_urls: {
        success: "https://www.linkedin.com/in/rodrip-dev/",
        failure: "https://www.linkedin.com/in/rodrip-dev/",
        pending: "https://www.linkedin.com/in/rodrip-dev/",
      },
      auto_return: "approved",
    };
    // inicializa una nueva preferencia usando client
    const preference = new Preference(client);
    const result = await preference.create({ body });
    res.json({ id: result.id });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Error al crear la preferencia :(",
    });
  }
});

app.listen(port, () => {
  console.log(`El servidor esta corriendo en el puerto ${port}`);
});
