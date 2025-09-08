const { EntitySchema } = require("typeorm");

module.exports.BorrowRecord = new EntitySchema({
    name: "BorrowRecord",
    tableName: "borrow_records",
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true
        },
        book_id: { 
            type: "int" 
        },
        member_id: { 
            type: "int" 
        },
        returned: { type: "boolean", default: false }
    }
});