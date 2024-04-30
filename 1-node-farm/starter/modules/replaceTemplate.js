'use strict';

//👇 this function has no name. It's annonymous. Becouse the name has been used to declare a module so that the function can be used by the name of the module.😎
module.exports=(temp,product)=>{
    let output= temp.replace(/{%PRODUCTNAME%}/g,product.productName);//New Element "/{%PRODUCTNAME%}/g" is used to replace at all the places. That's why we used regular expression by wrapping it with / and / and used "g" as global flag to replace at all positions.
    output=output.replace(/{%IMAGE%}/g,product.image);
    output=output.replace(/{%PRICE%}/g,product.price);
    output=output.replace(/{%FROM%}/g,product.from);
    output=output.replace(/{%NUTRIENTS%}/g,product.nutrients);
    output=output.replace(/{%QUANTITY%}/g,product.quantity);
    output=output.replace(/{%DESCRIPTION%}/g,product.description);
    output=output.replace(/{%ID%}/g,product.id);
    if(!product.organic) output=output.replace(/{%NOT_ORGANIC%}/g,'not-organic');
    return output;
    }