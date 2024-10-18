import express from 'express';

const app = express();

app.use(express.json());

let idCounter = 1;
const data = []

app.get('/', (req, res) => {
  res.send(data);
});

app.get('/search', (req, res) => {
  res.send(data.filter(x =>{
    for (let key in x){
      if(typeof x[key] ==="string" && x[key].includes(req.query.q))
        {return true}
      console.log(typeof x[key] ==="string" && x[key].includes(req.query.q));

    }
    return false;
  }))});


app.post('/', (req, res) => {
  if (typeof(req.body) !== "object" || Array.isArray(req.body)) {
    return res.sendStatus(400);
  }

  const newItem = {
    ...req.body,
    id: idCounter++,
    createdAt: new Date().toString(),
    updatedAt: new Date().toString()
  };

  data.push(newItem);
  res.status(201).send(newItem);
});

app.patch('/:id', (req, res) => {
  const obj = data.find(x => x.id === parseInt(req.params.id));
  if (obj) {
    for (let key in req.body) {
      // Csak a megengedett mezők módosítása
      if (key !== 'id' && key !== 'createdAt' && key !== 'updatedAt') {
        obj[key] = req.body[key];
      }
    }
    obj.updatedAt = new Date(); // Módosítás dátumának frissítése
    res.send(obj);
  } else {
    res.sendStatus(404);
  }
});

app.delete('/:id', (req, res) => {
  const index = data.findIndex(x => x.id === parseInt(req.params.id));
  if (index > -1) {
    data.splice(index, 1);
    res.sendStatus(204);
  }
  else {
    res.sendStatus(404);
  }
});

app.listen(3000, () => console.log('Server is running on port 3000.'));