import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import { schema } from '@ioc:Adonis/Core/Validator';
import Category from 'App/Models/Category';

export default class CategoriesController {
  public async index({}: HttpContextContract) {
    // const category = await Category.all();
    const category = await Category.query().preload('subCategories');

    return category;
  }

  public async show({ params }: HttpContextContract) {
    const category = await Category.find(params.id);
    if (category) {
      // await category.preload('products');
      // await category.preload('subCategories');
      return category;
    } else {
      return { Message: 'Sorry, Category not found' };
    }
  }

  public async store({ request }: HttpContextContract) {
    const newCategorySchema = schema.create({
      name: schema.string({ trim: true }),
    });

    const payload = await request.validate({ schema: newCategorySchema });

    const category = await Category.create(payload);

    return { message: `Category created succussfully`, CategoryCreated: category };
  }

  public async update({ request, params }: HttpContextContract) {
    const category = await Category.find(params.id);
    if (category) {
      const newCategorySchema = schema.create({
        name: schema.string({ trim: true }),
      });

      const payload = await request.validate({ schema: newCategorySchema });

      category.name = payload.name;

      return category.save();
    } else {
      return { Message: `Sorry, Category does not exist, cannot be updated` };
    }
  }

  public async destroy({ params }: HttpContextContract) {
    const category = await Category.find(params.id);

    if (category) {
      await category.delete();
      return { Message: `Category, deleted succussfully`, CategoryDeleted: category };
    } else {
      return { Message: `Sorry, Category does not exist, cannot be deleted` };
    }
  }
}
