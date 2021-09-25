import { DateTime } from 'luxon';
import { BaseModel, BelongsTo, belongsTo, column, beforeCreate } from '@ioc:Adonis/Lucid/Orm';
import { v4 as uuidv4 } from 'uuid';
import User from 'App/Models/User';

export default class Todo extends BaseModel {
  public static selfAssignPrimaryKey = true

  public serializeExtras() {
    return {
      user: {
        email: this.$extras.email
      },
    }
  }

  @column({ isPrimary: true })
  public id: String

  @column()
  public description: String

  @beforeCreate()
  public static assignUuid(todo: Todo) {
    todo.id = uuidv4()
  }

  @column()
  public deadline: DateTime

  @column()
  public closedAt: DateTime

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @column()
  public userId: String

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>

}
