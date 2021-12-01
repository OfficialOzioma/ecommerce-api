import Category from 'App/Models/Category';
import BaseRepository from './Base/BaseRepository';

export default class CategoryRepo extends BaseRepository {
  // create an instance of the BaseRepository class
  // protected Repository = new BaseRepository(Category);

  constructor() {
    super(Category);
  }

  public async saveCategory(data) {
    return super.createModel(data);
  }

  public async updateCategory(id, data) {
    return super.updateModel(id, data);
  }

  public async deleteCategory(id) {
    return super.deleteById(id);
  }
}
