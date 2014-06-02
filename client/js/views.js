		//--- Template Helper ---//
		window.getTemplate = function(id) {
			return _.template( $('#' + id).html() );
		}

		function UserException(message) {
   			this.message = message;
   			this.name = "UserException";
		}

/*-------------------------------------------------------------/
| Login View
|--------------------------------------------------------------/
| Show login template
*/
var LoginView = Backbone.View.extend({

	className : 'loginForm',

	template: getTemplate('loginTemplate'),

	render : function() {
		this.$el.html( this.template() );
		return this;
	},

	events: {
		'submit' : 'submit'
	},

	submit: function(e) {
		e.preventDefault();
		console.log('Login....');
	}
});


//--- FormView ---//
var SignupView = Backbone.View.extend({
	template : getTemplate('signupTemplate'),

	render: function() {
		this.$el.html( this.template() );
		return this;
	},

	events: {
		'submit' : 'submit'
	},

	submit: function(e) {
		e.preventDefault();
		
		//Creating User Object & trimming whitespaces 
		var user = {
			first_name : $.trim( $('#first_name').val() ),
			last_name : $.trim( $('#last_name').val() ),
			email : $.trim( $('#email').val() ),
			password : $.trim( $('#password').val() ),
			password_confirmation : $.trim( $('#password_confirmation').val() )
		};

		//Validating user object
		App.validateUser(user, { 
			onSuccess : function(data, res) {
				console.log(res);
				console.log(data);
			},
			onError : function(error) {
				console.log(error);
			}
		});
	}
});