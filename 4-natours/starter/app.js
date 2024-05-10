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

//----------Middle ware--------------
1️⃣ A middleware is something like a function that lies between the "initial request" made by a user when comming to server and the final response that has to be returned finally. 
2️⃣ ✔ You need to imagine it like a pipe or pipeline. 
    It has start and end and length is divided into many section accroding to middleware stack, that is arrangement of middleware function in code.
    ✔ the order of arrangement of middleware stack has different effect each time. And hence, it is called as middleware stack.
    ✔ each middleware function has access to "next" function. And it is called generally at last so as to move the process to next middleware in the stack. It's important or the process will hang. 
    ✔ all the middleware are basically functions that are in between and process the request and response. IN that sense, express and it's function, all of them, All, are middleware functions only.  
3️⃣in each middleware function, we have access to the "(request, response, next)=>{}" parameters like it were passing from initial request stage on server to final response stage from server like it were passing from a tube or pipe.Remember It 👉Never forget to call next() function in a middleware. If you miss it, the request and response cycle would get jammed to one place. 
4️⃣Middleware applies to each and every request. Why, becouse it owns a cross-section of pipeline. So you have to pass through their area(that is code in the middleware codestack) and it's not always the case but if we want to avoid one section, we need to make a branching in the pipe and using routing, we can decide if request has to reach a particular middleware or not. If we don't specify routing, by default, it is thought that the pipeline is made of a a single non-branching pipe. Hence, each of the section will have an access to the function parameters.
5️⃣Conceptif the "route-handler" comes before the middleware, it may not be possible that all the middlewares will get access to request and response. becouse it is possible that router-handler may call a middleware that ends the request, response cycle before another middleware that may want it. But if the "route-handler" comes after the middlewares, each middleware that came before the route-handler will have access to request and response parameters of server. 
6️⃣ Point number 5👆 is fundamental to the working of Express. Remember it. 
7️⃣ we can download third party middlewares from NPM like "morgan". It is a third party loging(console.log()) middleware. It lets you see he requests made in your console. 
8️⃣in order to implement separate file segement for each resource for better code structure, we will need to create router for each resources, that is, small subapp for each router.
9️⃣Concept we created different routers for different resources for having separation of concern between these resources.Basically, we created one small app or sub app for each of them(like tourRoutes.js or userRoutes.js) and putting them together in one main app file called app.js
🔟Sub-routers has to be middleware or else show will you mount them onto bigger app router referance.
1️⃣1️⃣ Creating "server.js file" but why!! 😨 becouse it's considered a good practise to keep all the things related to express in one file and every thing related to server in one file. It is also the file where we have other data as well like database configuration or environment variable or some error handling stuff. All of these live in server.js which is our entery point 
1️⃣2️⃣server.js will actually be our starter file where every thing for backend starts and it's here we listen to our server.
1️⃣3️⃣app.use(express.static(`${__dirname}/public`));//Without this LOC you won't be able to access static contents of the project.And also note that IT WORK FOR ONLY THE STATIC FILES VIENote After using the express.static() middleware, you need to pass only 👉😨127.0.0.1:3000/overview.html even though the real path of the file is🥴 127.0.0.1:3000/public/overview.html. Becouse when a file is asked for, it looks around and if it can't find it there, it goes to public folder to find the same file. Hence if a file is already in the public folder, it will be found if it has been asked.And after this, it sets the root folder as the public folder, that is 127.0.0.1:3000 becomes the root folder for time being.
----------Environments for Node---------
1️⃣4️⃣ There are different environment settings in which Node.js development works. There are Production environment(default by Express), debugging environment, development environment and each environment has it's own usecase just like having fair copy and a rough copy while doing mathematics. in Development, you may want to develop along the lines of one testing database, but in production, it will have another database, loging in turned on/off.
1️⃣5️⃣Every thing not related to express.js shall be done outside the app.js file. 🥴which is this file, app.js. We use app.js to only configure our express application.Environement variables are out of the scope of express variables.
1️⃣6️⃣
1️⃣7️⃣
1️⃣8️⃣


*/


'use strict';
const fs = require('fs');
const express = require('express');
const { ifError } = require('assert');
const morgan=require('morgan');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');
const { createSecureServer } = require('http2');

const app=express();// here express will add many of it's method to app variable.
//----------middle wares--------------
app.use(morgan('dev'));// this returns [URL routes, status Code, time taken for response, size of response in bytes]
app.use(express.json());// here "app.use()" is as middleware. It's called middleware. Why! Becouse it stands between "request" and "response". It's just a step that request goes through, and the data from body is added to request object.It is used to add a middleware function in middleware. YOu can consider it as pipeline. But there are various sections of this pipeline and you are adding those sections by using app.use() function and the parameter used like express.json() or any other function adds the specified function like a section to this pipeline.

//👇this example is just for information.(SERVING STATIC FILE FROM FOLDER, NOT SOME ROUTE)
app.use(express.static(`${__dirname}/public`));

app.use((request, response, next) =>{
    console.log(`hello from the middleware🥴. More like middle kingdom.`);
    next();// forwarding the process to next section in pipeline(middleware) in 'initial request' and 'response' cycle.
    }
);// This middle ware applies to each and every single request. 
app.use((request, response, next) =>{
    request.requestTime = new Date().toISOString();//New Element
    next();
});// here the date&time is filled into request.requestTime using Date object and turned into standard formate with .toISOString(). now while making response object in router-callback-functions, RequestedAt: property will be added and assigned the value of request.requestTime.


//---------Route handlers----------------

/*
const toursData = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)); 
app.get('/', (request, response)=>{ 
    // response.status(200).send('Hello World from SERVER Side😎');Alternative Code👇 since send() simply sends the string to client.Note If you want to send the object, you need to use json().
    response.status(200).json(
        {message:'Hello World from SERVER Side😎',
         app: 'Natours'});
});
app.post('/', (request, response) => {	response.send('You can post to this endpoint. He..he boy. You were looking to understand what endpoints are, becouse you wanted to set endpoints for your frontend to communicate to your backend. Here you go. See this is the ENDPOINT that you were told about and this is your luck day.');	});
*/

// WE can't read data inside the server(app.get()), becouse it doesn't need reading again and again, every time some request is made. 👇 And we shall declare it outside in a blocking code manner. So that it is read only once(as outside) but for sure(syncronous code).
/* code migrated to tourRoutes.js
const getAllToursData=(request, response) => {
    console.log(request.requestTime);
    
    response.status(200).json({
        status: 'success',
        requestedAt: request.requestTime,
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
*/
/*code migrated to userRoutes.js
const getAllUsers=(request, response) => {
    console.log(request.requestTime);
    response.status(500).json({
    status: 'error',
    requestedAt: request.requestTime,
    message: 'This route is not defined yet!',
    results: toursData.length,
    //data: {}
    });
};
const createUser=(request, response) => {
    console.log(request.requestTime);
    response.status(500).json({
    status: 'error',
    //requestedAt: request.requestTime,
    message: 'route not implemented yet'
    //results: toursData.length,
    //data: {	}
    });
};
const getOneUser=(request, response) => {
    console.log(request.requestTime);
    response.status(500).json({
    status: 'error',
    //requestedAt: request.requestTime,
    message: 'this route hasnt been implemented'
    //results: toursData.length,
    //data: { }
    });
};
const updateUser=(request, response) => {
    console.log(request.requestTime);
    response.status(500).json({
    status: 'error',
    //requestedAt: request.requestTime,
    message: 'this route hasnt been implemented'
    //results: toursData.length,
    //data: {	}
    });
};
const deleteUser=(request, response) => {
    console.log(request.requestTime);
    response.status(500).json({
    status: 'error',
    //requestedAt: request.requestTime,
    message: 'not yet implemented'
    //results: toursData.length,
    //data: {	}
    });
};
*/
//-----------------Routes-----------------
/*legacy code code migrated 👇👇
app.get('/api/v1/tours', getAllToursData);// VIE "getAllToursData" is called "Route handler" function.👉'/api/v1/tours' is a route and /tours is the resource that is being asked for. When a client hits this route, we do:- 👉 next arrow function where the next part of the process is undertaken.

app.get('/api/v1/tours/:id',getTour);//Marvel we defined a variable to be passed in route carrying some value each time like page number. To do that, we declared it like ":id"👈😨😵😎😂. It could be like ":keshav". Your wish.

app.post('/api/v1/tours', createTour);//New Element Concept:  all the data being sent by the client to the server is stored in the variable "request". But by default, EXPRESS won't do it, that it, it won't write data on the request variable. Hence to do that, we need a "MIDDLE WARE".

app.patch('/api/v1/tours/:id',updateTour);

app.delete('/api/v1/tours/:id',deleteTour);// this whole code is exactly the same as patch. We only change the name of the function itself 'delete', status code of response to 204 meaning "Server has successfully done the job and the content can't be found anymore" and data value to null "data: null".
*/
// ConceptVIELearnByHeartBut above is a lengthy way to do the job. What if the resource name has to be changed. Then we shall need to do these changes in all of these places. We shall do routing in that case.
//code upgrade👇👇New Element
/*legacy codecode migrated👇👇Concept: here each resource is based on same one router. but if we want to put routers and router function of each type into their own files, we will need to implement multiple routers. So that has been done just below this Lagacy Code.
app
.route('/api/v1/tours')
.get(getAllToursData)
.post(createTour);

app
.route('/api/v1/tours/:id')
.get(getTour).patch(updateTour)
.delete(deleteTour);//Note:When you have a single resource like "tours," you typically have two types of routes: Routes that handle operations on the entire collection (e.g., /api/v1/tours for GET and POST requests) becouse there is no unique id associated with the path, hence it is either looking for all the objects in that resource or wants to create next new object in the same resource.But Routes that handle operations on individual items within the collection come with unique id to identify them (e.g., /api/v1/tours/:id for GET, PATCH, and DELETE requests). By separating them into two app.route() statements, you can better understand the purpose of each group of routes at a glance. It also makes it easier to maintain and modify the routes individually if needed.However, you are correct that you can combine them into a single app.route() statement
app
.route('/api/v1/users')
.get(getAllUsers)
.post(createUser);

app
.route('/api/v1/users/:id')
.get(getOneUser)
.patch(updateUser)
.delete(deleteUser);
*/
//-----------multi-routing and mounting-----------
/* code migrated to tourRouter.js in Routes folder.

const tourRouter = express.Router();//VIENew Element we created new router and now we are going to associate this router with only one kind of resource by using the new Router name in place of "app" and using it like a middleware.Becouse, "tourRouter" in itself is a modular router itself. these two LOC above makes a sub-application or mini-apps within the big app.

tourRouter
.route('/')
.get(getAllToursData)
.post(createTour);
tourRouter
.route('/:id')
.get(getTour).patch(updateTour)
.delete(deleteTour);
//Note(⬆) once we are in the tourRouter middleware, it is going to work on the '/api/v1/tours' path only. So we can avoid writing them again and again. Hence we need to mention only the part that is needed to specify the path and/or the part of the path that is unique with that request being made. '/' means root. that is root of the url '/api/v1/tours' and '/:id' is used becouse parent path + /:id = /api/v1/tours/:id which is exactly what we were trying to write. 😎 
*/
app.use('/api/v1/tours', tourRouter);// this line means that "tourRouter" is a middleware which has to be used for the path '/api/v1/tours'. It is both, middleware and router, we desgined it like this.

/* code migrated to userRoutes.js
const usersRouter = express.Router();//declated new router😎
usersRouter
.route('/')
.get(getAllUsers)
.post(createUser);
usersRouter
.route('/:id')
.get(getOneUser)
.patch(updateUser)
.delete(deleteUser);
*/
app.use('/api/v1/users',userRouter);//turned it a middle ware👺😂😂 VIEConcept this process is called as mounting a new router.  
// LearnByHeart: this whole multirouting and mounting section has to be done before-hand to implement migration of different routers to different files moved in different folders. now these codes will be migrated

//-----------starting a server-----------
/*code migrated to server.js section
const port =3000;
app.listen(port, ()=>{
    console.log(`App is running on port ${port}...`);
});
*/
//-----Exporting app to server file-------
module.exports = app;






