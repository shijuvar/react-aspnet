var AppDispatcher = require('app/dispatchers/AppDispatcher');
var AppConstants = require('app/constants/AppConstants');

function addActivity(payload) {
    AppDispatcher.dispatch(AppConstants.ACTIVITY_ADD, payload);
}

function deleteActivity(id) {
    AppDispatcher.dispatch( AppConstants.ACTIVITY_DELETE,id);
}

var ActivityActions = {
    addActivity: addActivity,
    deleteActivity: deleteActivity
};

module.exports = ActivityActions;