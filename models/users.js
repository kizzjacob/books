module.exports = (sequelize, Sequelize) => {
    const {INTEGER,STRING,TEXT} = Sequelize;
    const Customer = sequelize.define("customer", {
        id:{primaryKey:true,type:INTEGER,autoIncrement:true},
        firstName: { type: Sequelize.STRING },
        lastName: { type: Sequelize.STRING },
        email: { type: Sequelize.STRING },
        password: { type: Sequelize.STRING },
        phone: { type: Sequelize.STRING },
        shippingAddress: { type: Sequelize.STRING },
        billingAddress: { type: Sequelize.STRING },
    },{
        timestamps: true,
        tableName: 'customers',
        indexes:[
            {unique:true,fields:['email']},{fields:['lastName']},{fields:['firstName']},
            {fields:['phone']},{fields:['createdAt']},{fields:['updatedAt']},{fields:['shippingAddress']},
            {fields:['billingAddress']},
        ]
    });

    const Publisher = sequelize.define("publisher", {
        id:{primaryKey:true,type:INTEGER,autoIncrement:true},
        firstName: { type: Sequelize.STRING },
        lastName: { type: Sequelize.STRING },
        email: { type: Sequelize.STRING },
        phone: { type: Sequelize.STRING },
        address: { type: Sequelize.STRING },
    },{
        timestamps: true,
        tableName: 'publishers',
        indexes:[
            {unique:true,fields:['email']},{fields:['lastName']},{fields:['firstName']},
            {fields:['phone']},{fields:['createdAt']},{fields:['updatedAt']},{fields:['address']},
        ]
    });
    const Author = sequelize.define("author", {
        id:{primaryKey:true,type:INTEGER,autoIncrement:true},
        firstName: { type: Sequelize.STRING },
        lastName: { type: Sequelize.STRING },
        email: { type: Sequelize.STRING },
        phone: { type: Sequelize.STRING },
        bio: { type: Sequelize.TEXT },
    },{
        timestamps: true,
        tableName: 'authors',
        indexes:[
            {unique:true,fields:['email']},{fields:['lastName']},{fields:['firstName']},
            {fields:['phone']},{fields:['createdAt']},{fields:['updatedAt']},
        ]
    });
    

    return{ Customer,Publisher,Author };
};