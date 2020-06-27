import express = require('express');
import bodyParser = require('body-parser');

const app = express()
const port = 3000
app.use(bodyParser.json());

app.get('/:id', (req, res) => 
{   
    var params:any = req.params;
    console.log("value" + params.id);
    res.send(`The given id status is as follows`);
})

app.post('/send', (req, res) => 
{   
    // get input content and send out email
    
    console.log(req.body);
    res.send('mail successfully sent');
})

app.listen(port, 
    () => console.log(`Mail servic started on http://localhost:${port}`))
