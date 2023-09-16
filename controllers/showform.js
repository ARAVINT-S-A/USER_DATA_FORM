// const { response } = require("total4/cluster");

exports.install = function(){
    ROUTE("POST /showform",fun3);
}
function fun3(){
    var CURRENT_CONTROLLER=this;
    let data=CURRENT_CONTROLLER.body;
    let myname=data.name;
    NOSQL('userdetails').find().where('name',myname).callback(function(err,response){
        console.log(response);
        this.header("Content-Type",'application/json');
        this.json(response);
        // if(response){
        //     this.view("viewforms",{querydata:response,submit:0})
        //     this.layout("layout");
        // }
        // else{
        //     this.json("not present");
        //     this.layout("layout");
        // }
    }.bind(CURRENT_CONTROLLER))
}