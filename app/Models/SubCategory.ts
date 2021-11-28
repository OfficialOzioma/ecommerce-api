import { DateTime } from 'luxon';
import { column, BaseModel, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm';
import Category from './Category';

export default class SubCategory extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public name: string;

  @column()
  public status: boolean;

  @column()
  public categoryId: number;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @belongsTo(() => Category)
  public category: BelongsTo<typeof Category>;
}
