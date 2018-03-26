var mongoose = require("mongoose");
var mongoosePaginate = require("mongoose-paginate");

var PoolSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    creator: {
        type: String,
        required: true,
    },
    contributors: {
        type: [String],
        required: true,
    }
});

PoolSchema.plugin(mongoosePaginate);
const Pool = mongoose.model("Pool", PoolSchema);

module.exports = Pool;