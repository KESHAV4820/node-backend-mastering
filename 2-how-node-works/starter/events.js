/*Note: 
🔵AS you can understand that LOC 8 is importing the events class. LOC10 is creating an object of the class. LOC14, LOC18 is setting the emitter to listen to the event. LOC24, LOC25 is firing the event.
🔵OBSERVER PATTERN: as you can see that the code in LOC 14,18 are OBSERVING the activity of the LOC in 24,25. That's why it is called so. It's like passive listening or passive radar guidance system. 😊
 🔵server emits. But using .on() method on server like "server.on()"➡ this whole thing becomes like an eventListeners.
 The emitter is the one that emits the event. The listener is the one that listens to the event.
 🔵emitters can also take some parameters and so does it's listeners which is server.on() and this parameter is used to pass some more parameter for diverse implementation and listening shake. LOC 19 and LOC 26. 
 🔵since there are multiple listeners on same emitter and you want order into their execution, you will use "syn" codes which are blocking code in nature but they will enforce order. This is an apt example that Concept no code is bad. They exist becouse they have purpose. Use them according to their purpose or every piece of code is flawed for you. 
 🔵 WE don't need to 'emit' the event on our own. It is done automatically for in-built components. But when we make our own custom events, then in those cases, we will need to make our own "emitter" as well. custom emiter to notify the actions for custom events.
 */
'use strict'
//----------1. EventEmitters(to understand)---------
/*
// To understand named event Emitters
const EventEmitter=require('events');//Concept1:"EventEmitter" is a standard name chosen for events. it's the name of the instance that we imported from class "events".

const myEmitter=new EventEmitter();//Concept2: Now using the same class to create an object that will be used to emit events. Now this will subscribe to some 'request' and keep observing it and emmits the event when it happens. It's almost like setting action-listeners to the event.

//setting emitter to listen to the event. Note that we can set many emitter on same event. 

myEmitter.on('newSale',()=>{
    console.log('There was a new sale!');
});// this is like evenlistener. It's a function that will be called when the event is fired.

myEmitter.on('newSale',()=>{
    console.log('Customer name: keshav');
});//second emitter

myEmitter.on('newSale', (stock) => {	console.log(`there are ${stock} items left in stock`);
	});

//firing the event
myEmitter.emit('otherName'); // this will not trigger the emitter.
myEmitter.emit('newSale');// only this will becouse of the parameter.
myEmitter.emit('newSale', 6);*/
console.log(`----------------------------`);

//----MarvelEmitters (Real world code)VIE---------

const EventEmitter=require('events');
class Sales extends EventEmitter{
    constructor(){
        super();
    };
};// You see this method of importing and declaring the class, this is exactly how other core modules like http etc is declared inside nodejs. All them them inherit from EventEmitter class. That's how they are able to detect any request being made by client. 

const myEmitter2=new Sales();// we created the emitter object called myEmitter2.

myEmitter2.on('newSale',()=>{
    console.log('There was a new sale!');
});// this is like evenlistener. It's a function that will be called when the event is fired.

myEmitter2.on('newSale',()=>{
    console.log('Customer name: keshav');
});//second emitter

myEmitter2.on('newSale', (stock) => {	console.log(`there are ${stock} items left in stock`);
	});

//firing the event
myEmitter2.emit('otherName'); // this will not trigger the emitter.
myEmitter2.emit('newSale');// only this will becouse of the parameter.
myEmitter2.emit('newSale', 6);

//-------To understand how webserver works.------
const http=require('http');

const server=http.createServer();

server.on('request', (request, response) => {	
    console.log(`Request received`);
    console.log(request.url);//Issue Found: 2 times output is being given. So this piece  of code will help us understand the url. Issue Resolved: two times server request is being sent. first for '/' and next for '/favicon.ico'.👺👺👺 this favicon request is being made automatically by the browser, not our program.
    response.end('Request received');
	});
server.on('request',(request,response) => {	
    //Issue Found response.end('Phir se dushra request by dushra code.');// we can use only one response.end(). Once the first response.end() is done executing, the server will not listen to any other request. Hence this 
    console.log(`Another request received`);
	});
server.on('close', () => {	
        console.log('Server closed');
	});

server.listen(8000,'127.0.0.1', () => {	console.log(`Waiting for request....`);
	});// VIE callback function as parameter is optional in this code. 

