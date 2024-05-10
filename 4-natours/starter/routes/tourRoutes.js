'use strict';

const express = require('express');
const tourController = require('./../controllers/tourController');
//VIEConcept the imported data is on the name which imported it. like 'tourController' in our case. So to access the data it holds, we have to use "itsname.exportedfunctionORvalues". eg. router.get(tourController.getAllTours). But if you dont want to use this method, look into userRoutes.js method where i have wrote a way to use the names of the exported properties only like old time. 

/* code migrated to tourController.js to apply MVC

const fs = require('fs');

const toursData = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`));

//👇 these are middleware callback function
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
    
    //  legacy code code migrated 👇if (id > toursData.length) {
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
const router= express.Router();//Becouse it's a convention to name a Router as "router" when moving the router to a new file intended to be used like a module.
/* VIERemember ItCode Testingcode upgrade👇👇
router.param('id',(request,response,next,val) => {	
    console.log(`Tour id is: ${val}`);// Code Testing
    next();
	});// this will give output only for tours resources, not the users resource. It is like a bunch of piplelines , sometimes comming together to give service for one particular middleware kind and other times, they remains separate showing different parallel pipes and the water(request, response) can be made to flow from one of the tubes only according to middleware routing setup.  
*/
    router.param('id',tourController.checkID);

//creating a middleware to check the contents of body if name and price property exists. 
router.param('id', tourController.checkBody);
//code upgrade ⬆ const tourRouter = express.Router();//VIENew Element we created new router and now we are going to associate this router with only one kind of resource by using the new Router name in place of "app" and using it like a middleware.Becouse, "tourRouter" in itself is a modular router itself. these two LOC above makes a sub-application or mini-apps within the big app.

router
.route('/')
.get(tourController.getAllToursData)
.post(tourController.checkBody,tourController.createTour);//SuperConceptTake A Good Look middleware chaining.LearnByHeart This will be used very often. 

router
.route('/:id')
.get(tourController.getTour).patch(tourController.updateTour)
.delete(tourController.deleteTour);

module.exports = router;