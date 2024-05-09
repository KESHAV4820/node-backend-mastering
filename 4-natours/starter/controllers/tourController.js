'use strict';
//1️⃣since these functions has to be exported to other moudules for their use, each function is exported by removing 'const' declaration and  using exports.functionname=blahs..blah.. 
//2️⃣ now this folder will be imported in tourRoutes.js
const fs = require('fs');


const toursData = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`));

//👇 these are middleware callback function
exports.getAllToursData=(request, response) => {
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
exports.getTour=(request, response) => {
    console.log(request.params);//New Element Output: {id: '5'}
//app.get('/api/v1/tours/:id/:id2?/:id3?',(request,
    //VIEConcept 'request.params' is a very important object. It maps the value that was passed by client into our variable. Here 5. but if you have multiple variable which needs to be fed data and if you miss anyone, your routing breaks. Hence you need a way to make it optional. YOu do that by adding a "?"after the variable name.
    const id = request.params.id *1;
    
    /* legacy code code migrated 👇if (id > toursData.length) {
        return response.status(404).json({
            status: 'fail',
            message: 'Invalid ID entered'
        });
    }// for checking if the id is valied. This same logic can be applied using tour👇 value. It will be null if the id doesn't exist. It is more efficient. Becouse it is possible that due to garbage values, the length can be that big. 
    */
    
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
exports.createTour=(request, response) => {	
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
exports.updateTour=(request, response) => {	if (request.params.id *1 > toursData.length) {
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
exports.deleteTour=(request, response) => {	if (request.params.id *1 > toursData.length) {
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