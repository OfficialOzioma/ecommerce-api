import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class Categories extends BaseSchema {
  protected tableName = 'categories';

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary();
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
