import * as services from "../services";
import { badRequest, internalSeverError } from "../middleware/handle_errors";
const cloudinary = require("cloudinary").v2;
import Joi from "joi";

export const createNewOutfit = async (req, res) => {
  try {
    const fileData = req.file;
    const { error } = Joi.object({
      outfitName: Joi.string().required(),
      topProductName: Joi.string().required(),
      bottomProductName: Joi.string().required(),
      priceOProduct: Joi.number().required(),
      goWhere: Joi.string().required(),
      styleFilter: Joi.string().required(),
      eventFilter: Joi.string().required(),
      imageOProduct: Joi.string(),
      descriptionOProduct: Joi.string().required(),
      // Thêm các trường khác nếu cần
    }).validate(req.body);

    if (error) {
      if (fileData) cloudinary.uploader.destroy(fileData.filename);
      return badRequest(error.details[0].message, res);
    }

    const response = await services.createNewOutfit(req.body, fileData);
    return res.status(200).json(response);
  } catch (error) {
    console.error("Error in createNewOutfit:", error);
    return internalSeverError(res);
  }
};
