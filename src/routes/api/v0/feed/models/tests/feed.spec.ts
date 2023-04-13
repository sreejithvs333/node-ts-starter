import { FeedStore } from "../feed";

const feedStore = new FeedStore();
describe("Feed modal", () => {
  it("should have an index method", () => {
    expect(feedStore.index).toBeDefined();
  });
  it("index() should return a list of products", async () => {
    const result = await feedStore.index();
    expect(result).toEqual([]);
  });
});
