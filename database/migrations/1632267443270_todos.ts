import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Todos extends BaseSchema {
  protected tableName = 'todos'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary()
      table.string('description').notNullable(),
      table.dateTime('deadline').notNullable(),
      table.dateTime('closed_at')
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
      table.uuid('user_id')
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
