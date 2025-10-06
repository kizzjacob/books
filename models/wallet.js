  // ...existing code...
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