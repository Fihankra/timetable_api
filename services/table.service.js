const Table = require('../schemas/tables.schema');


//get tables by year and semester

exports.getTables = async (year, semester) => {
    return await Table.find({ year: year, semester: semester });
}