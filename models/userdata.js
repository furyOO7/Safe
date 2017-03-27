var mongoose = require('mongoose');
var Schema= mongoose.Schema;

var userDataSchema = new Schema({
	siteName: {type : String, required: true},
	siteUrl: {type :  String, required:true},
	sitePassword: {type :  String, required:true},
	userId: {type :  String, required:true}
});
module.exports = mongoose.model('Userdata',userDataSchema);