/*-------------------------------------------------------------/
| Router
|--------------------------------------------------------------/
| 
*/
var AppRouter = Backbone.Router.extend({
	routes : {
		"" : "loginRoute", // Login-Page is our default Rout
		"login"	: "loginRoute",
		"signup" : "signupRoute",
		"*notFound" : "notFound"
	}
});

var appRouter = new AppRouter;

appRouter.on('route:loginRoute', function () {
	var loginView = new LoginView;
	$('.container').html( loginView.render().el );
});

appRouter.on('route:signupRoute', function () {
	var signupView = new SignupView;
	$('.container').html( signupView.render().el );
});

appRouter.on('route:notFound', function() {
	$('.container').html('<h3>404 - Page not found...</h3>');
});

Backbone.history.start();