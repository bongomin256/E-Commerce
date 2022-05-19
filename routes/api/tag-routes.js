const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

// Getting all the tags
router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const tagData = await Tag.findAll({
      include: [{model: Product, attributes: ['id', 'product_name', 'stock', 'category_id'], as: "tag_of_product"}]
    })
    res.status(200).json(tagData)
  } catch(err) {
    res.status(500).json(err)
  }
});

// Getting a single tag
router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      include: [{model: Product, attributes: ['id', 'product_name', 'stock', 'category_id'], through: ProductTag,  as: "tag_of_product"}]
    })
    if(!tagData) {
      res.status(404).json({message: 'No tag found with that id!'})
      return;
    }

    res.status(200).json(tagData)
  } catch(err) {
    res.status(500).json(err)
  }
});

// Creating a new tag
router.post('/', (req, res) => {
  // create a new tag
  try {
    const tagData = await Tag.create(req.body)
    res.status(200).json(tagData)
  } catch (err) {
    res.status(400).json(err)
  }
});

// Updating a tag
router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
 try { 
   const tagUpdate = await Tag.update({
     where: {id: req.params.id }
   })
   if(!tagUpdateData) {
    res.status(404).json({ message: 'No tag found with this id!'});
    return;
   }
 
   res.status(200).json(tagUpdateData)
  } catch (err) {
   res.status(500).json(err);
 }
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
    try {
      const tagData = await Tag.destroy({
        where: {
          id: req.params.id
        }
      });
  
      if (!tagData) {
        res.status(404).json({ message: 'No tag found with this id!'});
        return;
      }
  
      res.status(200).json(tagData);
    } catch (err) {
      res.status(500).json(err);
    }
});

module.exports = router;
