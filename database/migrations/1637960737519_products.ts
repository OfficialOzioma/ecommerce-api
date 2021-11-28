import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class Products extends BaseSchema {
  protected tableName = 'products';

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary();
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE');
      table
        .integer('category_id')
        .unsigned()
        .references('id')
        .inTable('categories')
        .onDelete('CASCADE');
      table
        .enu('day_type', ['type 1', 'type 2'], {
          useNative: true,
          enumName: 'product_day_type_enum',
          existingType: false,
          schemaName: 'public',
        })
        .defaultTo('type 1');
      table.integer('sub_category_id').unsigned().notNullable();
      table.string('tile', 255).notNullable();
      table.string('address', 255).notNullable();
      table.text('calendar_days').notNullable();
      table.text('description').notNullable();
      table.float('price').notNullable();
      table.timestamp('created_at', { useTz: true });
      table.timestamp('updated_at', { useTz: true });
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
