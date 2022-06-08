//import
const express = require('express');

//create app
const app = express();
app.use(express.json());

let ex = []

//get
app.get('/getData', (request, response) => {
    response.send(ex);
})

//post
app.post('/createData', (request, response) => {
    const new_ex_data = {
        name_first: request.body.name_first,
        name_last: request.body.name_last
    }
    if (
        !new_ex_data.name_first ||
        !new_ex_data.name_last
    ) {
        return response.status(400).send("error data not enough");
    }
    for (let i = 0; i < ex.length; i++) {
        if (
            ex[i].name_first == new_ex_data.name_first ||
            ex[i].name_last == new_ex_data.name_last
        ) {
            return response.status(400).send("error data duplicate");
        }
    }

    ex.push(new_ex_data)

    response.send("ok");
})
app.delete('/removeData', (request, response) => {
    if (!request.body.name_first) {
        return response.status(400).send("error data not enough");
    }
    for (let i = 0; i < ex.length; i++) {
        if (ex[i].name_first == request.body.name_first) {
            ex.splice(i, 1);
            return response.send("ok");
        }
    }
    response.status(400).send("error data not found");
})
//listen
app.listen(3000, () => {
    console.log('server started!');
    console.log
});