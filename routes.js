const fs =require('fs');

const requestHandler = (req, res) => {
    const url =req.url;
    const method= req.method;
    if (url === '/') {
        res.write('<html>');
        res.write('<head><title>Ingrese el mensaje</title><head>');
        res.write('<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Enviar</button></form</body>');
        res.write('</html>');
        return res.end();
    }
    if (url === '/message' && method === 'POST') {
        const body = [];
        req.on('data', (chunk) => {
            console.log(chunk);
            body.push(chunk);
        });
        return req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            const message = parsedBody.split('=')[1];
            fs.writeFile('message.text', message, (err) => {
                res.statusCode = 302;
                res.setHeader('Location', '/');
                return res.end();
            });
        });    
    }
    res.setHeader('Conten-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title> Mi primera pagina con Node</title></head>');
    res.write('<body><h1>Esta es mi Node.js Server!</h></body>');
    res.write('</html>');
    res.end(); 
       
};

//module.exports = {
  //  handler: requestHandler,
    //someText:'Some hard coded'
//}

//module.exports.handler = requestHandler;
//module.exports.someText = 'Some hard coded tex'

exports.handler = requestHandler;
exports.someText = 'Some hard coded tex';