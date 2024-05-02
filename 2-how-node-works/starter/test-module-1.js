/*
class Calculator{
    add(a,b){
        return a+b;
    };
    subtract(a,b){

        return a-b;
    };
    multiply(a,b){
        return a*b;
    };
    divide(a,b){

        return a/b;
    };
};

module.exports = Calculator;// we actually exporting a class
*/

// the same can be done with using named class. 

module.exports = class{
    add(a,b){
        return a+b;
    };
    subtract(a,b){
        return a-b;
    };
    multiply(a,b){
        return a*b;
    };
    divide(a,b){
        return a/b;
    };
};

