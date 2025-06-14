import express from 'express';
import Product from '../../models/Product.js';
import verifyAdmin from '../../middlewares/verifyAdmin.js';
const router = express.Router();

router.post('/set-Product', verifyAdmin, async (req, res) => {
  console.log('/set-Product', req.body);
  
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ message: 'حدث خطأ أثناء إنشاء المنتج', error: err.message });
  }
});


router.get('/get-Products', async (req, res) => {
  console.log('/get-Products');
  
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: 'فشل في جلب المنتجات', error: err.message });
  }
});


router.get('/get-Product/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'المنتج غير موجود' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: 'فشل في جلب المنتج', error: err.message });
  }
});

router.put('/update-Product/:id', verifyAdmin, async (req, res) => {
  console.log('/update-Product/:id', req.body);
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedProduct) return res.status(404).json({ message: 'المنتج غير موجود' });
    res.json(updatedProduct);
  } catch (err) {
    res.status(400).json({ message: 'فشل في تحديث المنتج', error: err.message });
  }
});


router.delete('/delete-Product/:id', verifyAdmin, async (req, res) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'المنتج غير موجود' });
    res.json({ message: 'تم حذف المنتج بنجاح' });
  } catch (err) {
    res.status(500).json({ message: 'فشل في حذف المنتج', error: err.message });
  }
});

export default router;