import { Table } from 'sequelize-typescript';
import Invitable from './invitable';

@Table({ tableName: 'friend', underscored: true })
class Friend extends Invitable {}

export default Friend;
