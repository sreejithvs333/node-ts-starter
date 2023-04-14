import Client from "../../../../../database";

export type Feed = {
  id: number;
  title: string;
  description: string;
};
export class FeedStore {
  async index(): Promise<Feed[]> {
    try {
      const connection = await Client.connect();
      const sql = "SELECT * from feeds";
      const result = await connection.query(sql);
      connection.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Cannot get feeds ${err}`);
    }
  }

  async show(id: number): Promise<Feed> {
    try {
      const connection = await Client.connect();
      const sql = `SELECT * FROM feeds WHERE id=($1)`;
      const result = await connection.query(sql, [id]);
      connection.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Cannot find feed with id=${id}. Error: ${err}`);
    }
  }

  async create(feed: Feed): Promise<Feed> {
    try {
      const connection = await Client.connect();
      const sql = `INSERT INTO feeds(title,description) VALUES ($1,$2) RETURNING *`;
      const result = await connection.query(sql, [feed.title, feed.description]);
      connection.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Cannot add new feed with title=${feed.title}. Error: ${err}`);
    }
  }

  async update(feed: Feed, fieldsToUpdate: (keyof Feed)[]): Promise<Feed> {
    try {
      const connection = await Client.connect();
      const sql = {
        text: `UPDATE feeds SET ${fieldsToUpdate
          .map((field, i) => `${field} = $${i + 1}`)
          .join(", ")} WHERE id = $${fieldsToUpdate.length + 1}`,
        values: [...fieldsToUpdate.map((field) => feed[field]), feed.id]
      };
      const result = await connection.query(sql);
      return result.rows[0];
    } catch (err) {
      throw new Error(`Couldn't update feed with id=${feed.id}. Error: ${err}`);
    }
  }

  async delete(id: number): Promise<Feed> {
    try {
      const connection = await Client.connect();
      const sql = `DELETE FROM feeds WHERE id=($1)`;
      const result = await connection.query(sql, [id]);
      connection.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Couldn't delete feed with id=${id}. Error: ${err}`);
    }
  }
}
