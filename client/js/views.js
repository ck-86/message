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

		if(user.email && user.password){

			// Show preloader
			$('.login').append( showProgressbar(50) );
		} else {
			alert('Email and Password is required to login.');
		}
		

		Built.User.login(user.email, user.password, {
			onSuccess : function(data, res){
				if(res.status === 200){
					$('.notification').remove();
					Backbone.history.navigate("#/compose");
				}
			},

			onError : function(error) {
				$('.notification').remove();
				alert(error.errors.errors[0]);
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
		// $('.signup').html('Loading...');

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

/*-------------------------------------------------------------/
| Sidebar View
|--------------------------------------------------------------/
| Sidebar View with options
*/

var SidebarView = Backbone.View.extend({
	template : getTemplate('sidebarTemplate'),

	render: function(){
		this.$el.html( this.template() );
		return this;
	}
});

/*-------------------------------------------------------------/
| Compose Message Template
|--------------------------------------------------------------/
| Renders the Message textarea
*/

var ComposeView = Backbone.View.extend({

	initialize: function(){
		console.log(this.model);
	},

	template : getTemplate('composeTemplate'),

	render: function() {
		this.$el.html( this.template(this.model) );
		return this;
	},

	events : {
		'click .send' : 'send'
	},

	send: function(e){
		e.preventDefault();
		var messageObject = {
			'message_creator_uid' : Built.User.getCurrentUser().uid,
			'message_body' : $('#message_body').val()
		};
		
		var message = new Message;
		message.set(messageObject); // Setting Value
		message.save({
			onSuccess : function(data) {
				alert('1 Message Sent.');
				$('#message_body').val('');
			},
			onError : function(error) {
				console.log(error);
			}
		});
	}

});