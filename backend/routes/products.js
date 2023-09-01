const Router = require('express').Router;
const Product = require('../Schema')
const router = Router();



// Get list of products products
router.get('/', async (req, res, next) => {
  let products = await Product.find({})
  return res.json(products);
});

// Get single product
router.get('/:id', async (req, res, next) => {
    const products = await Product.find({});
    let product = products.find(p => p._id.toString() === req.params.id)
    return res.json(product);
});

// Add new product
// Requires logged in user
router.post('', async(req, res, next) => {
  const newProduct = new Product({
    name: req.body.name,
    description: req.body.description,
    price: parseFloat(req.body.price), // store this as 128bit decimal in MongoDB
    image: req.body.image
  })

  await newProduct.save()


  res.status(201).json({ message: 'Product added'});
});

router.patch('/:id', async(req, res, next) => {
  console.log(req.params.id);
  console.log(req.body)
  await Product.updateOne({_id: req.params.id}, {$set : req.body})
  res.json("Updated Successfully")
});

// Delete a product
// Requires logged in user
router.delete('/:id', async(req, res, next) => {
  await Product.deleteOne({_id : req.params.id})
  res.status(200).json({ message: 'Product deleted' });
});

module.exports = router;
