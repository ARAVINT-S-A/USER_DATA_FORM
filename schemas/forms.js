NEWSCHEMA('userdetails',function(schema){
    schema.define('name','Name(20)',true,['enter']);
    schema.define('Email','Email',true),['enter'];
    schema.define('Gender','String(6)',true,['please select ']);
    schema.define('contents','String');
    schema.define('tnc','Boolean',true);
    schema.define('id',UID)(() =>UID());

    schema.setInsert(function($,model){
        // console.log(model); 
        model.dateofentry=NOW;
        model.id=UID();
        NOSQL('userdetails').insert(model).callback(//$.done(model.id)
        );    
        // $.redirect('/thanks')
    })
});
