const { EntitySchema } = require("typeorm");

module.exports.Member = new EntitySchema({
    name: "Member",
    tableName: "members",
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true
        },
        name: {
            type: "varchar"
        }
    }
});