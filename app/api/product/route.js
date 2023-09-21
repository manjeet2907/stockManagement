import { MongoClient, ServerApiVersion } from "mongodb";
import { NextResponse } from "next/server";

// fetch all products
export async function GET(request) {
  const uri =
    "mongodb+srv://manjeet29saini:manjeet2910@cluster0.zqhnhmv.mongodb.net/?retryWrites=true&w=majority";

  const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });

  try {
    const database = client.db("stock");
    const inventory = database.collection("inventory");
    const query = {};
    const products = await inventory.find(query).toArray();

    return NextResponse.json({ success:true,products });
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

// Add a Product
export async function POST(request) {
  let body = await request.json();
  const uri =
    "mongodb+srv://manjeet29saini:manjeet2910@cluster0.zqhnhmv.mongodb.net/?retryWrites=true&w=majority";

  const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });
  try {
    const database = client.db("stock");
    const inventory = database.collection("inventory");
    const product = await inventory.insertOne(body);

    return NextResponse.json({ product, ok: true });
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
