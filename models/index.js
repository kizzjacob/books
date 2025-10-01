const{sequelize,Sequelize} = require('./db');

// import models
const{Customer,Publisher,Author} = require('./users')(sequelize,Sequelize);
const{ Book,Genre,Order,OrderItem,Payment} = require('./books')(sequelize,Sequelize);

// function to synchronize models with database
const syncModels = async () => {
    const models = [Customer, Publisher, Author, Book, Genre, Order, OrderItem, Payment];
    let needsSync = false;

    // 1. Check for all tables
    for (const model of models) {
        const tableName = model.tableName || model.name; // Get the correct table name

        const tableExists = await sequelize.query(
            // Use the correct variable
            `SELECT to_regclass('${tableName}') as to_regclass;` 
        ).then(result => result[0][0].to_regclass !== null).catch(() => false);

        if (!tableExists) {
            console.log(`Table ${tableName} does not exist.`);
            needsSync = true;
            // Don't create yet, just mark that a sync is needed
        } else {
             console.log(`Table ${tableName} exists.`);
        }
    }

    // 2. Perform synchronization if needed (or just run it once for everything)
    if (needsSync) {
        // A single sequelize.sync() call is often more efficient than model.sync() in a loop
        await sequelize.sync({ alter: true }); 
        console.log('All missing models were synchronized successfully.'); 
    }
};