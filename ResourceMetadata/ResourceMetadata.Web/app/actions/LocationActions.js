

var AppDispatcher = require('app/dispatchers/AppDispatcher');
var AppConstants = require('app/constants/AppConstants');


var LocationActions = {
    addLocation: function (payload) {
        AppDispatcher.dispatch(AppConstants.LOCATION_ADD, payload);
    },
    updateLocation: function (payload) {
        AppDispatcher.dispatch(AppConstants.LOCATION_EDIT, payload);
    },
    deleteLocation: function (payload) {
        AppDispatcher.dispatch(AppConstants.LOCATION_DELETE, payload);
    },
    listLocations: function (payload) {
        AppDispatcher.dispatch(AppConstants.LOCATION_LIST, payload);
    },
    locationById: function (payload) {
        AppDispatcher.dispatch(AppConstants.LOCATION_BY_ID, payload);
    }
}

module.exports = LocationActions;