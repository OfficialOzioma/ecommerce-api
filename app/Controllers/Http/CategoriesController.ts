import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import { schema, rules } from '@ioc:Adonis/Core/Validator';
import CategoryRepo from 'App/Repository/CategoryRepo';

export default class CategoriesController extends CategoryRepo {
  // eslint-disable-next-line prettier/prettier
  public async index({ }: HttpContextContract) {
    const category = this.findAll();
    return category;
  }

  public async show({ params }: HttpContextContract) {
    const category = await this.findById(params.id);

    if (category) {
      await category.load('products');
      await category.load('subCategories');
      return category;
    } else {
      return { Message: 'Sorry, Category not found' };
    }
  }

  public async store({ request }: HttpContextContract) {
    const newCategorySchema = schema.create({
      name: schema.string({ trim: true }, [
        rules.unique({ table: 'categories', column: 'name', caseInsensitive: true }),
      ]),
    });

    const payload = await request.validate({
      schema: newCategorySchema,
      messages: {
        'name.unique': 'category already exist',
      },
    });

    const category = await this.saveCategory(payload);

    return { message: `Category created succussfully`, CategoryCreated: category };
  }

  public async update({ request, params }: HttpContextContract) {
    const updateCategorySchema = schema.create({
      name: schema.string({ trim: true }, [
        rules.unique({ table: 'categories', column: 'name', caseInsensitive: true }),
      ]),
    });

    const payload = await request.validate({
      schema: updateCategorySchema,
      messages: {
        'name.unique': 'category already exist',
      },
    });

    const category = await this.updateCategory(params.id, payload);
    if (category) {
      return { Message: `Category has been updated successfully` };
    } else {
      return { Message: `Sorry, Category does not exist, cannot be updated` };
    }
  }

  public async destroy({ params }: HttpContextContract) {
    try {
      await this.deleteCategory(params.id);
      return { message: `Category, deleted succussfully` };
    } catch (error) {
      return { error: `Category, not found` };
    }
  }
}
