

function exec(dispatch){
    (function(){
        return 1;
    })();
    return 2;
}
let result = exec();
console.log(result)