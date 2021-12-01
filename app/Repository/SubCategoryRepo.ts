import SubCategory from 'App/Models/SubCategory';
import BaseRepository from './Base/BaseRepository';

export default class SubCategoryRepo extends BaseRepository {
  // create an instance of the BaseRepository class
  // protected Repository = new BaseRepository(SubCategory);

  constructor() {
    super(SubCategory);
  }

  public async saveSubCategory(data) {
    return super.createModel(data);
  }

  public async updateSubCategory(id, data) {
    return super.updateModel(id, data);
  }

  public async deleteSubCategory(id) {
    return super.deleteById(id);
  }
}
