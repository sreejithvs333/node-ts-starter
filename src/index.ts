import express from 'express';
import routes from './routes/index.router';
const app = express();
const port = 3000;

app.use("/api",routes);

app.listen(port, ()=> {
    console.log(`Server started and running on http://localhost:${port}`); 
})
