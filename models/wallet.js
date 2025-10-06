module.exports = (sequelize, { STRING, INTEGER, DATE, TEXT }) => {
     const{INTEGER,STRING,DATE,TEXT} = Sequelize;
    const Wallet = sequelize.define("wallets", {
        id: { primaryKey: true, type: INTEGER, autoIncrement: true },
        hex: { type: STRING, unique: true },
        kind: { type: STRING },
        storeId:{ type: INTEGER, reference: { model: 'stores', key: 'hex' }, defaultValue: null },
        userId: { type: INTEGER, reference: { model: 'users', key: 'hex' } },
        balance: { type: INTEGER, defaultValue: 0 },
        currency: { type: STRING },
        status: { type: STRING, defaultValue: 'active' },
        
    }, {
        timestamps: true,
        tableName: 'wallets',
        indexes: [
            { unique: true, fields: ['hex'] },{ fields: ['kind'] },{ fields: ['storeId'] },{ fields: ['userId'] },
            { fields: ['balance'] },{ fields: ['currency'] },{ fields: ['status'] },
           
        ]
    });

    const Transaction = sequelize.define("transactions", {
        id: { primaryKey: true, type: INTEGER, autoIncrement: true },
        hex: { type: STRING, unique: true },
        walletId: { type: INTEGER, reference: { model: 'wallets', key: 'hex' } },
        amount: { type: INTEGER },
        type: { type: STRING },
        method: { type: STRING },
        reference: { type: STRING },
        status: { type: STRING, defaultValue: 'pending' },

    },{
        timestamps: true,
        tableName: 'transactions',
        indexes:[
            {unique:true,fields:['hex']},{fields:['walletId']},{fields:['amount']},{fields:['type']},
            {fields:['method']},{fields:['reference']},{fields:['status']},{fields:['createdAt']},{fields:['updatedAt']}

        ]
    });

    return{Transaction,Wallet};
}