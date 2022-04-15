import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import ChannelType from '../../../utils/enums/channel-type';
import Server from './server.model';

const CHANNEL_TYPE = Object.values(ChannelType).map((type) => type.toString());

@Table({ tableName: 'channel', underscored: true })
class Channel extends Model {
  @Column(DataType.ENUM(...CHANNEL_TYPE))
  role!: string;

  @ForeignKey(() => Server)
  @Column(DataType.INTEGER)
  serverId!: number;

  @BelongsTo(() => Server)
  server!: Server;
}

export default Channel;
