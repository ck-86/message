Built.initialize('bltfec4086e0f10d942','message');

/*----------------------------------------/
	Creating App Scope
/-----------------------------------------*/
	var App = {};



/*----------------------------------------/
	Validating `user` object and registering
/-----------------------------------------*/

Built.User.validate = function (user, callback) {
	if(!user.first_name) {
		callback.onError("First name is required.");
	} else if(!user.last_name) {
		callback.onError("Last name is required.");
	} else if(!user.email){
		callback.onError("Email is required.");
	} else if(!user.password) {
		callback.onError("Password is required.");
	} else if(!user.password_confirmation) {
		callback.onError("Confirm password field is empty.");
	} else if ( !( user.password === user.password_confirmation) ){
		callback.onError("Password and Confirm Password are different.");
	} else {
		callback.onSuccess(user,"User is valid.");
	}
};

App.registerUser = function (user){
	//Store on built.io
}