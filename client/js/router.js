/*-------------------------------------------------------------/
| Router
|--------------------------------------------------------------/
| 
*/
var AppRouter = Backbone.Router.extend({
	routes : {
		"" : "defaultRoute", // Login-Page is our default Route
		"*notFound" : "notFound" //404
	}
});

var appRouter = new AppRouter;

appRouter.on('route:defaultRoute', function() {
	document.title = "Home Page";

	var signupView = new SignupView;
	$('.signup').html( signupView.render().el );

	//$('.signup').html('<h3>Signup</h3>');

	var loginView = new LoginView;
	$('.login').html( loginView.render().el );
});


appRouter.on('route:notFound', function() {
	document.title = "404 - Page Not Found";
	$('.container').html('<h3>404 - Page not found...</h3>');
});

Backbone.history.start();