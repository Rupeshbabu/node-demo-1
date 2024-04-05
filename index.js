const fs = require('fs');
const http = require('http');
const url = require('url');
const slugify = require('slugify');

const replaceTemplate = require('./modules/replaceTemplate');

////////////////////////
//FILES
//Blocking , Synchronous way
// const fileRead = fs.readFileSync('./txt-files/read.txt', 'utf-8');
// console.log(fileRead);

// const textOut = `This is what we know about person: ${fileRead} \n Created On ${Date.now()}`;
// fs.writeFileSync('./txt-files/read.txt', textOut);

//Un-Blocking , Asynchronous way
// fs.readFile('./txt-files/start.txt', 'utf-8', (err, data1) =>{
//     fs.readFile(`./txt-files/${data1}.txt`, 'utf-8', (err, data2) =>{
//         console.log(data2);
//     });
// });
// console.log('will read file');

////////////////////////////
//SERVER

const tempOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, 'utf-8');
const tempCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, 'utf-8');
const tempProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`, 'utf-8');

const data = fs.readFileSync(`${__dirname}/dev_data/data.json`, 'utf-8');
const dataObj = JSON.parse(data);

const slugs = dataObj.map((el) => slugify(el.productName, { lower: true }));
console.log(slugs);

const server = http.createServer((req, res) => {
  // const pathname = req.url;
  const { query, pathname } = url.parse(req.url, true);

  //OVERVIEW PAGE
  if (pathname === '/' || pathname === '/overview') {
    res.writeHead(200, { 'Content-Type': 'text/html' });

    const cardsHtml = dataObj.map((el) => replaceTemplate(tempCard, el)).join('');
    const output = tempOverview.replace('{%PRODUCT_CARDS%}', cardsHtml);
    res.end(output);

    //PRODUCT PAGE
  } else if (pathname === '/product') {
    const product = dataObj[query.id];
    res.writeHead(200, { 'Content-Type': 'text/html' });
    const output = replaceTemplate(tempProduct, product);
    res.end(output);

    //API
  } else if (pathname === '/api') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(data);
    // fs.readFile(`${__dirname}/dev_data/data.json`, 'utf-8', (err, data)=>{
    //     const productData = JSON.parse(data);
    // });

    //NOT FOUND
  } else {
    res.writeHead(404, {
      'Content-Type': 'text/html',
      'my-own-header': 'hellow-world',
    });
    res.end('<h1>Page not found :(</h1>');
  }
});

server.listen(8000, '127.0.0.1', () => {
  console.log('Server has been started to 8000');
});
