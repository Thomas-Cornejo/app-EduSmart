import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
  }
);

export const connectDB = async () => {
  try {
    await sequelize.sync();
    console.log("DB is connected");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
    process.exit(1);
  }
};
export default sequelize;
