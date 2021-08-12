const Joi = require("joi");

module.exports.showSchema = Joi.object({
    show: Joi.object({
        venue: Joi.string().required(),
        location: Joi.string().required(),
        date: Joi.date().required().greater('now'),
        ticketstore: Joi.string().required()
    }).required()
})

