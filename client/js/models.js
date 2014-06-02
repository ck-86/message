/*-------------------------------------------------------------/
| Model
|--------------------------------------------------------------/
| 
*/

var User = Backbone.Model.extend({

	defaults:{
		firstName : '',
		lastName : '',
		email : '',
		password : '',
		passwordConfirm : ''
	},

	validate: function(attr){
		if(!attr.firstName) { 
			console.log('First Name is required');
			return 'First Name is required';
		}

		else if(!attr.email) {
			console.log('Email is required');
			return 'Email is required';
		}

		else if(!attr.password) {
			console.log('Password is required');
			return 'Password is required';
		}
		else if( !(attr.password === attr.passwordConfirm) ) {
			console.log('Password and Confirm Password are not same.');
			return 'Password and Confirm Password are not same.';
		};
	}
});