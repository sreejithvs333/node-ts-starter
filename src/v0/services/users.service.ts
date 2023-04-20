import Client from "../../database";
import User from "../models/user.model";

export class UserService {
  async index(): Promise<User[]> {
    let connection;
    try {
      connection = await Client.connect();
    } catch (err) {
      throw new Error(`Failed to connect to the database. Error: ${err}`);
    }
    try {
      const sql = "SELECT * from users";
      const result = await connection.query(sql);
      return result.rows;
    } catch (err) {
      throw new Error(`Cannot get users ${err}`);
    } finally {
      if (connection) {
        connection.release();
      }
    }
  }
}
