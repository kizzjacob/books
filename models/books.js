module.exports = (sequelize, Sequelize) => {
    const{INTEGER,STRING,TEXT,DATE} = Sequelize;
    const Book = sequelize.define("books", {
        id:{primaryKey:true,type:INTEGER,autoIncrement:true},
        title: { type: Sequelize.STRING },
        isbn: { type: Sequelize.STRING },
        picture: { type: Sequelize.STRING },
        description: { type: Sequelize.TEXT },
        price: { type: Sequelize.INTEGER },
        stock: { type: Sequelize.INTEGER },
        author: { type: Sequelize.INTEGER,reference:{model:'authors',key:'id'} },
        publisher: { type: Sequelize.INTEGER,reference:{model:'publishers',key:'id'} },
    },{
        timestamps: true,
        schema: '',
        tableName: 'books',
        indexes:[
            {unique:true,fields:['isbn']},{fields:['title']},{fields:['author']},
            {fields:['publisher']},{fields:['price']},{fields:['stock']},
            {fields:['createdAt']},{fields:['updatedAt']}
        ]
    });

    const Genre = sequelize.define("genre", {
        id:{primaryKey:true,type:INTEGER,autoIncrement:true},
        name: { type: Sequelize.STRING }, 
    },{
        timestamps: true,
        tableName: 'genres',
        indexes:[
            {unique:true,fields:['name']},{fields:['createdAt']},{fields:['updatedAt']}
        ]
    });

    const Order = sequelize.define("order", {
        id:{primaryKey:true,type:INTEGER,autoIncrement:true},
        customer: { type: Sequelize.INTEGER,reference:{model:'customers',key:'id'} },
        totalAmount: { type: Sequelize.INTEGER, defaultValue: 0 },
        status: { type: Sequelize.STRING, defaultValue: 'pending' },
        date: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
        shippingMethod: { type: Sequelize.STRING },
    },{
        timestamps: true,
        tableName: 'orders',
        indexes:[
            {fields:['customer']},{fields:['status']},{fields:['date']},
            {fields:['createdAt']},{fields:['updatedAt']},{fields:['shippingMethod']}
            ,{fields:['totalAmount']}
        ]
    });
    const OrderItem = sequelize.define("orderItem", {
        id:{primaryKey:true,type:INTEGER,autoIncrement:true},
        orderId: { type: Sequelize.INTEGER,reference:{model:'orders',key:'id'} },
        bookId: { type: Sequelize.INTEGER,reference:{model:'books',key:'id'} },
        quantity: { type: Sequelize.INTEGER, defaultValue: 1 },
        price: { type: Sequelize.INTEGER, defaultValue: 0 },
    },{
        timestamps: true,
        tableName: 'orderItems',
        indexes:[
            {fields:['createdAt']},{fields:['updatedAt']},{fields:['price']},{fields:['quantity']}
        ]
    });
    const Payment = sequelize.define("payment", {
        id:{primaryKey:true,type:INTEGER,autoIncrement:true},
        transactionId: { type: Sequelize.STRING, unique: true },
        orderId: { type: Sequelize.INTEGER,reference:{model:'orders',key:'id'} },
        amount: { type: Sequelize.INTEGER },
        paymentMethod: { type: Sequelize.STRING },
        paymentDate: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
        status: { type: Sequelize.STRING, defaultValue: 'completed' },
    
    },{
        timestamps: true,
        tableName: 'payments',
        indexes:[
            {unique:true,fields:['transactionId']},{fields:['orderId']},{fields:['amount']},
            {fields:['paymentMethod']},{fields:['paymentDate']},{fields:['status']},
            {fields:['createdAt']},{fields:['updatedAt']},
        ]
    });
        return{ Book,Genre,Order,OrderItem,Payment };
}