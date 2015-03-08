var $ = require('jquery-browserify');
var ApplicationStore = require('app/stores/ApplicationStore');
var AppDispatcher = require('app/dispatchers/AppDispatcher');
var AppConstants = require('app/constants/AppConstants');
var config = require('../../../config');

var resourceUrl = config.apiurl + 'Resources/';

function addActivity(activity) {

    var successCallback = function (data, statusText, xhr) {

        if (!ActivityStore.Activities) {
            ActivityStore.Activities = [];
        };

        ActivityStore.Activities.push(data);
        ActivityStore.Status = AppConstants.CREATED;
        ActivityStore.emit(AppConstants.STORE_CHANGE);
    };

    var failureCallback = function (xhr) {
        ActivityStore.Error = ({ Message: "An error occured while saving activity. Please try after some time", StatusCode: xhr.status });
        ActivityStore.emit(AppConstants.STORE_ERROR);
    };

    ActivityStore.postJson(resourceUrl + activity.ResourceId + "/Activities", activity, successCallback, failureCallback);
};

var ActivityStore = function () {
    var store = new ApplicationStore();

    store.getActivitiesState = function () {
        return { Activities: ActivityStore.Activities };
    };
    store.getActivityState = function () {
        return { Activity: ActivityStore.Activity };
    };

    store.getErrorState = function () {
        return Error;
    };

    return store;
}();

AppDispatcher.register(function (actionType, payload) {
    switch (actionType) {

        case AppConstants.ACTIVITY_ADD: {
            addActivity(payload);
            break;
        }
        default: {
            break;
        }
    }

});


module.exports = ActivityStore;

