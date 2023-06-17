import Express from "express";
import { fileURLToPath } from "url";
import { join, dirname } from 'path';

import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PORT = process.env.PORT || 8082;

const server = Express();
server.use(Express.json()) 
server.use(Express.static(join(__dirname, 'client/dist/client')));

// db.json file path
const file = join(__dirname, 'db.json');

// Configure lowdb to write data to JSON file
const adapter = new JSONFile(file)
const defaultData = { bins: [] }
const db = new Low(adapter, defaultData)


// server.get('/', async (req, res) => {
//   await db.read();
//   const bins = db.data;
//   res.json(bins);
// });

server.post('/bin', async (req, res) => {
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

server.get('/bin/:id', async (req, res) => {
  const id = req.params.id;

  await db.read();
  const { bins } = db.data
  const { content } = bins.filter(b => b.id.toString() === id.toString())[0];
  res.json({ content });
});

server.get('*', (req, res) => {
  res.sendFile(join(__dirname, 'client/dist/client/index.html'));
});
server.listen(PORT, () => {
  console.log(`[server] Server listening on port ${ PORT }...`);
});