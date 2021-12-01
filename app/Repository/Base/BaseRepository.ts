/* eslint-disable prettier/prettier */
import Database from '@ioc:Adonis/Lucid/Database';
import { LucidModel } from '@ioc:Adonis/Lucid/Orm';
import RepositoryInterface from '../interface/RepositoryInterface';

export default class BaseRepository implements RepositoryInterface {
  protected modelName;

  constructor(model: LucidModel) {
    this.modelName = model;
  }

  public async findAll() {
    return await this.modelName.all();
  }
  public async findById(modelId: number) {
    return this.modelName.find(modelId);
  }

  public async findByName(tableName: any, name: any) {

    return Database.from(tableName)
      .where('name', name)
      .select('*')
      .first();

  }

  public async createModel(payload: any) {
    const model = this.modelName.create(payload);

    return model;
  }

  public async updateModel(modelId: number, payload: any) {

    return await this.modelName
      .query()
      .where('id', modelId)
      .update(payload)

  }

  public async deleteById(modelId: number) {
    const model = await this.modelName.find(modelId);

    return await model.delete();
  }
}
