		//--- Template Helper ---//
		window.getTemplate = function(id) {
			return _.template( $('#' + id).html() );
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

		/*-------------------------------------------------------------
			Custom `validate` function checks the user object values
		-------------------------------------------------------------*/
		Built.User.validate(user, { 
			onSuccess : function(data, res) {
				/*--------------------------------------------
					On Successful validation `register` user
					using `Built.User.register()` method
				--------------------------------------------*/
				Built.User.register(data, {
					onSuccess : function(data, res) {
						alert('User Created Successfully!');
					},
					onError : function(error) {
						//Alert user registration error
						alert(error.error_message);
					}
				})
			},
			onError : function(error) {
				//Alert Validation Error
				alert(error);
			}
		});
	}
});