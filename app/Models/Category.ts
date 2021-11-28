import { DateTime } from 'luxon';
import { column, BaseModel, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm';
import Product from './Product';
import SubCategory from './SubCategory';

export default class Category extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public name: string;

  @column()
  public status: boolean;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @hasMany(() => Product)
  public products: HasMany<typeof Product>;

  @hasMany(() => SubCategory)
  public subCategories: HasMany<typeof SubCategory>;
}
