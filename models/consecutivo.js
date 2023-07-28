import { DataTypes, Model } from 'sequelize'
import sequelize from '../config/database.js'

class Consecutivo extends Model {}

Consecutivo.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    locacion: {
      type: DataTypes.STRING(64),
      allowNull: true,
    },
    consecutivo: {
      type: DataTypes.BIGINT,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'Consecutivo',
    tableName: 'consecutivo',
    timestamps: false,
  }
)

export default Consecutivo
