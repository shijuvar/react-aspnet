var $ = require('jquery-browserify');
var ApplicationStore = require('app/stores/ApplicationStore');
var AppDispatcher = require('app/dispatchers/AppDispatcher');
var AppConstants = require('app/constants/AppConstants');
var config = require('../../../config');

var accountUrl = config.apiurl + "Account";
var loginUrl = config.loginurl;

var login = function (login) {
    var entity = AccountStore.buildFormData(login);
    $.post(loginUrl, entity).done(function (data, statusText, xhr) {
        ApplicationStore.AccessToken = data.access_token;
        this.Entity = { Data: null, Status: AppConstants.RETRIEVED };
        this.emit(AppConstants.STORE_CHANGE);
    }.bind(AccountStore))
    .fail(function (xhr) {

        var message = "An error occured while performing your request. Please try after some time";

        if (xhr.status === 400) {
            message = "Invalid Email/Password";
        }

        this.Error = { Message: message, StatusCode: xhr.status };
        this.emit(AppConstants.STORE_ERROR);
    }.bind(AccountStore));
};




function register(user) {
    var successCallback = function (data, statusText, xhr) {
        login({ username: user.Email, password: user.Password, grant_type: "password" });
    }.bind(AccountStore);

    var failureCallback = function (xhr) {
        this.Error = { Message: "An error occured while performing your request. Please try after some time", StatusCode: xhr.status };
        this.emit(AppConstants.STORE_ERROR);
    }.bind(AccountStore);

    AccountStore.postJson(accountUrl, user, successCallback, failureCallback);
};

function logOut(payload) {
    ApplicationStore.AccessToken = null;
    AccountStore.emit(AppConstants.STORE_CHANGE);
}

var AccountStore = function () {
    var store = new ApplicationStore();
    store.getState = function () {
        return {
            Result: null,
            Error: this.Error
        };
    },
    store.getErrorState = function () {
        return this.Error;
    }

    return store;
}();

AppDispatcher.register(function (actionType, payload) {
    switch (actionType) {
        case AppConstants.USER_LOGIN: {
            login(payload);
            break;
        }
        case AppConstants.USER_LOGOUT: {
            logOut(payload);
            break;
        }
        case AppConstants.USER_REGISTER: {
            register(payload);
            break;
        }
        default: {
            break;
        }
    }
});



module.exports = AccountStore;



