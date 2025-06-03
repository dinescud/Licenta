const { MongoClient } = require('mongodb');

async function fixUpHistory() {
  const MONGO_URI = 'mongodb://localhost:37017/licenta';
  const client = new MongoClient(MONGO_URI);
  await client.connect();

  const db = client.db();
  const historyCollection = db.collection('scanHistory');
  await historyCollection.updateMany(
    { userId: { $exists: true } },
    [{ $set: { externalId: "$userId" } }, { $unset: "userId" }]
  )
}

fixUpHistory()
  .then(() => {
    console.log('History updated successfully');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Error updating history:', error);
    process.exit(1);
  });