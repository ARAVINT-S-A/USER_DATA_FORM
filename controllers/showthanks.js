exports.install = function(){
    ROUTE("GET /thanks",fun6);
}
function fun6(){
    let self=this;
    const responseData ={ name: self.query.name, hidden:0};
    self.header('Content-Type', 'application/json');
    // self.json(responseData);

    this.view("index",{name:self.query.name});
    this.layout("layout");
}