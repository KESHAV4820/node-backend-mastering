const express = require('express');

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
const router=express.Router();// it is convention to name the router as "router" while making a module for it. 
//const usersRouter = express.Router();//declated new router😎
router
.route('/')
.get(getAllUsers)
.post(createUser);

router
.route('/:id')
.get(getOneUser)
.patch(updateUser)
.delete(deleteUser);

module.exports= router;