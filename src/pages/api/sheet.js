import { google } from "googleapis";
const fs = require("fs");
const { promisify } = require("util");
const { Readable } = require("stream");
async function uploadFileToDrive(file) {
  const media = {
    mimeType: file.mimetype,
    body: new Readable({
      read() {
        this.push(file.buffer);
        this.push(null);
      },
    }),
  };

  const res = await drive.files.create({
    requestBody: {
      name: file.originalname,
      parents: ["1bqcu07Ubl-TS3Vx0nFBYeyU5WikAjFoX"],
    },
    media: media,
    fields: "id, webViewLink",
  });

  return {
    fileId: res.data.id,
    fileUrl: res.data.webViewLink,
  };
}

async function handler(req, res) {
  if (req.method === "POST") {
    const { Name, Email, phoneNumber } = req.body;

    try {
      const auth = new google.auth.GoogleAuth({
        credentials: {
          client_email: process.env.CLIENT_EMAIL,
          client_id: process.env.CLIENT_ID,
          private_key: process.env.PRIVATE_KEY.replace(/\\n/g, "\n"),
        },
        scopes: [
          "https://www.googleapis.com/auth/drive",
          "https://www.googleapis.com/auth/drive.file",
          "https://www.googleapis.com/auth/spreadsheets",
        ],
      });
      const drive = google.drive({ version: "v3", auth });
      const fileMetadata = {
        name: `${req.body.fileName}.jpg`,
        parents: [process.env.FOLDER_ID],
      };
      const media = {
        mimeType: req.body.image.mimeType,
        body: req.body.image,
      };
      const file = await drive.files.create({
        resource: fileMetadata,
        media: media,
        fields: "id",
      });
      res.status(200).json({ fileId: file.data.id });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }

    const sheets = google.sheets({
      auth,
      version: "v4",
    });

    const response = await sheets.spreadsheets.values.append({
      spreadsheetId: "14RNChIbvz3j2pdxQw_tqRQTz4ZxX74WvXiwONpbniJg",
      range: "Sheet1!A2:C",
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [[Name, Email, phoneNumber]],
      },
    });

    res.status(201).json({ message: "It works!", response });
  } else {
    res.status(200).json({ message: "Hey!" });
  }
}

export default handler;
