// /api/new-meetup
// server-side code
// method POST

import { connectDatabase, insertDocument } from '../../helpers/db-util';

async function handler(req, res) {
  if (req.method === 'POST') {
    const data = req.body;

    let client;

    try {
      client = await connectDatabase();
    } catch (error) {
      res.status(500).json({ message: 'Connecting to the database failed!' });
      return;
    }

    try {
      await insertDocument(client, 'meetups', data);
      client.close();
    } catch (error) {
      res.status(500).json({ message: 'Inserting meetup failed!' });
      return;
    }

    res.status(201).json({ message: 'Meetup inserted!' });
  }
}

export default handler;
