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
--------------Async Await--------
⭕ async function will keep doing work in the background, away from main-thread in " JS RuntimeEnvironment" and hence without blocking the mainthread.
⭕We leverage this power by putting the word "async" in front of the function names.
⭕await=== promise.then() for analogy shake; what await does is that basically, it stops the execution of code until the value for the promise is returned back. And this value is then stored in the variable called data.
⭕The Aim of Async and Await is to give our code the LOOKS👀 of SYNCHRONOUS CODE but in reality it remains  an  ASYNCHRONOUS CODE.
⭕LearnByHeart "await" CAN'T EXIST WITHOUT "Async".
⭕ VIE async await aren't something new. They are syntextic-sugar. They make the old promise.then().then() kind of chaining look more beautiful to avoid callback hell. Just that. It's for code asthetics.
⭕Issue Found Take A Good Look But there is one problem with async await. even if some error comes, still it will throw resolved in getDogPic function at the variable 'dogName'. To resolves this issue, we need to manually code the error throwing code in there. But this solution starts mixing async await with .then(). What's the use then???? 
⭕Marvel hence the solution to above problem is using IIFs(Immidiately Invoked Functions)
⭕ an Async function automatically return a Promise and the value that we return from async function will be the resolved value of that Promise. From there, we can simply handle it as yet another promise.That's what we deed in IFFs function down below👇👇👇

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
const getDogPic= async ()=>{
    try{
        const dogName = await readFilePro(`${__dirname}/dog.txt`);
        console.log(`Breed: ${dogName}`);//Code Testing

       // const response= await superagent.get(`https://dog.ceo/api/breed/${dogName}/images/random`);//NoteThis code has been silenced to test the way to simultaneously await multiple requests. 
       const response1Pro= superagent.get(`https://dog.ceo/api/breed/${dogName}/images/random`);
       const response2Pro= superagent.get(`https://dog.ceo/api/breed/${dogName}/images/random`);
       const response3Pro= superagent.get(`https://dog.ceo/api/breed/${dogName}/images/random`);
       const responseAll= await Promise.all([response1Pro,response2Pro,response3Pro]);
       const imgs = responseAll.map((elem) =>elem.body.message);// Issue Found Bug Found if i write (elem)=>{elem.body.message}; which is legally the same as writting (elem)=>elem.body.message; or elem=> elem.body.message; the output of the responseAll is an array of undefined [undefined, undefined, undefined]. Why? It is evident that Because the map function is not waiting for the promise to resolve, we are gettin undefined. But why here, and for what ... {} braces in the body of an arrow function....why!!
       console.log(imgs);//Code Testing
       
       //console.log(responseAll);//Code Testing
       

        //console.log(response.body.message);//for Code Testing
        
        await writeFilePro('dog-img.txt', imgs.join('\n'));
        console.log(`${dogName} dog image saved to file!`);
    }catch(error){
        console.log(`Bhaay some sinister code is trying to sabotage our effort. find that traitor and finish him. Fatality. ${error}`);
        throw(error);        
    };
    return '2: Ready🐶';
};
// Marvel Concept LearnByHeart Just Beautiful becouse this code throws the error properly even while using async and await. 
(async () => {	
    try{
        console.log('1: Will get dog pics!');
        const x= await getDogPic();//VIENote Awaiting the promise that we created earlier. 
        console.log(x);
        console.log('3: Done getting dog pics!');
    }catch(error){
        console.log('Code Paati Gelo💀💀😵');
    }
	})();

console.log(`1: Will get dog pics!`);//Code Testing
//const x= getDogPic();//Code Testing
//console.log(x);//Output: Promise {<pending>} becouse rightnow, this promise is still running . 
//console.log(`3: Done getting dog pics!`);// Code Testing
/* legacy code becouse it is mixing asyn await with .then() We can do this code much cleaner like above IFy method just above 👆
getDogPic().then((x) => {	
    console.log(x);
    console.log('3: Done getting dog pics!');
	} //Concept: this code works as expected. No promise pending. Becouse we used .then() to keep tap on the promise that was made by getDogPic() method. 
).catch(error=>console.log('Code Paati Gelo💀💀😵'));
*/

/*legacy code it was used to demonstrate promisifying the code. But now, to implement async await 👆, even this code has to be silenced. 
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
*/

/*
    (2)code migrated 👆 to readFilePro function.
fs.readFile(`${__dirname}/dog.txt`,(error, resolvedData)=>{
if(error) return console.log(error);//if there is error, the program will return from here. 
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
//});