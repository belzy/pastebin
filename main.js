import Express from "express";
import { fileURLToPath } from "url";
import { join, dirname } from 'path';

import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';

const PORT = process.env.PORT || 8082;

const server = Express();
server.use(Express.json()) 

// db.json file path
const __dirname = dirname(fileURLToPath(import.meta.url));
const file = join(__dirname, 'db.json');

// Configure lowdb to write data to JSON file
const adapter = new JSONFile(file)
const defaultData = { bins: [] }
const db = new Low(adapter, defaultData)

server.use(Express.static(join(__dirname, 'client/dist/client')));

// server.get('/', async (req, res) => {
//   await db.read();
//   const bins = db.data;
//   res.json(bins);
// });

server.post('/', async (req, res) => {
  try {
    await db.read();
    const { bins } = db.data

    const { content } = req.body; 
    const id = bins.length 
      ? bins[bins.length - 1].id + 1
      : 0;

    bins.push({ id, content });
    await db.write();

    res.json({ id });
  } catch (error) {
    console.error(error);
    res.status(500).end();
  }
});

server.listen(PORT, () => {
  console.log(`[server] Server listening on port ${ PORT }...`);
});