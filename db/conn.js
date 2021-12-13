const { MongoClient } = require("mongodb");

const _client = new MongoClient(`${process.env.MONGO_URI}`);
const _dbName = process.env.DB_NAME;
const _collectionName = process.env.COLLECTION_NAME;

const mongoConnect = async () => {
  try {
    await _client.connect();
    console.log("DB connection succeeded");
  } catch {
    console.log(error);
    throw new Error("DB connection failed");
  }
};

const getRandom = async () => {
  try {
    return _client
      .db(_dbName)
      .collection(_collectionName)
      .aggregate([
        {
          $match: {
            gui_suggested_tags: { $exists: false },
          },
        },
        { $sample: { size: 1 } },
      ])
      .toArray()
      .then((array) => array[0]);
  } catch {
    console.log("Error retreiving random document from Mongo");
  }
};

const postTags = async (postId, tagsArray) => {
  try {
    console.log(postId, tagsArray);

    await _client
      .db(_dbName)
      .collection(_collectionName)
      .updateOne(
        { post_id: String(postId) },
        {
          $set: {
            gui_suggested_tags: tagsArray,
          },
        },
        { upsert: false }
      );
  } catch {
    console.log("Error writing new tags to Mongo");
  }
  console.log(`Upsert operation succeeded for post_ID: ${postId}`);
};

module.exports = {
  mongoConnect,
  getRandom,
  postTags,
};
