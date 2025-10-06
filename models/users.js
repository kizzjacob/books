module.exports = (sequelize, Sequelize) => {
    const{INTEGER,STRING,TEXT,DATE} = Sequelize;
    const User = sequelize.define("users", {
        id:{primaryKey:true,type:INTEGER,autoIncrement:true},
        username:{unique:true,type:STRING},
        name: { type: STRING },
        phone: { type: STRING },
        email: { type: STRING, unique: true },
        password: { type: STRING },
    },{
        timestamps: true,
        tableName: 'users',
        indexes:[
            {unique:true,fields:['email',]},{unique:true,fields:['username']},{fields:['name']},
            {fields:['createdAt']},{fields:['updatedAt']},{fields:['phone']},
        ]
    });

    const Role = sequelize.define("roles", {
        id:{primaryKey:true,type:INTEGER,autoIncrement:true},
        hex: { type: STRING, unique: true },
        name: { type: STRING, unique: true },
        privileges: { type: TEXT },
        user: { type: INTEGER,reference:{model:'users',key:'id'} },
        expiry: { type:DATE, defaultValue: null },
    },{
        timestamps: true,
        tableName: 'roles',
        indexes:[
            {unique:true,fields:['hex']},{unique:true,fields:['name']},{fields:['user']},
            {fields:['createdAt']},{fields:['updatedAt']},{fields:['expiry']},{fields:['privileges']}
        ]
    });

    const Address = sequelize.define("addresses", {
        id:{primaryKey:true,type:INTEGER,autoIncrement:true},
        hex: { type: STRING, unique: true },
        user: { type: INTEGER,reference:{model:'users',key:'id'} },
        city: { type: STRING },
        state: { type: STRING },
        country: { type: STRING },
        building: { type: STRING },
        coordinates: { type: STRING },
    },{
        timestamps: true,
        tableName: 'addresses',
        indexes:[
            {unique:true,fields:['hex']},{fields:['user']},{fields:['city']},{fields:['state']},
            {fields:['country']},{fields:['createdAt']},{fields:['updatedAt']},{fields:['building']},
            {fields:['coordinates']}
        ]
    });
    
   
    return { User, Role,Address };
}