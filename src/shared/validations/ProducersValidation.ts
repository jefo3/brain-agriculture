import { Joi, Segments } from "celebrate";

import { Crop } from "@prisma/client";

const createProducerSchema = {
  [Segments.BODY]: Joi.object().keys({
    cpfCnpj: Joi.string().required().messages({
      "string.empty": "CPF/CNPJ is required",
    }),
    nameProducer: Joi.string().required().messages({
      "string.empty": "Producer name is required",
    }),
    nameFarm: Joi.string().required().messages({
      "string.empty": "Name farm is required",
    }),
    city: Joi.string().required().messages({
      "string.empty": "City is required",
    }),
    state: Joi.string().required().messages({
      "string.empty": "State is required",
    }),
    totalFarmArea: Joi.number().positive().required().messages({
      "number.positive": "Total farm area must be a positive number",
      "number.required": "Total farm area is required",
    }),
    agriculturalArea: Joi.number().positive().required().messages({
      "number.positive": "Agricultural area must be a positive number",
      "any.required": "Agricultural area is required",
    }),
    vegetationArea: Joi.number().positive().required().messages({
      "number.positive": "Vegetation area must be a positive number",
      "any.required": "Vegetation area is required",
    }),
    plantedCrops: Joi.array()
      .items(
        Joi.string().valid(
          Crop.algodao,
          Crop.cafe,
          Crop.canaDeAcucar,
          Crop.milho,
          Crop.soja,
        ),
      )
      .optional()
      .messages({
        "any.only": "Invalid planted crop",
      }),
  }),
};

const deleteProducerSchema = {
  [Segments.PARAMS]: { id: Joi.string().uuid().required() },
};

const updateProducerSchema = {
  [Segments.PARAMS]: { id: Joi.string().uuid().required() },
};

export { createProducerSchema, deleteProducerSchema, updateProducerSchema };
