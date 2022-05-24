import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Table,
} from 'sequelize-typescript';
import Invitable from './invitable';
import Server from './server.model';

@Table({ tableName: 'server_invite', underscored: true })
class ServerInvite extends Invitable {
  @ForeignKey(() => Server)
  @Column(DataType.INTEGER)
  serverId!: number;

  @BelongsTo(() => Server)
  server!: Server;
}

export default ServerInvite;
