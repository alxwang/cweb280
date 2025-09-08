const { EntitySchema } = require("typeorm");

module.exports.Book = new EntitySchema({
    name: "Book",
    tableName: "books",
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true
        },
        title: { 
            type: "varchar" 
        },
        isAvailable: { 
            type: "boolean", default: true 
        },
    }
});