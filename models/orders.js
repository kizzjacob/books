module.exports = (sequelize, Sequelize) => {
    const{INTEGER,STRING,TEXT,DATE} = Sequelize;
    const Order = sequelize.define("orders", {
        id:{primaryKey:true,type:INTEGER,autoIncrement:true},
        hex: { type: STRING, unique: true },
        userId: { type: INTEGER,reference:{model:'users',key:'username'} },
        totalAmount: { type: INTEGER },
        status: { type: STRING },
    },{
        timestamps: true,
        tableName: 'orders',
        indexes:[
            {unique:true,fields:['hex']},{fields:['userId']},{fields:['totalAmount']},{fields:['status']},
            {fields:['createdAt']},{fields:['updatedAt']}
        ]
    });
    const OrderItem = sequelize.define("order_items", {
        id:{primaryKey:true,type:INTEGER,autoIncrement:true},
        orderId: { type: INTEGER,reference:{model:'orders',key:'hex'} },
        bookId: { type: INTEGER,reference:{model:'books',key:'hex'} },
        quantity: { type: INTEGER },
        price: { type: INTEGER },
    },{
        timestamps: true,
        tableName: 'order_items',
        indexes:[
            {fields:['orderId']},{fields:['bookId']},{fields:['quantity']},{fields:['price']},
            {fields:['createdAt']},{fields:['updatedAt']}
        ]
    });
    const Delivery = sequelize.define("deliveries", {
        id:{primaryKey:true,type:INTEGER,autoIncrement:true},
        orderId: { type: INTEGER,reference:{model:'orders',key:'hex'} },
        address: { type: STRING },
        amount: { type: INTEGER },
        StationId: { type: INTEGER,reference:{model:'stations',key:'hex'} },
        kind: { type: STRING },
        deliveryDate: { type: DATE },
        status: { type: STRING },
    },{
        timestamps: true,
        tableName: 'deliveries',
        indexes:[
            {fields:['orderId']},{fields:['address']},{fields:['amount']},{fields:['StationId']},
            {fields:['kind']},{fields:['deliveryDate']},{fields:['status']},{fields:['createdAt']},{fields:['updatedAt']}
        ]
    });
    const Deliverer = sequelize.define("deliverers", {
        id:{primaryKey:true,type:INTEGER,autoIncrement:true},
        hex: { type: STRING, unique: true },
        user: { type: INTEGER,reference:{model:'users',key:'username'} },
        name: { type: STRING },
        phone: { type: STRING },
        vehicle: { type: STRING },
        status: { type: STRING },
        location: { type: STRING },
    },{
        timestamps: true,
       tableName: 'deliverers',
         indexes:[
            {unique:true,fields:['hex']},{fields:['user']},{fields:['name']},{fields:['phone']},
            {fields:['vehicle']},{fields:['status']},{fields:['location']},{fields:['createdAt']},{fields:['updatedAt']}
         ]
    });
    const Station = sequelize.define("stations", {
        id:{primaryKey:true,type:INTEGER,autoIncrement:true},
        hex: { type: STRING, unique: true },
        name: { type: STRING },
        coordinates: { type: STRING },
        desc: { type: TEXT },
    },{
        timestamps: true,
        tableName: 'stations',
        indexes:[
            {unique:true,fields:['hex']},{fields:['name']},{fields:['coordinates']},
            {fields:['createdAt']},{fields:['updatedAt']}
        ]
    });
    const Payment = sequelize.define("payments", {
        id:{primaryKey:true,type:INTEGER,autoIncrement:true},
        orderId: { type: INTEGER,reference:{model:'orders',key:'hex'} },
        amount: { type: INTEGER },
        method: { type: STRING },
        transactionId: { type: STRING, reference: { model: 'transactions', key: 'hex' } },
    },{
        timestamps: true,
        tableName: 'payments',
        indexes:[
            {fields:['orderId']},{fields:['amount']},{fields:['method']},{fields:['transactionId']},
            {fields:['createdAt']},{fields:['updatedAt']}
        ]
    });
    return { Order, OrderItem,Delivery,Deliverer,Station,Payment };
}