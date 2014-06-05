/*-------------------------------------------------------------/
| Router
|--------------------------------------------------------------/
| 
*/
var AppRouter = Backbone.Router.extend({
	routes : {
		"" : "defaultRoute", // Login-Page is our default Route
		"compose" : "composeRoute",
		"users(/:email)" : "usersRoute",
		"*notFound" : "notFound" //404
	}
});

var appRouter = new AppRouter;

appRouter.on('route:defaultRoute', function() {
	document.title = "Home Page";

	//Clear Previous View
	$('.row').html('');

	var signupView = new SignupView;
	$('.row').append( signupView.render().el );

	var loginView = new LoginView;
	$('.row').append( loginView.render().el );
});

appRouter.on('route:composeRoute', function() {
	document.title = "Compose New Message"

		/*----------------------------------------/
			Get User UID, Email from Auth Token
			And Set those value in Header
		/-----------------------------------------*/
		var currentUser = Built.User.getCurrentUser();
		if(currentUser) {
			//Clear Previous View
			$('.row').html('');

			var sidebarView = new SidebarView;
			$('.row').append( sidebarView.render().el );

			var composeView = new ComposeView( { model : Built.User.getCurrentUser() } );
			$('.row').append( composeView.render().el );

			var recipientControl = new RecipientControl;
		}
});


appRouter.on('route:notFound', function() {
	document.title = "404 - Page Not Found";

	//Clear Previous View
	$('.row').html('');

	$('.row').html('<h3>404 - Page not found...</h3>');
});


appRouter.on('route:usersRoute', function(email) {
	document.title = "Users";
	window.users = []; //Array list of all users
});

Backbone.history.start();