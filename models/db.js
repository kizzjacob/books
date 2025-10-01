const{Sequelize} = require('sequelize');
const{
    data:{name,username,password,host,dialect}
} = require('../configs');

const sequelize = new Sequelize(name, username, password, {
host:host,
dialect:dialect,
port: port || 5432,
operatorsAliases: 0,
pool:{
    max:pool.max || 5,
    min:pool.min || 0,
    acquire:pool.acquire || 30000,
    idle:pool.idle || 10000
},
logging: console.log
});

module.exports = {sequelize,Sequelize};