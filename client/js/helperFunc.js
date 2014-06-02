/*----------------------------------------/
	Shows Login Form Template	
/-----------------------------------------*/
var showLoginForm = function() {
	var loginView = new LoginView;
	$('.container').html( loginView.render().el );
};
