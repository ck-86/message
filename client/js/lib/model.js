/*-------------------------------------------------------------/
| Model
|--------------------------------------------------------------/
| 
*/

var User = Backbone.Model.extend({
	validate: function(attributes){
		console.log(attributes);
	}
});