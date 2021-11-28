import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class UsersSchema extends BaseSchema {
  protected tableName = 'users';

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary();
      table.string('username', 255).notNullable();
      table.string('first_name', 255).notNullable();
      table.string('last_name', 255).notNullable();
      table.string('email', 255).notNullable();
      table.text('address').notNullable();
      table.string('contact_number', 255).notNullable();
      table
        .enu('status', ['PENDING', 'ACTIVE', 'SUSPENDED'], {
          useNative: true,
          enumName: 'user_status_enum',
          existingType: false,
          schemaName: 'public',
        })
        .defaultTo('ACTIVE');
      table
        .enu('type', ['Admin', 'User'], {
          useNative: true,
          enumName: 'user_type_enum',
          existingType: false,
          schemaName: 'public',
        })
        .defaultTo('Admin');
      table.string('password', 180).notNullable();
      table.string('remember_me_token').nullable();
      table.timestamp('created_at', { useTz: true }).notNullable();
      table.timestamp('updated_at', { useTz: true }).notNullable();
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
