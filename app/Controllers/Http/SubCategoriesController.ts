import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import { schema, rules } from '@ioc:Adonis/Core/Validator';
import SubCategoryRepo from 'App/Repository/SubCategoryRepo';

export default class SubCategoriesController extends SubCategoryRepo {
  // eslint-disable-next-line prettier/prettier
  public async index({ }: HttpContextContract) {
    const subCategory = await this.findAll();

    return subCategory;
  }
  // ffd
  public async show({ params }: HttpContextContract) {
    const subCategory = await this.findById(params.id);
    if (subCategory) {
      await subCategory.load('category');
      return subCategory;
    } else {
      return { Message: 'Sorry, sub category not found' };
    }
  }

  public async store({ request }: HttpContextContract) {
    const category = await this.findByName('categories', request.input('category'));

    if (category) {
      const newSubCategorySchema = schema.create({
        name: schema.string({ trim: true }, [
          rules.unique({ table: 'sub_categories', column: 'name', caseInsensitive: true }),
        ]),
      });

      const payload = await request.validate({
        schema: newSubCategorySchema,
        messages: {
          'name.unique': 'Sub category already exist',
        },
      });

      const data = { categoryId: category.id, name: payload.name };
      const subCategory = await this.saveSubCategory(data);

      return { message: `Sub Category created succussfully`, subCategoryCreated: subCategory };
    } else {
      return { Message: `Sorry, Category does not exist, cannot create sub category` };
    }
  }

  public async update({ request, params }: HttpContextContract) {
    const category = await this.findByName('categories', request.input('category'));
    if (category) {
      const newCategorySchema = schema.create({
        name: schema.string({ trim: true }, [
          rules.unique({ table: 'sub_categories', column: 'name', caseInsensitive: true }),
        ]),
      });

      const payload = await request.validate({
        schema: newCategorySchema,
        messages: {
          'name.unique': 'Sub category already exist',
        },
      });

      const data = { categoryId: category.id, name: payload.name };
      return await this.updateSubCategory(params.id, data);
    } else {
      return { Message: `Sorry, Category does not exist, cannot be updated` };
    }
  }

  public async destroy({ params }: HttpContextContract) {
    try {
      await this.deleteById(params.id);
      return { message: `Sub Category, deleted succussfully` };
    } catch (error) {
      return { error: `Sub Category, not found` };
    }
  }
}
