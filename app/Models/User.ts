import { DateTime } from 'luxon';
import { BaseModel, column, beforeCreate } from '@ioc:Adonis/Lucid/Orm';
import { v4 as uuidv4 } from 'uuid';

export default class User extends BaseModel {
  public static selfAssignPrimaryKey = true

  @column({ isPrimary: true })
  public id: String

  @column()
  public description: String

  @beforeCreate()
  public static assignUuid(user: User) {
    user.id = uuidv4()
  }

  @column()
  public email: String

  @column()
  public password: String

  @column()
  public profile: String

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
