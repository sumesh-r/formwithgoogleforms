import { google } from "googleapis";

async function handler(req, res) {
  if (req.method === "POST") {
    const { Name, Email, phoneNumber } = req.body;

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
