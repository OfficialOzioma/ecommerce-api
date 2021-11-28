import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class Subcategories extends BaseSchema {
  protected tableName = 'sub_categories';

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary();
      table
        .integer('category_id')
        .unsigned()
        .references('id')
        .inTable('categories')
        .onDelete('CASCADE');
      table.string('name', 255).notNullable();
      table.boolean('status').defaultTo(true).notNullable();
      table.timestamp('created_at', { useTz: true });
      table.timestamp('updated_at', { useTz: true });
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
