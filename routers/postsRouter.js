const express = require("express");
const Joi = require('joi');
const router = express.Router();

let posts = [
  { id: "1", topic: "test1", text: "test text1" },
  { id: "2", topic: "test2", text: "test text2" },
  { id: "3", topic: "test3", text: "test text3" },
];

router.get("/", (req, res) => {
  res.json({ posts, status: "success" });
});

router.get("/:id", (req, res) => {
    const { id } = req.params;
    const [post] = posts.filter((item) => item.id === id);
    if (!post) {
       return res.status(400).json({status: `failure, no posts with id '${id}' found!`})
    }
  res.json({ post, status: "success" });
});

router.post("/", (req, res) => {
    const schema = Joi.object({
         topic: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
            .required(),
         text: Joi.string()
        .alphanum()
        .min(10)
        .max(400)
        .required(),
    })

    const validationResult = schema.validate(req.body);
    if (validationResult.error) {
        return res.status(400).json({status: validationResult.error.details})
    }

    const { topic, text } = req.body;

  posts.push({
    id: new Date().getTime().toString(),
    topic,
    text,
  });

  res.json({ status: "success" });
});

router.put("/:id", (req, res) => {
        const schema = Joi.object({
         topic: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
            .required(),
         text: Joi.string()
        .alphanum()
        .min(10)
        .max(400)
        .required(),
    })

    const validationResult = schema.validate(req.body);
    if (validationResult.error) {
        return res.status(400).json({status: validationResult.error.details})
    }
    const { topic, text } = req.body;

    posts.forEach(post => {
        if (post.id === req.params.id) {
            post.topic = topic;
            post.text = text;
        }
    });

    res.json({ status: "success" });
});

router.patch('/:id', (req, res) => {
        const schema = Joi.object({
         topic: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
            .optional(),
         text: Joi.string()
        .alphanum()
        .min(10)
        .max(400)
        .optional(),
    })

    const validationResult = schema.validate(req.body);
    if (validationResult.error) {
        return res.status(400).json({status: validationResult.error.details})
    }
    const {
        topic,
        text
    } = req.body;

    post.forEach(post => {
        if (post.id === req.params.id) {
            if (topic) {
                post.topic = topic;
            }
            if (text) {
                post.text = text;
            }
        }
    
    });
    res.json({ status: 'success' });
});

router.delete("/:id", (req, res) => {
    posts = posts.filter((item) => item.id !== req.params.id)
    res.json({ status: "success" });
});

module.exports = { postsRouter: router };
