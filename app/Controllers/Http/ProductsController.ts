import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import { schema } from '@ioc:Adonis/Core/Validator';
import ProductRepo from 'App/Repository/ProductRepo';

export default class ProductsController extends ProductRepo {
  // eslint-disable-next-line prettier/prettier
  public async index({ }: HttpContextContract) {
    const products = this.findAll();
    return products;
  }

  public async show({ params }: HttpContextContract) {
    const product = await this.findById(params.id);
    if (product) {
      if (product) {
        await product.load('user');
        await product.load('category');
        await product.load('subCategory');
        return product;
      }
    } else {
      return { Message: 'Sorry, Product not found' };
    }
  }

  public async store({ request, auth }: HttpContextContract) {
    const category = await this.findByName('categories', request.input('category'));
    const subCategory = await this.findByName('sub_categories', request.input('subcategory'));

    if (category && subCategory) {
      const newProductSchema = schema.create({
        title: schema.string({ trim: true }),
        address: schema.string(),
        calendar_days: schema.string(),
        description: schema.string(),
        price: schema.number(),
      });
      const payload = await request.validate({ schema: newProductSchema });

      // const product = new Product();

      const user = await auth.authenticate();

      const data = {
        title: payload.title,
        userId: user.id,
        categoryId: category.id,
        subCategoryId: subCategory.id,
        address: payload.address,
        description: payload.description,
        calendar_days: payload.calendar_days,
        price: payload.price,
      };
      const newProduct = await this.saveProduct(data);
      // await product.save();
      return { message: `Product created succussfully`, productCreated: newProduct };
    } else {
      return {
        Message: `sorry the Category or subscategory doesn't exist, cannot create product`,
      };
    }
  }

  public async update({ auth, request, params }: HttpContextContract) {
    // const product = await Product.find(params.id);
    const category = await this.findByName('categories', request.input('category'));
    const subCategory = await this.findByName('sub_categories', request.input('subcategory'));

    if (category && subCategory) {
      const updateProductSchema = schema.create({
        title: schema.string({ trim: true }),
        address: schema.string(),
        calendar_days: schema.string(),
        description: schema.string(),
        price: schema.number(),
      });

      const payload = await request.validate({ schema: updateProductSchema });

      const user = await auth.authenticate();

      const data = {
        title: payload.title,
        userId: user.id,
        categoryId: category.id,
        subCategoryId: subCategory.id,
        address: payload.address,
        description: payload.description,
        calendar_days: payload.calendar_days,
        price: payload.price,
      };

      return await this.updateProduct(params.id, data);
    } else {
      return {
        error: `Sorry, Category or subCategory doesn't exist`,
      };
    }
  }

  public async destroy({ params }: HttpContextContract) {
    try {
      await this.deleteProduct(params.id);
      return { message: `Product, deleted succussfully` };
    } catch (error) {
      return { error: `Product not found` };
    }
  }
}
