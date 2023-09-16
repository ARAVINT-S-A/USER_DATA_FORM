exports.install = function(){
    ROUTE("post /modifydb",fun5);
}
function fun5(){
	var self = this;
    let data=self.body;
    console.log(data);
    if(!data.tnc)
    {
        self.throw500("agree to tnc");
    }
    else{
    NOSQL('userdetails').remove().where("id",data.id)
    EXEC('+userdetails-->insert', data ,function(err, response) {
        console.log(err, response);
    });


    this.redirect('/thanks'+"?name="+self.body.name,true);
    }
}