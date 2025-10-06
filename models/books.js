module.exports = (sequelize, Sequelize) => {
    const{INTEGER,STRING,TEXT,DATE} = Sequelize;

    const Store = sequelize.define("stores", {
        id:{primaryKey:true,type:INTEGER,autoIncrement:true},
        hex: { type: STRING, unique: true },
        name: { type: STRING },
        address: { type: STRING },
        phone: { type: STRING },
        email: { type: STRING,unique: true },
       established: { type: DATE },
       owner: { type: INTEGER,reference:{model:'users',key:'id'} },
    },{
        timestamps: true,
        tableName: 'stores',
        indexes:[
            {unique:true,fields:['hex']},{unique:true,fields:['email']},{fields:['name']},{fields:['address']},
            {fields:['phone']},{fields:['email']},{fields:['established']},{fields:['owner']},
            {fields:['createdAt']},{fields:['updatedAt']}
        ]
    });
    const Book = sequelize.define("books", {
        id:{primaryKey:true,type:INTEGER,autoIncrement:true},
        hex: { type: STRING, unique: true },
        picture: { type: Array(STRING), defaultValue: [] },
        title: { type: STRING },
        desc: { type: TEXT },
        isbn: { type: STRING, unique: true },
        genre: { type: STRING },
        tags: { type: STRING },
    },{
        timestamps: true,
        tableName: 'books',
        indexes:[
            {unique:true,fields:['hex']},{unique:true,fields:['isbn']},{fields:['title']},{fields:['genre']},
            {fields:['tags']},{fields:['createdAt']},{fields:['updatedAt']},
        ]
    });
    const Author = sequelize.define("authors", {
        id:{primaryKey:true,type:INTEGER,autoIncrement:true},
        hex: { type: STRING, unique: true },
        name: { type: STRING },
        bio: { type: TEXT },
        birthdate: { type: DATE },
    },{
        timestamps: true,
        tableName: 'authors',
        indexes:[
            {unique:true,fields:['hex']},{fields:['name']},{fields:['birthdate']},
            {fields:['createdAt']},{fields:['updatedAt']}
        ]
    });
    const BookAuthor = sequelize.define("book_authors", {
        id:{primaryKey:true,type:INTEGER,autoIncrement:true},
        bookId: { type: INTEGER, reference: { model: 'books', key: 'hex' } },
        authorId: { type: INTEGER, reference: { model: 'authors', key: 'hex' } },

    },{
        timestamps: true,
        tableName: 'book_authors',
        indexes:[
            {fields:['bookId']},{fields:['authorId']},{fields:['createdAt']},{fields:['updatedAt']}
        ]
    });
    const Publisher = sequelize.define("publishers", {
        id:{primaryKey:true,type:INTEGER,autoIncrement:true},
        hex: { type: STRING, unique: true },
        name: { type: STRING, unique: true },
        bookId: { type: INTEGER, reference: { model: 'books', key: 'hex' } },
        address: { type: STRING },
        phone: { type: STRING },
        email: { type: STRING, unique: true },
        website: { type: STRING },
        established: { type: DATE },
    },{
        timestamps: true,
        tableName: 'publishers',
        indexes:[
            {unique:true,fields:['hex']},{unique:true,fields:['name']},{unique:true,fields:['email']},
            {fields:['bookId']},{fields:['address']},{fields:['phone']},{fields:['website']},
        ]
    });
    return { Store, Book, Author, BookAuthor,Publisher };
}