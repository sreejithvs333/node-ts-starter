import Client from "../../../../../database";

export type Feed = {
  id: Number;
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
}
