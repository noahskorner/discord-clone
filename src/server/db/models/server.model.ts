import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript';
import ServerUser from './server-user.model';
import Channel from './channel.model';

@Table({ tableName: 'server', underscored: true })
class Server extends Model {
  @Column(DataType.STRING)
  name!: string;

  @HasMany(() => ServerUser)
  users!: ServerUser[];

  @HasMany(() => Channel)
  channels!: Channel[];
}

export default Server;
