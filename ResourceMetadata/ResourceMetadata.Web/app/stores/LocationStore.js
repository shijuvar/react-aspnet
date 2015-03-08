/// <reference path="../constants/AppConstants.js" />

var $ = require('jquery-browserify');
var ApplicationStore = require('app/stores/ApplicationStore');
var AppDispatcher = require('app/dispatchers/AppDispatcher');
var AppConstants = require('app/constants/AppConstants');
var config = require('../../../config');

var locationUrl = config.apiurl + "Locations";

var getLocations = function () {
    var successCallback = function (data, statusText, xhr) {
        this.Locations = data;
        this.Error = null;
        this.emit(AppConstants.STORE_CHANGE);
    }.bind(LocationStore);

    var failureCallback = function (xhr) {
        this.Locations = null;
        this.Error = { Message: "An error occured while retrieving the locations. Please try after some time", StatusCode: xhr.status };
        this.emit(AppConstants.STORE_ERROR);
    }.bind(LocationStore);

    LocationStore.getJson(locationUrl, successCallback, failureCallback);
};

var getLocationById = function (id) {

    var url = locationUrl + "/" + id;
    var successCallback = function (data, statusText, xhr) {
        this.Location = data;
        this.Error = null;
        this.Status = AppConstants.RETRIEVED;
        this.emit(AppConstants.STORE_CHANGE);
    }.bind(LocationStore);

    var failureCallback = function (xhr) {
        this.Error = { Message: "An error occured while retrieving the location. Please try after some time", StatusCode: xhr.status };
        this.Location = null;
        this.Locations = null;
        this.emit(AppConstants.STORE_ERROR);
    }.bind(LocationStore);

    LocationStore.getJson(url, successCallback, failureCallback);
};

var addLocation = function (location) {
    var success = function (data, statusText, xhr) {
        this.Locations.push(data);
        this.Error = null;
        this.emit(AppConstants.STORE_CHANGE);
    }.bind(LocationStore);

    var failure = function (xhr) {
        this.Error = { Message: "An error occured while saving the location. Please try after some time", StatusCode: xhr.status };
        this.Locations = null;
        this.Location = null;
        this.emit(AppConstants.STORE_ERROR);
    }.bind(LocationStore);

    LocationStore.postJson(locationUrl, location, success, failure);
};

var updateLocation = function (location) {

    var url = locationUrl + "/" + location.Id;
    var successCallback = function (data, statusText, xhr) {
        for (var i = 0; i < this.Locations.length; i++) {
            if (this.Locations[i].Id === location.Id) {
                this.Locations[i] = location;
                break;
            }
        }

        this.Error = null;
        this.Status = AppConstants.UPDATED;
        this.emit(AppConstants.STORE_CHANGE);
    }.bind(LocationStore);

    var failureCallback = function (xhr) {
        this.Error = { Message: "An error occured while updating the location. Please try after some time", StatusCode: xhr.status };
        this.emit(AppConstants.STORE_ERROR);
    }.bind(LocationStore);

    LocationStore.putJson(url, location, successCallback, failureCallback);
};


var deleteLocation = function (id) {

    var url = locationUrl + "/" + id;
    var successCallback = function (data, statusText, xhr) {
        var index;
        for (var i = 0; i < this.Locations.length; i++) {
            if (this.Locations[i].Id === id) {
                index = i;
                break;
            }
        }

        this.Locations.splice(index, 1);
        this.Error = null;
        this.Status = AppConstants.UPDATED;
        this.emit(AppConstants.STORE_CHANGE);
    }.bind(LocationStore);

    var failureCallback = function (xhr) {
        this.Error = { Message: "An error occured while deleting the location. Please try after some time", StatusCode: xhr.status };
        this.emit(AppConstants.STORE_ERROR);
    }.bind(LocationStore);

    LocationStore.delete(url, successCallback, failureCallback);

};

var LocationStore = function () {
    var store = new ApplicationStore();
    store.Locations = [];
    store.Error = {};
    store.Status = "";
    store.Location = {};
    store.getLocationsState = function () {
        return { Locations: this.Locations };
    };
    store.getLocationState = function () {
        return { Location: this.Location, Status: this.Status };
    };
    store.getErrorState = function () {
        return this.Error;
    };

    return store;
}();


AppDispatcher.register(function (actionType, payload) {
    switch (actionType) {
        case AppConstants.LOCATION_LIST:
            {
                getLocations();
                break;
            }
        case AppConstants.LOCATION_ADD: {
            addLocation(payload);
            break;
        }
        case AppConstants.LOCATION_BY_ID: {
            getLocationById(payload);
            break;
        }
        case AppConstants.LOCATION_EDIT: {
            updateLocation(payload);
            break;
        }
        case AppConstants.LOCATION_DELETE: {
            deleteLocation(payload);
            break;
        }
        default: {
            break;
        }
    }
});

module.exports = LocationStore;