/*NoteVIE Express
👉Express is minimum node.js liberary.
👉Why are we using "Postman" software for API making and testing. Becouse it has a lot of feature that let's us do much more robust API testing, formation, and industry ready settings testing. 
👉Express has a lot of methods on "request" and "response", much much more than Node.js; that's why we use Express third party API, not node.js.
👉 in express, if we don't specify the status code, by default it takes code 200 meaning OK in postman. 200 is default. 
-------------REST API------------------
👉API: Application Program Interface. It's a part of software that can be used by another software to allow interaction between them. 
👉ReST means "Representational State Transfer". It's the architecture name which shows how and API has been built. Using which architecture. ReST being one of the kind.Properties that ReSTful API must have:-
    ✅ Separation of API into logical Resources
        👉Resources:- are Objects or representation of something which has data associated with it. For example: users, reviews etc.Basically, any information that can be named is a resouces.
    ✅ Expose structured, resource-based URLs
        👉Expose Structure:- is the part of that code which has been made available to users to interect with the underlying "Resources". Eg. https://www.natours.com/addNewTour
                               [___👆____] Endpoint
        [___________👆________________]URL
        There are many endpoints that you can can use like /getTour or /updateTour or /deleteTour or /getTourByUsers or /deleteTourByUsers            
    ✅ use HTTP methods to add, delete or communicate. Concept Basically CRUD operation. Create, Read, Update, Delete operations.
        👉 Do note that above endpoints aren't correct. We should only use HTTP methods to perform any function on data. Hence endpoints should only contain the resources not the actions that we can perform on the data. Becouse it will become unmanagable in no time. Hence the above endpoints should be named like /tours or /tourByUser or /tourByUser/userid=blahblah. So in this manner, we have only the resource name( in plural sense), not the verbs like get, update, post, delete becouse these verbs are http methods.
        👉GET:- used to perform read operation on data. GET tours/7
        👉POST:- used to perform create operation on data or add new content to the server.It creaes a new Resource. Note in these case, no userid is sent as it is getting created for first time and server decides what's the new id is going to be according to it's programming. eg. POST/Tours
            Note: id you see the beauty that we are using the same resource name, but with different verbs(http methods). And it's working fine. We aren't using /getTour, becouse that will become unmanagable. 
        👉PUT:- used to perform full update operation on data. PUT tours/7
        👉PATCH:- used to perform partial update operation on data. PATCH tours/7. A better choice amongst PUT and PATCH.
        👉DELETE:- used to perform delete operation on data. DELETE tours/7
        👉 we can also create no CRUD operations as well like /login or /search.
    These are  for CLIENTS TO CONSUME.

    ✅sending and receiving data between client and API should be done only in the standardised formate of JSON formate. Clients receive data or send data, servers send data or receive data should be done in JSON formate only.
        ☑ in JSON, all the keys in key-value pair has to be string only. keys meaning the name of the parameters of the object written in JSON.
        ☑ New Element: but before sending the JSON, we do "Response Formating" by using JSend. in this, we introduce two keys. 
        "status": success or failure. And another is 'data':{write the original data here.}. Even more formating can be added. But this is the simplest one. Simple is best. 
        ☑New Element: wrapping the data into additional object is called as "envalpoing". 
    ✅the API should be stateless.
        ☑Meaning of stateless:- all the state is handled on the client and not the server. "State" simply means as piece of data in application that might change over time as the application progressess. Like user is logged in or logged out. "each request must be handled at client" simply means that each response from client must have all the data needed to process a request on the server.
        ☑That is SERVER MUST NEVER REMEMBER THE LAST REQUEST TO PROCESS THE CURRENT REQUEST. atleast in ReSTful API, we avoid it.  
👉 Note that every time you save somthing into json file, it reloads the whole server and page. So even if the code is outside the server section, it will be reloaded. Hence don't feel confused that how did it happened. It's a feature of json file handling in node.
👉 TRICK😎😎 in JS : if you want to conver a number into string you need to concate ""empty space with it. Like 5+"" where + is concate operator. Similarly, if you have to convert a string into number you need to multiply it with some number. Eg. "5" * 1 will give a number type 5😊

*/


'use strict';
const fs = require('fs');
const express = require('express');
const { ifError } = require('assert');


const app=express();// here express will add many of it's method to app variable.
app.use(express.json());// here ""app.use()" is as middleware". It's called middleware. Why! Becouse it stands between "request" and "response". It's just a step that request goes through, and the data from body is added to request object.

/*
app.get('/', (request, response)=>{ 
    // response.status(200).send('Hello World from SERVER Side😎');Alternative Code👇 since send() simply sends the string to client.Note If you want to send the object, you need to use json().
    response.status(200).json(
        {message:'Hello World from SERVER Side😎',
         app: 'Natours'});
});
app.post('/', (request, response) => {	response.send('You can post to this endpoint. He..he boy. You were looking to understand what endpoints are, becouse you wanted to set endpoints for your frontend to communicate to your backend. Here you go. See this is the ENDPOINT that you were told about and this is your luck day.');	});
*/

// WE can't read data inside the server(app.get()), becouse it doesn't need reading again and again, every time some request is made. 👇 And we shall declare it outside in a blocking code manner. So that it is read only once(as outside) but for sure(syncronous code).
const toursData = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)); 

const getAllToursData=(request, response) => {
    response.status(200).json({
        status: 'success',
        results: toursData.length,
        data: {
            tours: toursData
        }
    });
};
const getTour=(request, response) => {
    console.log(request.params);//New Element Output: {id: '5'}
//app.get('/api/v1/tours/:id/:id2?/:id3?',(request,
    //VIEConcept 'request.params' is a very important object. It maps the value that was passed by client into our variable. Here 5. but if you have multiple variable which needs to be fed data and if you miss anyone, your routing breaks. Hence you need a way to make it optional. YOu do that by adding a "?"after the variable name.
    const id = request.params.id *1;
    // legacy code code migrated 👇if (id > toursData.length) {
    //     return response.status(404).json({
    //         status: 'fail',
    //         message: 'Invalid ID entered'
    //     });
    // }// for checking if the id is valied. This same logic can be applied using tour👇 value. It will be null if the id doesn't exist. It is more efficient. Becouse it is possible that due to garbage values, the length can be that big. 
    const tour= toursData.find((element) =>	
        element.id === id); //Note Now find() method creates an array of the elements where the callback function condition was found to be true. 
    if (!tour){ 
        return response.status(404).json({
            status: 'fail',
            message: 'Invalid ID entered'
        });// this is propoer checking if the resources that user is looking exists or not. 
    }

    response.status(200).json({
        status: 'success',
        data: {
            tour
        }
    });
};
const createTour=(request, response) => {	
    console.log(request.body);// VIENotethe request object is getting access to the body property becouse it inherited the body parameter from the middleware.Output: { name: 'Test Tour', duration: '14 days', difficulty: 'moderate' } it's only becouse we have a middle ware. If there was not a middleware, it would be undefined. Concept: Now we have to persist this data present in the 'body' of the 'request'. And we can do that by writing it to the database or a file and this data will be accessed letter on to create the post.👇
    const newId = toursData[toursData.length - 1].id + 1;// VIEConcept: we are getting the last id of the array and adding 1 to it to assign the id number to new post. Becouse there is no id by default.
    const newTour = Object.assign({ id: newId }, request.body);// New ElementMarvel here we are using Object.assign({obj to be added},{added to obj}) to create a  new object that has both the Objected added to it. Another way to do it is request.body.id=newId. But didn't. Becouse we don't want to mutate the original data/object. 
    toursData.push(newTour);// VIEConcept: we are pushing the new object to the array. Teacher had named it tours, but i had changed the name to show that we can name differently but the Object key on which it will be assigned to has to be the same old name. 
    fs.writeFile('`${__dirname}/dev-data/data/tours-simple.json`',JSON.stringify(toursData),(error)=>{
    if (error) console.log(error);
    response.status(201).json({
        status: 'success',
        data:{
            tour: newTour
        }
    });//VIECode 201 means Created.
    })// we are inside eventLoop. Hence using async funciton.
    //this code is being silenced as after creating the full code above, this becomes extra header to be sent for write. And that's not allowed. response.send('Done sending data.');//VIEConcept: we always need to send something to finally end the request and response cycle. 
};
const updateTour=(request, response) => {	if (request.params.id *1 > toursData.length) {
    return response.status(400).json({
        status:'fail',
        message:'Invalid ID'
    });// checking user data
}
    
      response.status(200).json({
        status:'success',
        data:{
            tour:'<Updated tours. It is placeholder value>'
        }
        });
    
};
const deleteTour=(request, response) => {	if (request.params.id *1 > toursData.length) {
    return response.status(400).json({
        status:'fail',
        message:'Invalid ID'
    });
}
    
      response.status(204).json({
        status:'success',
        data:null
        });
    
};


app.get('/api/v1/tours', getAllToursData);// VIE "getAllToursData" is called "Route handler" function.👉'/api/v1/tours' is a route and /tours is the resource that is being asked for. When a client hits this route, we do:- 👉 next arrow function where the next part of the process is undertaken.

app.get('/api/v1/tours/:id',getTour);//Marvel we defined a variable to be passed in route carrying some value each time like page number. To do that, we declared it like ":id"👈😨😵😎😂. It could be like ":keshav". Your wish.

app.post('/api/v1/tours', createTour);//New Element Concept:  all the data being sent by the client to the server is stored in the variable "request". But by default, EXPRESS won't do it, that it, it won't write data on the request variable. Hence to do that, we need a "MIDDLE WARE".

app.patch('/api/v1/tours/:id',updateTour);

app.delete('/api/v1/tours/:id',deleteTour);// this whole code is exactly the same as patch. We only change the name of the function itself 'delete', status code of response to 204 meaning "Server has successfully done the job and the content can't be found anymore" and data value to null "data: null".


const port =3000;
app.listen(port, ()=>{
    console.log(`App is running on port ${port}...`);
});






