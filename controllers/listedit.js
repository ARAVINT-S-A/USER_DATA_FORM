exports.install = function(){
    ROUTE("GET /listedit",fun8);
}
function fun8(){
    var self=this;
    NOSQL('userdetails').find().callback(function(err,response){
        this.json(response[response.length-1]);
        // this.views("listedit",{lastrecord:response[response.length-1]});
        //this.layout("layout");
    }.bind(self))
}