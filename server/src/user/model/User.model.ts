import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { File } from '../../file/model/File.model';

interface UsersCreationAttrs {
  email: string;
  nickname: string;
}

@Table({ tableName: 'user', updatedAt: false })
export class User extends Model<User, UsersCreationAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  email: string;

  @Column({ type: DataType.STRING, allowNull: true })
  nickname: string;

  @Column({ type: DataType.STRING, allowNull: true })
  avatar: string;

  @Column({ type: DataType.BIGINT, defaultValue: 1024 ** 3 * 10 })
  diskSpace: number;

  @Column({ type: DataType.INTEGER, defaultValue: 0 })
  usedSpace: number;

  @HasMany(() => File)
  files: File[];
}
