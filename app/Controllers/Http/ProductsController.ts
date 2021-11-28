import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import { schema } from '@ioc:Adonis/Core/Validator';
import Category from 'App/Models/Category';
import Product from 'App/Models/Product';
import SubCategory from 'App/Models/SubCategory';

export default class ProductsController {
  // eslint-disable-next-line prettier/prettier
  public async index({ }: HttpContextContract) {
    const products = await Product.query()
      .preload('user')
      .preload('category')
      .preload('subCategory');
    return products;
  }

  public async store({ request, auth }: HttpContextContract) {
    const category = await Category.findBy('name', request.input('category'));
    const subCategory = await SubCategory.findBy('name', request.input('subcategory'));

    if (category && subCategory) {
      const newProductSchema = schema.create({
        tile: schema.string({ trim: true }),
        address: schema.string(),
        calendar_days: schema.string(),
        description: schema.string(),
        price: schema.number(),
      });
      const payload = await request.validate({ schema: newProductSchema });

      const product = new Product();

      const user = await auth.authenticate();

      product.tile = payload.tile;
      product.userId = user.id;
      product.categoryId = category.id;
      product.subCategoryId = subCategory.id;
      product.address = payload.address;
      product.description = payload.description;
      product.calendar_days = payload.calendar_days;
      product.price = payload.price;

      await product.save();
      return { message: `Product created succussfully`, productCreated: product };
    } else {
      return {
        Message: `sorry the Category or subscategory doesn't exist, cannot create product`,
      };
    }
  }

  public async show({ params }: HttpContextContract) {
    const product = await Product.find(params.id);
    if (product) {
      if (product) {
        await product.preload('category');
        await product.preload('subCategory');
        return product;
      }
    } else {
      return { Message: 'Sorry, Product not found' };
    }
  }

  public async update({ auth, request, params }: HttpContextContract) {
    const product = await Product.find(params.id);
    const category = await Category.findBy('name', request.input('category'));
    const subCategory = await SubCategory.findBy('name', request.input('subcategory'));

    if (product && category && subCategory) {
      const updateProductSchema = schema.create({
        tile: schema.string({ trim: true }),
        address: schema.string(),
        calendar_days: schema.string(),
        description: schema.string(),
        price: schema.number(),
      });

      const payload = await request.validate({ schema: updateProductSchema });

      const user = await auth.authenticate();

      product.tile = payload.tile;
      product.userId = user.id;
      product.categoryId = category.id;
      product.subCategoryId = subCategory.id;
      product.price = payload.price;

      await product.save();
      return { message: `Product Updated succussfully`, productUpdated: product };
    } else {
      return {
        error: `Sorry, Product or Category or subCategory doesn't exist`,
      };
    }
  }

  public async destroy({ params }: HttpContextContract) {
    const product = await Product.find(params.id);

    if (product) {
      await product.delete();
      return { Message: `Product, deleted succussfully`, productDeleted: product };
    } else {
      return { Message: `Sorry, Product does not exist, cannot be deleted` };
    }
  }
}
