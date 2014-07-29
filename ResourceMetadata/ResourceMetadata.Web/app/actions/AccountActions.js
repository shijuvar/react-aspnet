
var AppDispatcher = require('../dispatchers/AppDispatcher');
var AppConstants = require('../constants/AppConstants');

var loginAction = function (payload) {
    AppDispatcher.dispatch(AppConstants.USER_LOGIN, payload);
};

var logOutAction = function (payload) {
    AppDispatcher.dispatch(AppConstants.USER_LOGOUT, payload);
};

var registerAction = function (payload) {
    AppDispatcher.dispatch(AppConstants.USER_REGISTER, payload);
}

var AccountActions = {
    login: loginAction,
    logOut: logOutAction,
    register: registerAction
};
module.exports = AccountActions;