import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../helpers/database-helper';

class UserModel extends Model {}

UserModel.init(
  {
    id: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      primaryKey: true,
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize,
    modelName: 'User',
  }
);

export default UserModel;
