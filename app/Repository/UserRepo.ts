import User from 'App/Models/User';
import BaseRepository from './Base/BaseRepository';

export default class UserRepo extends BaseRepository {
  // create an instance of the BaseRepository class
  // protected Repository = new BaseRepository(User);
  // protected modelName;

  constructor() {
    super(User);
  }

  public async saveUser(data) {
    return super.createModel(data);
  }
}
