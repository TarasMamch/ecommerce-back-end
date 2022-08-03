const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  try {
    const data = await Tag.findAll({
      include: [Product]
    })
    res.json(data)
  } catch (err) {
    res.status(500).json(err)
  }
});

router.get('/:id', async (req, res) => {
  try {
    const data = await Tag.findByPk(req.params.id, {
      include: [Product]
    })
    return res.status(200).json(data)
  } catch (err) {
    res.status(500).json(err)
  }
});

router.post('/', async (req, res) => {
  try {
    const data = await Tag.create({
      tag_name: req.body.tag_name
    })
    res.json(data)
  } catch (err) {
    res.status(500).json(err)
  }
});

router.put('/:id', async (req, res) => {
  try {
    const data = await Tag.findByPk(req.params.id)
    data.set({
      tag_name: req.body.tag_name
    })
    await data.save()
    return res.json(data)
  } catch (err) {
    res.status(500).json(err)
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const data = await Tag.findByPk(req.params.id)
    data.destroy()
    return res.status(200).json({})
  } catch (err) {
    res.status(500).json(err)
  }
});

module.exports = router;
