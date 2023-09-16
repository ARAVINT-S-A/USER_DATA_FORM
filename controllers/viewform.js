const { response } = require("total4/cluster");

exports.install = function(){
    ROUTE("GET /view",fun3);
}
function fun3(){
    this.view('viewforms',{submit:1});
    this.layout('layout');
}