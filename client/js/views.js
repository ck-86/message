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
		var user = {
			email : $.trim( $('#login_email').val() ),
			password : $.trim( $('#login_password').val() ),
		};

		// Show preloader
		$('.login').html('Loading...');

		Built.User.login(user.email, user.password, {
			onSuccess : function(data, res){
				if(res.status === 200){
					$('.login').html('User Logged In');
				}
			},

			onError : function(error) {
				console.log(error);
			}
		});
	}
});

/*-------------------------------------------------------------/
| Signup From View
|--------------------------------------------------------------/
| User Registeration Form
*/
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
		
		//Getting Values from the form
		var user = {
			first_name : $.trim( $('#first_name').val() ),
			last_name : $.trim( $('#last_name').val() ),
			email : $.trim( $('#email').val() ),
			password : $.trim( $('#password').val() ),
			password_confirmation : $.trim( $('#password_confirmation').val() ),
			active : true
		};

		// Show preloader
		$('.signup').html('Loading...');

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
						// Remove sign-up form
						$(".signup").children().fadeOut();

						var message = "<strong>You have successfully completed registeration.</strong>\
						<p>Please check your email and activate your account.</p>\
						<p><a href='#/login'>Click Here To Login</a></p>";

						// Show Successful Sign-up message
						$(".signup").html( message );
					},
					onError : function(error) {
						//User registeration error
						if(error.errors.email) {
							alert('Email ' + error.errors.email );
						}
					}
				})
			},
			onError : function(error) {
				//Validation Error
				alert(error);
			}
		});
	}
});