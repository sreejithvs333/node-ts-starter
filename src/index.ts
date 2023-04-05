import express from 'express';

const app = express();
const port = 3000;

app.get('/test', (req, res)=>{
   res.send("Server is working!");
});

app.listen(port, ()=> {
    console.log(`Server started and running on http://localhost:${port}`); 
})
