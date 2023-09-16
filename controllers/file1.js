exports.install = function(){
    ROUTE("GET /",fun1);
}
function fun1(){
    this.view("index",{name:"", hidden:"1"});
    this.layout("layout");
}