import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import { schema } from '@ioc:Adonis/Core/Validator';
import Category from 'App/Models/Category';
import SubCategory from 'App/Models/SubCategory';

export default class SubCategoriesController {
  // eslint-disable-next-line prettier/prettier
  public async index({ }: HttpContextContract) {
    // const subCategory = await SubCategory.all();
    const subCategory = await SubCategory.query().preload('category');

    return subCategory;
  }
  // ffd
  public async show({ params }: HttpContextContract) {
    const subCategory = await SubCategory.find(params.id);
    if (subCategory) {
      await subCategory.preload('category');
      return subCategory;
    } else {
      return { Message: 'Sorry, Category not found' };
    }
  }

  public async store({ request }: HttpContextContract) {
    const category = await Category.findBy('name', request.input('category'));

    if (category) {
      const newSubCategorySchema = schema.create({
        name: schema.string({ trim: true }),
      });

      const payload = await request.validate({ schema: newSubCategorySchema });

      const subCategory = new SubCategory();
      subCategory.categoryId = category.id;
      subCategory.name = payload.name;
      subCategory.save();

      return { message: `Sub Category created succussfully`, subCategoryCreated: subCategory };
    } else {
      return { Message: `Sorry, Category does not exist, cannot create sub category` };
    }
  }

  public async update({ request, params }: HttpContextContract) {
    const subcategory = await SubCategory.find(params.id);
    const category = await Category.findBy('name', request.input('category'));
    if (subcategory && category) {
      const newCategorySchema = schema.create({
        name: schema.string({ trim: true }),
      });

      const payload = await request.validate({ schema: newCategorySchema });

      subcategory.categoryId = category.id;
      subcategory.name = payload.name;

      return subcategory.save();
    } else {
      return { Message: `Sorry, Sub Category does not exist, cannot be updated` };
    }
  }

  public async destroy({ params }: HttpContextContract) {
    const subcategory = await SubCategory.find(params.id);

    if (subcategory) {
      await subcategory.delete();
      return { Message: `Sub Category, deleted succussfully`, subCategoryDeleted: subcategory };
    } else {
      return { Message: `Sorry, Sub Category does not exist, cannot be deleted` };
    }
  }
}
