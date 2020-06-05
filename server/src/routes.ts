import { Router } from "express";
import { celebrate, Joi } from "celebrate";
import multer from "multer";
import multerConfig from "./config/multer";

import Point from "./controllers/Points";
import Item from "./controllers/Items";

const routes = Router();
const upload = multer(multerConfig);

const point = new Point();
const item = new Item();

routes.get("/items", item.index);
routes.get("/points", point.index);
routes.get("/points/:id", point.show);

routes.post(
  "/points",
  upload.single("image"),
  celebrate(
    {
      body: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        whatsapp: Joi.number().required(),
        latitude: Joi.number().required(),
        longitude: Joi.number().required(),
        city: Joi.string().required(),
        uf: Joi.string().required().max(2),
        items: Joi.string().required(),
      }),
    },
    {
      abortEarly: false,
    }
  ),
  point.create
);

export default routes;
