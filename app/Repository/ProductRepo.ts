import Product from 'App/Models/Product';
import BaseRepository from './Base/BaseRepository';

export default class ProductRepo extends BaseRepository {
  // create an instance of the BaseRepository class
  // protected Repository = new BaseRepository(Product);

  constructor() {
    super(Product);
  }

  public async saveProduct(data) {
    return super.createModel(data);
  }

  public async updateProduct(id, data) {
    return super.updateModel(id, data);
  }

  public async deleteProduct(id) {
    return super.deleteById(id);
  }
}
