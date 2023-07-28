import Sequelize from 'sequelize'

const connectionString = `postgres://${process.env.DB_USER}:${process.env.DB_PASS}@localhost:5432/${process.env.DB_NAME}`

const sequelize = new Sequelize(connectionString, {
  dialect: 'postgres',
  define: {
    timestamps: false,
  },
})

export default sequelize
