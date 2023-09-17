import { DataTypes, Model } from 'sequelize'
import sequelize from '../config/database.js'

class Compras extends Model {}

Compras.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    buyer: {
      type: DataTypes.STRING(64),
      allowNull: true,
    },
    seller: {
      type: DataTypes.STRING(64),
      allowNull: true,
    },
    monto: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'Compras',
    tableName: 'compras',
    timestamps: false,
  }
)

export default Compras
