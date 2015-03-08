

var AppDispatcher = require('app/dispatchers/AppDispatcher');
var AppConstants = require('app/constants/AppConstants');


var ResourceActions = {
    addResource: function (payload) {
        AppDispatcher.dispatch(AppConstants.RESOURCE_ADD, payload);
    },
    updateResource: function (payload) {
        AppDispatcher.dispatch(AppConstants.RESOURCE_EDIT, payload);
    },
    deleteResource: function (payload) {
        AppDispatcher.dispatch(AppConstants.RESOURCE_DELETE, payload);
    },
    listResources: function (payload) {
        AppDispatcher.dispatch(AppConstants.RESOURCE_LIST, payload);
    },
    resourceById: function (payload) {
        AppDispatcher.dispatch(AppConstants.RESOURCE_BY_ID, payload);
    },
    topFiveResources: function (payload) {
        AppDispatcher.dispatch(AppConstants.RESOURCES_TOP_FIVE, payload);
    }
}

module.exports = ResourceActions;