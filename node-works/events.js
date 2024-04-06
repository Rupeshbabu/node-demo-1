const EventEmitter = require('events');
const http = require('http');

class Sales extends EventEmitter {
    constructor(){
        super();
    }
}
const myEmitter = new EventEmitter();

// myEmitter.on('newSale', () =>{
//     console.log('There was a New Sale');
// });

// myEmitter.on('newSale', () =>{
//     console.log('Customer Name was Rupesh');
// });

// myEmitter.on('newSale', stock =>{
//     console.log(`There are now ${stock} items left in stock.`);
// });

// myEmitter.emit('newSale', 9);


/////////////////////

const server = http.createServer();

server.on('request', (req, res) =>{
    console.log('Request received!!');
    res.end('Request Received');
});

server.on('request', (req, res) =>{
    console.log('Another Request Received 🙂');
});

server.on('close', () =>{
    console.log('Server Closed');
});

server.listen('8000', '127.0.0.1', () =>{
    console.log('Waiting for requests.....!');
});