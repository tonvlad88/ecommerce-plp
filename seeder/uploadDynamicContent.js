const admin = require("firebase-admin");
const fs = require("fs");
const path = require("path");

// Load service account key
const serviceAccount = require("./firebase-dynamic-ecommerce-private-key.json");

// Initialize Firebase Admin
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

// Load your local JSON
const dataPath = path.join(__dirname, "page-contents.json");
const landingData = JSON.parse(fs.readFileSync(dataPath, "utf8"));

// Write to Firestore
async function importData() {
  try {
    await db.collection("pages").doc("pages-content").set(landingData);
    console.log("✅ Pages content imported successfully!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error importing data:", error);
    process.exit(1);
  }
}

importData();
