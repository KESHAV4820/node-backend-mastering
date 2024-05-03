'use strict';
/*NoteVIE:
⭕a 'PROMISE' basically means that for a request made, if you get the output or your(server) final response for that task, when ever you get it, do let me know!! 😊So polite man. So polite. "Promise" is very respectful, bourndary loving and chill concept. It doesn't get into the personal spaces of other codes. 
⭕ A promise is returned by the methods like '.get()'. That is, they pass on request to server and ask them of promise. And .get() gives you a promise on that promise that it made. Initially the state of the promise remains pending as there is no data retrival process going right at that moment. Sometimes machine is idle so it could be instantenous but we are talking for 99% other cases.
⭕Now what is "CONSUMING THE PROMISE"! So when promise is finally returned with data as promised, we use it for our purposes. That means consuming the promise. How do we consume the promise then? By using '.then()' method. 😁👌
⭕inside .then(), we use callback functions which takes the data from promise returned and uses it, that is, consumes🍴 the promise. But there is a problem with this method. It handles only the fullfilled promises and nothing for failed resolved promises. To address this issue, we use ".catch()" method by chaining it to the .then() method. So we write all the codes for things going Correctly into the .then() callback method, but for all the unsuccessful or error cases, we handle at .catch() block.
⭕Promise that comes with data(any data, could be useful or bad )  is called as "RESOLVED PROMISES".VIELearnByHeart A RESOLVED PROMISE can either be FULLFILLED OR REJECTED(when there was an error). YOu must understand whats "Pending Promise" and "Unresolved Promise". 
--------------Promisifying the read and write--------
⭕So what we need is a read file function that returns a promise, and it only receives a file name, not the callback function.
⭕Promise() constructor takes an "executor function". This gets called immideatly when the function is called. The body of the executor function is the real deal. It's where we do asynchronous works.
⭕ Both arguments "resolve" and "rejected" in EXECUTOR FUNCTIONS are themselves FUNCTIONS.👈😨 Calling resolve function would means success(that means, resolve() will take 'data' parameters of fs.readFile()) and calling rejected function means failure which will use 'error' parameter of fs.readFile().
⭕Concept: HOW THE WHOLE PROMISIFYING THING WORKS👉 
▶ FIRST: our readFilePro() function returns PROMISE. 
▶ second:.then() has callback functions that return the PROMISE. 
▶ third: LearnByHeart And in the next .then() there is no promise getting returned, just the console.log(), so to keep the promises comming and use next .then() for chaining, we need to return something that returns promise. so we returned writeFilePro. 
▶ FOURTH: next .then() is the place where we dont need to propagae the chain. It's end. So we wrote the code that do not return promise.
▶ FIFTH:finally, .catch() to handle any kind of error. This is how they are chained. 

*/
const fs = require('fs');
const superagent = require('superagent');

//code upgrade: to promisify the read and write
const readFilePro = (file) => {	
    return new Promise((resolve, rejected) => {	
    fs.readFile(file,(error, data)=>{
    if(error) rejected(`Couldn't find the file👺👀😂`);
    resolve(data);
        })	
    })	
};
const writeFilePro= (file, dataToWrite) => {	
    return new Promise((resolve, rejected) => {	
    fs.writeFile(file, dataToWrite, (error) => {	if (error) {
         rejected(`Couldn't write the file👺👀😂`);
    };
    resolve('Success! Likh diya bhaay...salmon bhaay');
        });
	});
};
let dogName;
readFilePro(`${__dirname}/dog.txt`).then((resolvedData) => {// it can be named any thing. 
    console.log(`Breed: ${resolvedData}`);//Code Testing
    dogName = resolvedData;
    //Since 'superagent' returns a promise.
return superagent.get(`https://dog.ceo/api/breed/${resolvedData}/images/random`);

}).then((response) => {	
     console.log(response.body.message);// Code Testing
    return writeFilePro('dog-img.txt', response.body.message);
	}).then(() => {	
        console.log(`${dogName} dog image saved to file!`); 
    }).catch((error) => {	console.log(error.message); 
    });



fs.readFile(`${__dirname}/dog.txt`,(error, resolvedData)=>{
if(error) return console.log(error);//if there is error, the program will return from here. 
/*(2)code migrated 👆 to readFilePro function.
console.log(`Breed: ${data}`);//Code Testing

superagent.get(`https://dog.ceo/api/breed/${data}/images/random`).then((response) => {	
    // console.log(response.body.message);// Code Testing
    fs.writeFile('dog-img.txt', response.body.message, (error) => {
        if(error) return console.log(error);//if there is error, the program will return from here.

        console.log(`${data} dog image saved to file!`);
    });
	}).catch((error) => {	console.log(error.message);
    	});*/

/*
.end((err, response) => {	
    // console.log(response.body.message);// Code Testing
    fs.writeFile('dog-img.txt', response.body.message, (error) => {
        if(error) return console.log(error);//if there is error, the program will return from here.

        console.log(`${data} dog image saved to file!`);
    }); (1)code migrated to .then() callback function.👆
	});
*/
 //response.end(data);//could throw error. Becouse there is no server declared at first place. 
});