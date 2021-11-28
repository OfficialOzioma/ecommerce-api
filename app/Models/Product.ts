import { DateTime } from 'luxon';
import { column, BaseModel, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm';
import Category from './Category';
import SubCategory from './SubCategory';
import User from './User';

export default class Product extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public tile: string;

  @column()
  public address: string;

  @column()
  public calendar_days: string;

  @column()
  public description: string;

  @column()
  public day_type: string;

  @column()
  public userId: number;

  @column()
  public categoryId: number;

  @column()
  public subCategoryId: number;

  @column()
  public price: number;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>;

  @belongsTo(() => Category)
  public category: BelongsTo<typeof Category>;

  @belongsTo(() => SubCategory)
  public subCategory: BelongsTo<typeof SubCategory>;
}
