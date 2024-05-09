'use strict';


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