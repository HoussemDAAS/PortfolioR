import { createClient } from '@sanity/client';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
// import quantumLogo from "../assets/images/quantum.svg";
// import acmeLogo from "../assets/images/acme-corp.svg";
// import echoValleyLogo from "../assets/images/echo-valley.svg";
// import pulseLogo from "../assets/images/pulse.svg";
// import outsideLogo from "../assets/images/outside.svg";
// import apexLogo from "../assets/images/apex.svg";
// import celestialLogo from "../assets/images/celestial.svg";
// import twiceLogo from "../assets/images/twice.svg";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const client = createClient({
  projectId: '1qcydod7', // Replace with your Sanity project ID
  dataset: 'production', // Replace with your Sanity dataset
  useCdn: false,                // Set to true for faster read-only operations
  apiVersion: '2025-01-18',     // Use the latest API version
});

const logos = [
    { name: "Quantum", imageUrl: path.join(__dirname, "../assets/images/quantum.svg") },
    { name: "Acme Corp", imageUrl: path.join(__dirname, "../assets/images/acme-corp.svg") },
    { name: "Echo Valley", imageUrl: path.join(__dirname, "../assets/images/echo-valley.svg") },
    { name: "Pulse", imageUrl: path.join(__dirname, "../assets/images/pulse.svg") },
    { name: "Outside", imageUrl: path.join(__dirname, "../assets/images/outside.svg") },
    { name: "Apex", imageUrl: path.join(__dirname, "../assets/images/apex.svg") },
    { name: "Celestial", imageUrl: path.join(__dirname, "../assets/images/celestial.svg") },
    { name: "Twice", imageUrl: path.join(__dirname, "../assets/images/twice.svg") },
];

async function importData() {
  try {
    for (const logo of logos) {
      const imageAsset = await client.assets.upload('image', fs.createReadStream(logo.imageUrl), {
        filename: path.basename(logo.imageUrl),
      });

      await client.create({
        _type: 'logo',
        name: logo.name,
        image: {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: imageAsset._id,
          },
        },
      });

      console.log(`Imported ${logo.name}`);
    }
  } catch (error) {
    console.error('Error importing data:', error.message);
  }
}

importData();
