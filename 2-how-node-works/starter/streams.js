'use strict';

const fs = require('fs');
const server = require('http').createServer();

server.on('request', (request, response) => {
    // Solution 1
    // fs.readFile('test-file.txt',(error, data)=>{
    // if(error) console.log(error);
    
    //  response.end(data);
    // });// VIEConceptIssue Found: there is problem with this kind of coding. Though it works, but the server has to copy the whole ..WHOLE file into the variable and then output it. Imagine what will happen if you use this code to get the data from allexamstable in postgreSQL. 😢Phat ke haath me aa jayegi bhaay. 4.7 crore data points. This will make nodejs crash or hang the app. It won't be pretty.

    //Solution 2: Streams:Note we are streaming the output right to the client. That is, as data is being read in chunks from the source, it is being written in chuncks to the stream which goes to client and the process will go on until 'end' event-emiter isn't thrown out by the stream.
/*    const readable = fs.createReadStream('test-file.txt');
    readable.on('data', chunk => {
        response.write(chunk);
    });
        //when stream is finished writing the data, to close the stream.
    readable.on('end', () => {
        response.end();
	});// VIEConceptIssue Found: even this solution has problem. There is something called "back-presser👺😂💨" problem in this code. The ability of node to "read" the data from the source is much-much higher then it's ability to "write" the data on the stream. That means, every second, there are more datas being read then what it can write. This creates back log on the process of writing on the stream and this is called back-presser😂💨.
    readable.on('error',err =>{
        console.log(err);
        response.statusCode = 500;
        response.end(`File not found : ${response.statusCode}`);
    });// if some kind of error may occure.
    */
    //solution 3: VIEConceptMarvel: use this solution only.LearnByHeart: use "pipe" operator. 
    const readable = fs.createReadStream('test-file.txt');
        readable.pipe(response);
    //    ⬆         ↖       ⬆
    //readableSource.pipe(writeableDestination)
    //pipe operator is used to pipe the data from the source to the destination. You need to do this and nothing else. That's it😎. pipe takes care of opening and closing the stream and if any error comes behind the scene. You don't neet to finger it.     
});
     server.listen( 8000, "127.0.0.1", ()=>{
     console.log(" ---SERVER IS LISTENING--- ")});
