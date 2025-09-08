const { EntitySchema } = require('typeorm');

module.exports = new EntitySchema({
    name: 'User',
    tableName: 'user',
    columns: {
        id: {
            primary: true,
            type: 'int',
            generated: true
        },
        firstName: {
            type: 'varchar',
            length: 255
        },
        lastName: {
            type: 'varchar',
            length: 255
        },
        age: {
            type: 'int'
        }
    }
});