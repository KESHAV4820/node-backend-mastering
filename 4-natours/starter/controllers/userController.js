'use strict';
/*
const userData = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/users.json`));
const user= userData.find((element) =>	
    element._id === id);

exports.checkID = (request, response, next, val) => {
    console.log(`User id is: ${val}`);
    
    if(!user){
        return response.status(404).json({
        status: 'fail',
        message: 'invalied ID'
    });};
    next();
};
*/
exports.getAllUsers=(request, response) => {
    console.log(request.requestTime);
    response.status(500).json({
    status: 'error',
    requestedAt: request.requestTime,
    message: 'This route is not defined yet!',
    results: toursData.length,
    //data: {}
    });
};
exports.createUser=(request, response) => {
    console.log(request.requestTime);
    response.status(500).json({
    status: 'error',
    //requestedAt: request.requestTime,
    message: 'route not implemented yet'
    //results: toursData.length,
    //data: {	}
    });
};
exports.getOneUser=(request, response) => {
    console.log(request.requestTime);
    response.status(500).json({
    status: 'error',
    //requestedAt: request.requestTime,
    message: 'this route hasnt been implemented'
    //results: toursData.length,
    //data: { }
    });
};
exports.updateUser=(request, response) => {
    console.log(request.requestTime);
    response.status(500).json({
    status: 'error',
    //requestedAt: request.requestTime,
    message: 'this route hasnt been implemented'
    //results: toursData.length,
    //data: {	}
    });
};
exports.deleteUser=(request, response) => {
    console.log(request.requestTime);
    response.status(500).json({
    status: 'error',
    //requestedAt: request.requestTime,
    message: 'not yet implemented'
    //results: toursData.length,
    //data: {	}
    });
};