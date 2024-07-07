const user = require('./user');
const slider = require('./slider');
const lesson = require('./lesson');
for(let key in user){
    exports[key]=user[key];
}
for(let key in slider){
    exports[key]=slider[key];
}
for(let key in lesson){
    exports[key]=lesson[key];
}