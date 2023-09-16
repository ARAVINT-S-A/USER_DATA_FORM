exports.install = function(){
    ROUTE("GET /home",fun7);
}
function fun7(){
    this.view("index",{hidden:1});
    this.layout("layout");
}