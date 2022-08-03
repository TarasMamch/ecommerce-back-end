const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  try {
    const data = await Category.findAll({
      include: [Product]
    })
    res.json(data)
  } catch (err) {
    res.status(500).json({ msg: "ERROR", err })
  }
});

router.get('/:id', async (req, res) => {
  try {
    const data = await Category.findByPk(req.params.id, {
      include: [Product]
    })
    res.status(200).json(data)
  } catch (err) {
    res.status(500).json(err)
  }
});

router.post('/', async (req, res) => {
  try {
    const data = Category.create({
      category_name: req.body.category_name
    })
    res.json(data)
  } catch (err) {
    res.status(500).json({ msg: "ERROR", err })
  }
});

router.put('/:id', async (req, res) => {
  try {
    const data = await Category.findByPk(req.params.id)
    data.set({
      category_name: req.body.category_name
    })
    await data.save()
    return res.json(data)
  } catch (err) {
    res.status(500).json(err)
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const data = await Category.findByPk(req.params.id)
    await data.destroy()
    return res.status(200).json({})
  } catch (err) {
    res.status(500).json(err)
  }
});

module.exports = router;
