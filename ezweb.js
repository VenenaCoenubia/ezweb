//import
const express = require('express');

//create app
const app = express();
app.use(express.json());

let ex1 = []

//get
app.get('/getData', (request, response) => {
    response.send(ex1);
})

//post
app.post('/createData', (request, response) => {

    const new_ex1_data = {
        name_first: request.body.name_first,
        name_last: request.body.name_last,
    }

    if (
        !new_ex1_data.name_first ||
        !new_ex1_data.name_last
    ) {
        return response.status(400).send("error data not enough");
    }
    ex1.push(new_ex1_data)
    response.send("ok");
})
app.delete('/removeData', (request, response) => {
    if (!request.body.name_first) {
        return response.status(400).send("error data not enough");
    }
    for (let i = 0; i < ex1.length; i++) {
        if (ex1[i].id == request.body.name_first) {
            ex1.splice(i, 1);
            return response.send("ok");
        }
    }
    response.status(400).send("error data not found");
})
//listen
app.listen(3000, () => {
    console.log('server started!');
});