const { MongoClient } = require("mongodb");

const uri =
  "mongodb+srv://hyfuser:hyfpassword@cluster0.s0ovj.mongodb.net/new_world?retryWrites=true&w=majority";

const client = new MongoClient(uri);
async function run() {
  try {
    await client.connect();
    const database = client.db("new_world");
    const collection = database.collection("city");

    let city = {
      name: "Springfield",
      country_code: "SIM",
      district: "Simpsons State",
      population: 50342,
    };
    // Insert new city doc
    const myCity = await collection.insertOne(city);

    // Update population for the new doc
    const updatePop = await collection.updateOne(
      { name: "Springfield" },
      {
        $set: { population: "901293" },
        $currentDate: { lastModified: true },
      }
    );
    // Read doc with the "name" attribute
    const readCityDocName = await collection.find({ name: "Springfield" });

    await readCityDocName.forEach(console.log);

    // Read doc with the country_code attribute
    const readCityDocCountry = await collection.find({ country_code: "SIM" });
    await readCityDocCountry.forEach(console.log);

    // Delete doc
    const deleteCity = await collection.deleteOne({ name: "Springfield" });
    console.log("City Deleted");
  } finally {
    await client.close();
  }
}
run().catch(console.dir);
