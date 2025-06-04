// productController.ts
import { Request, Response } from 'express';
import Product, { IProduct } from './Product';

// @desc   Obtener todos los productos
// @route  GET /api/products
// @access Pública
export const getProducts = async (req: Request, res: Response): Promise<void> => {
  try {
    const products: IProduct[] = await Product.find();
    res.json(products);
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener la lista de productos' });
  }
};

// @desc   Obtener producto por ID
// @route  GET /api/products/:id
// @access Pública
export const getProductById = async (req: Request, res: Response): Promise<void> => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Producto no encontrado' });
    }
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener el producto' });
  }
};

// @desc   Crear un nuevo producto
// @route  POST /api/products
// @access Pública (en práctica: admin)
export const createProduct = async (req: Request, res: Response): Promise<void> => {
  const { name, description, price, category, imageUrl } = req.body;
  try {
    const product = new Product({
      name,
      description,
      price,
      category,
      imageUrl,
    });
    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ message: 'Error al crear el producto' });
  }
};

// @desc   Actualizar un producto
// @route  PUT /api/products/:id
// @access Pública (en práctica: admin)
export const updateProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      product.name = req.body.name || product.name;
      product.description = req.body.description || product.description;
      product.price = req.body.price || product.price;
      product.category = req.body.category || product.category;
      product.imageUrl = req.body.imageUrl || product.imageUrl;

      const updatedProduct = await product.save();
      res.json(updatedProduct);
    } else {
      res.status(404).json({ message: 'Producto no encontrado' });
    }
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ message: 'Error al actualizar el producto' });
  }
};

// @desc   Eliminar un producto
// @route  DELETE /api/products/:id
// @access Pública (en práctica: admin)
export const deleteProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      await product.remove();
      res.json({ message: 'Producto eliminado' });
    } else {
      res.status(404).json({ message: 'Producto no encontrado' });
    }
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ message: 'Error al eliminar el producto' });
  }
};