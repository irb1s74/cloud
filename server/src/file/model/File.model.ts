import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { User } from '../../user/model/User.model';

interface FileCreationAttrs {
  name: string;
  type: string;
  userId: number;
}

@Table({ tableName: 'file' })
export class File extends Model<File, FileCreationAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.INTEGER, allowNull: false })
  @ForeignKey(() => User)
  userId: number;

  @Column({ type: DataType.INTEGER, allowNull: true })
  parentId: number;

  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @Column({ type: DataType.STRING, allowNull: false })
  type: string;

  @Column({ type: DataType.STRING, allowNull: true })
  accessLink: string;

  @Column({ type: DataType.INTEGER, defaultValue: 0 })
  size: number;

  @Column({ type: DataType.STRING, defaultValue: '' })
  path: string;

  @BelongsTo(() => File, {
    as: 'parent',
    foreignKey: 'parentId',
  })
  parent: File;

  @HasMany(() => File, {
    as: 'child',
    foreignKey: 'id',
  })
  child: File[];

  @BelongsTo(() => User)
  user: User;
}
