var mongoose = require("mongoose");
var mongoosePaginate = require("mongoose-paginate");

var PoolSchema = new mongoose.Schema({
    name: String,
});

PoolSchema.plugin(mongoosePaginate);
const Pool = mongoose.model("Pool", PoolSchema);

module.exports = Pool;