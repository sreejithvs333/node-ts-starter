import { FeedService } from "../../../src/v0/services/feeds.service";

const feedService = new FeedService();
describe("Feed modal", () => {
  it("should have an index method", () => {
    expect(feedService.index).toBeDefined();
  });

  it("should have a create method", () => {
    expect(feedService.create).toBeDefined();
  });

  it("should have a read method", () => {
    expect(feedService.read).toBeDefined();
  });

  it("should have an update method", () => {
    expect(feedService.update).toBeDefined();
  });

  it("should have a delete method", () => {
    expect(feedService.delete).toBeDefined();
  });

  it("index() should return a list of products", async () => {
    const result = await feedService.index();
    expect(result).toEqual([]);
  });

  it("create() should add a feed", async () => {
    const result = await feedService.create({
      title: "Some title",
      description: "Some description"
    });

    expect(result).toEqual({
      id: 1,
      title: "Some title",
      description: "Some description"
    });
  });

  it("read() should return feed object", async () => {
    const result = await feedService.read(1);
    expect(result).toEqual({
      id: 1,
      title: "Some title",
      description: "Some description"
    });
  });

  it("update() should return the updated feed object", async () => {
    const feed = {
      id: 1,
      title: "Updated title",
      description: "Some description"
    };
    const result = await feedService.update(feed, ["title"]);
    expect(result).toEqual({
      id: 1,
      title: "Updated title",
      description: "Some description"
    });
  });

  it("delete() should remove the feed object", async () => {
    await feedService.delete(1);
    const result = await feedService.index();
    expect(result).toEqual([]);
  });
});
