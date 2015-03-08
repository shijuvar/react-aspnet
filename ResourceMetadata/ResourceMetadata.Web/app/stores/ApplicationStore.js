var EventEmitter = require('events').EventEmitter;
var $ = require('jquery-browserify');
var AppConstants = require("app/constants/AppConstants");

var ApplicationStore = function () {
    this.AccessToken = ""; //to be set from Account Login
};

ApplicationStore.prototype.addSuccessListner = function (callback) {
    this.addListener(AppConstants.STORE_CHANGE, callback);
};
ApplicationStore.prototype.removeSuccessListner = function (callback) {
    this.removeListener(AppConstants.STORE_CHANGE, callback);
};

ApplicationStore.prototype.addChangeListner = function (callback) {
    this.addListener(AppConstants.STORE_CHANGE, callback);
};
ApplicationStore.prototype.removeChangeListner = function (callback) {
    this.removeListener(AppConstants.STORE_CHANGE, callback);
};

ApplicationStore.prototype.addFailureListner = function (callback) {
    this.addListener(AppConstants.STORE_ERROR, callback);
};
ApplicationStore.prototype.removeFailureListner = function (callback) {
    this.removeListener(AppConstants.STORE_ERROR, callback);
};

ApplicationStore.prototype.postJson = function (url, entity, successCallback, failureCallback) {
    postWithAjax(url, entity, successCallback, failureCallback);
};

ApplicationStore.prototype.putJson = function (url, entity, successCallback, failureCallback) {
    putWithAjax(url, entity, successCallback, failureCallback);
};

ApplicationStore.prototype.delete = function (url, successCallback, failureCallback) {
    deleteWithAjax(url, successCallback, failureCallback);
};

ApplicationStore.prototype.getJson = function (url, successCallback, failureCallback) {
    getWithAjax(url, successCallback, failureCallback);
};

ApplicationStore.prototype.buildFormData = function (formData) {
    var dataString = '';
    for (var prop in formData) {
        if (formData.hasOwnProperty(prop)) {
            dataString += (prop + '=' + formData[prop] + '&');
        }
    }
    return dataString.slice(0, dataString.length - 1);
};


$.extend(ApplicationStore.prototype, EventEmitter.prototype);

module.exports = ApplicationStore;

var postWithAjax = function (url, entity, successCallback, failureCallback) {
    $.ajax({
        url: url,
        type: 'POST',
        dataType: 'json',
        data: entity,
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", "Bearer  " + ApplicationStore.AccessToken);
        },
        success: function (data, statusText, xhr) {

            if (successCallback) {
                successCallback(data, statusText, xhr);
            }
        },
        error: function (xhr) {
            if (failureCallback) {
                failureCallback(xhr);
            }
        }
    });
};


var putWithAjax = function (url, entity, successCallback, failureCallback) {
    $.ajax({
        url: url,
        type: 'PUT',
        dataType: 'json',
        data: entity,
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", "Bearer  " + ApplicationStore.AccessToken);
        },
        success: function (data, statusText, xhr) {

            if (successCallback) {
                successCallback(data, statusText, xhr);
            }
        },
        error: function (xhr) {
            if (failureCallback) {
                failureCallback(xhr);
            }
        }
    });
};

var deleteWithAjax = function (url, successCallback, failureCallback) {
    $.ajax({
        url: url,
        type: 'DELETE',
        dataType: 'json',
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", "Bearer  " + ApplicationStore.AccessToken);
        },
        success: function (data, statusText, xhr) {

            if (successCallback) {
                successCallback(data, statusText, xhr);
            }
        },
        error: function (xhr) {
            if (failureCallback) {
                failureCallback(xhr);
            }
        }
    });
};

var getWithAjax = function (url, successCallback, failureCallback) {
    $.ajax({
        url: url,
        type: 'GET',
        dataType: 'json',
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", "Bearer  " + ApplicationStore.AccessToken);
        },
        success: function (data, statusText, xhr) {

            if (successCallback) {
                successCallback(data, statusText, xhr);
            }
        },
        error: function (xhr) {
            if (failureCallback) {
                failureCallback(xhr);
            }
        }
    });
};