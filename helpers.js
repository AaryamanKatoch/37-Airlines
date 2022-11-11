//You can add and export any helper functions you want here. If you aren't using any, then you can just leave this file as is.
//You can add and export any helper functions you want here. If you aren't using any, then you can just leave this file as is.
async function checkifinputexists(vari) {
    if(!vari)
    throw "No input is provided inn some field";
}

async function checkifstring(vari){
    if(typeof(vari)!=="string")
    throw 'Input is not a string';
}

async function checkifemptystring(vari){
if(vari.trim().length===0)
throw "string cant be empty or all white spaces";

}

async function checkifarray(vari){
    if(!Array.isArray(vari))
    throw "input is not array";
}


