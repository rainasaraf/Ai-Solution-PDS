import mongoose from "mongoose";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const envPath = path.resolve(__dirname, "../../.env.local");

console.log('src/lib/mongodb.js loaded — cwd:', process.cwd());
console.log('src/lib/mongodb.js loaded — envPath:', envPath);
console.log('src/lib/mongodb.js loaded — MONGODB_URI present:', Boolean(process.env.MONGODB_URI));

let cached = global.mongoose;

// If .env.local wasn't loaded automatically, parse it manually.
if (!process.env.MONGODB_URI) {
  try {
    if (fs.existsSync(envPath)) {
      const content = fs.readFileSync(envPath, 'utf8').replace(/\r/g, '');
      const lines = content.split('\n');
      const regex = /^(?:\uFEFF)?\s*MONGODB_URI\s*=\s*(.*)$/;
      const line = lines.find(l => regex.test(l));
      if (line) {
        let value = line.replace(regex, '$1').trim();
        if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
          value = value.slice(1, -1);
        }
        process.env.MONGODB_URI = value;
        console.log('Manually loaded MONGODB_URI from .env.local');
      } else {
        console.log('MONGODB_URI line not found in .env.local');
      }
    } else {
      console.log('.env.local not found at', envPath);
    }
  } catch (e) {
    console.error('Failed to read .env.local:', e.message);
  }
}

if (!cached) {
  cached = global.mongoose = {
    conn: null,
    promise: null,
  };
}

export async function connectDB() {
  const MONGODB_URI = process.env.MONGODB_URI;

  if (!MONGODB_URI) {
    throw new Error("MongoDB URI missing. Set MONGODB_URI in your environment.");
  }

  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    console.log('Connecting to MongoDB with URI length', MONGODB_URI.length);
    cached.promise = mongoose.connect(MONGODB_URI);
  }

  cached.conn = await cached.promise;

  return cached.conn;
}
