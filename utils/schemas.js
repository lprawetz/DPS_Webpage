const BaseJoi = require("joi");
const sanitizeHtml = require("sanitize-html");

const extension = (joi) => ({
    type: "string",
    base: joi.string(),
    messages: {
        "string.escapeHTML": "{{#label}} must not include HTML!"
    },
    rules: {
        escapeHTML: {
            validate(value, helpers) {
                const clean = sanitizeHtml(value, {
                    allowedTags: [],
                    allowedAttributes: {},
                });
                if (clean !== value) return helpers.error("string.escapeHTML", { value })
                return clean;
            }
        }
    }
});

const Joi = BaseJoi.extend(extension);

module.exports.showSchema = Joi.object({
    show: Joi.object({
        venue: Joi.string().required().escapeHTML(),
        location: Joi.string().required().escapeHTML(),
        date: Joi.date().required().greater('now'),
        ticketstore: Joi.string().required().escapeHTML()
    }).required()
});