import Client from "../../database";
import Feed from "../models/feed.model";

export class FeedService {
  async index(): Promise<Feed[]> {
    let connection;
    try {
      connection = await Client.connect();
    } catch (err) {
      throw new Error(`Failed to connect to the database. Error: ${err}`);
    }
    try {
      const sql = "SELECT * from feeds";
      const result = await connection.query(sql);
      return result.rows;
    } catch (err) {
      throw new Error(`Cannot get feeds ${err}`);
    } finally {
      if (connection) {
        connection.release();
      }
    }
  }

  async create(feed: Feed): Promise<Feed> {
    let connection;
    try {
      connection = await Client.connect();
    } catch (err) {
      throw new Error(`Failed to connect to the database. Error: ${err}`);
    }
    try {
      const sql = `INSERT INTO feeds(title,description) VALUES ($1,$2) RETURNING *`;
      const result = await connection.query(sql, [feed.title, feed.description]);
      return result.rows[0];
    } catch (err) {
      throw new Error(`Cannot add new feed with title=${feed.title}. Error: ${err}`);
    } finally {
      if (connection) {
        connection.release();
      }
    }
  }

  async read(id: number): Promise<Feed> {
    let connection;
    try {
      connection = await Client.connect();
    } catch (err) {
      throw new Error(`Failed to connect to the database. Error: ${err}`);
    }
    try {
      const sql = `SELECT * FROM feeds WHERE id=($1)`;
      const result = await connection.query(sql, [id]);
      if (result.rowCount === 0) {
        throw new Error(`Cannot find feed with id=${id}.`);
      }
      return result.rows[0];
    } catch (err) {
      throw new Error(`Cannot find feed with id=${id}. Error: ${err}`);
    } finally {
      if (connection) {
        connection.release();
      }
    }
  }

  async update(feed: Feed, fieldsToUpdate: (keyof Feed)[]): Promise<Feed> {
    let connection;
    try {
      connection = await Client.connect();
    } catch (err) {
      throw new Error(`Failed to connect to the database. Error: ${err}`);
    }
    try {
      const sql = {
        text: `UPDATE feeds SET ${fieldsToUpdate
          .map((field, i) => `${field}=($${i + 1})`)
          .join(", ")} WHERE id=($${fieldsToUpdate.length + 1}) RETURNING *`,
        values: [...fieldsToUpdate.map((field) => feed[field]), feed.id]
      };
      const result = await connection.query(sql);
      return result.rows[0];
    } catch (err) {
      throw new Error(`Couldn't update feed with id=${feed.id}. Error: ${err}`);
    } finally {
      if (connection) {
        connection.release();
      }
    }
  }

  async delete(id: number): Promise<Feed> {
    let connection;
    try {
      connection = await Client.connect();
    } catch (err) {
      throw new Error(`Failed to connect to the database. Error: ${err}`);
    }
    try {
      const sql = `DELETE FROM feeds WHERE id=($1)`;
      const result = await connection.query(sql, [id]);
      return result.rows[0];
    } catch (err) {
      throw new Error(`Couldn't delete feed with id=${id}. Error: ${err}`);
    } finally {
      if (connection) {
        connection.release();
      }
    }
  }
}
