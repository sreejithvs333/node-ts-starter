import { FeedStore } from "../feed";

const store = new FeedStore();
describe("Feed modal", () => {
  it("should have an index method", () => {
    expect(store.index).toBeDefined();
  });

  it("should have a create method", () => {
    expect(store.create).toBeDefined();
  });

  it("should have a read method", () => {
    expect(store.read).toBeDefined();
  });

  it("should have an update method", () => {
    expect(store.update).toBeDefined();
  });

  it("should have a delete method", () => {
    expect(store.delete).toBeDefined();
  });

  it("index() should return a list of products", async () => {
    const result = await store.index();
    expect(result).toEqual([]);
  });

  it("create() should add a feed", async () => {
    const result = await store.create({
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
    const result = await store.read(1);
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
    const result = await store.update(feed, ["title"]);
    expect(result).toEqual({
      id: 1,
      title: "Updated title",
      description: "Some description"
    });
  });

  it("delete() should remove the feed object", async () => {
    await store.delete(1);
    const result = await store.index();
    expect(result).toEqual([]);
  });
});
