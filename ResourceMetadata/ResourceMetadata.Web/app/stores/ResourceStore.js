var $ = require('jquery-browserify');
var ApplicationStore = require('app/stores/ApplicationStore');
var AppDispatcher = require('app/dispatchers/AppDispatcher');
var AppConstants = require('app/constants/AppConstants');
var config = require('../../../config');

var resourceUrl = config.apiurl + "Resources";
var activitiesUrl = config.apiurl + "Activities";

var getResources = function () {
    var successCallback = function (data, statusText, xhr) {
        this.Resources = data;
        this.Error = null;
        this.emit(AppConstants.STORE_CHANGE);
    }.bind(ResourceStore);

    var failureCallback = function (xhr) {
        this.Resources = null;
        this.Error = { Message: "An error occured while retrieving the resources. Please try after some time", StatusCode: xhr.status };
        this.emit(AppConstants.STORE_ERROR);
    }.bind(ResourceStore);

    ResourceStore.getJson(resourceUrl, successCallback, failureCallback);
};

var getResourceById = function (id) {

    var url = resourceUrl + "/" + id;
    var successCallback = function (data, statusText, xhr) {
        this.Resource = data;
        this.Error = null;
        this.Status = AppConstants.RETRIEVED;
        this.emit(AppConstants.STORE_CHANGE);
    }.bind(ResourceStore);

    var failureCallback = function (xhr) {
        this.Error = { Message: "An error occured while retrieving the resource. Please try after some time", StatusCode: xhr.status };
        this.emit(AppConstants.STORE_ERROR);
    }.bind(ResourceStore);

    ResourceStore.getJson(url, successCallback, failureCallback);
};

var addResource = function (resource) {
    var success = function (data, statusText, xhr) {
        this.Resources.push(data);
        this.Error = null;
        this.Status = AppConstants.CREATED;
        this.emit(AppConstants.STORE_CHANGE);
    }.bind(ResourceStore);

    var failure = function (xhr) {
        this.Error = { Message: "An error occured while saving the location. Please try after some time", StatusCode: xhr.status };
        this.Resources = null;
        this.Resource = null;
        this.emit(AppConstants.STORE_ERROR);
    }.bind(ResourceStore);

    ResourceStore.postJson(resourceUrl, resource, success, failure);
};

var updateResource = function (resource) {

    var url = resourceUrl + "/" + resource.Id;
    var successCallback = function (data, statusText, xhr) {
        for (var i = 0; i < this.Resources.length; i++) {
            if (this.Resources[i].Id === resource.Id) {
                this.Resources[i] = resource;
                break;
            }
        }

        this.Error = null;
        this.Status = AppConstants.UPDATED;
        this.emit(AppConstants.STORE_CHANGE);
    }.bind(ResourceStore);

    var failureCallback = function (xhr) {
        this.Error = { Message: "An error occured while updating the location. Please try after some time", StatusCode: xhr.status };
        this.emit(AppConstants.STORE_ERROR);
    }.bind(ResourceStore);

    ResourceStore.putJson(url, resource, successCallback, failureCallback);
};


var deleteResource = function (id) {

    var url = resourceUrl + "/" + id;
    var successCallback = function (data, statusText, xhr) {
        var index;
        for (var i = 0; i < this.Resources.length; i++) {
            if (this.Resources[i].Id === id) {
                index = i;
                break;
            }
        }

        this.Resources.splice(index, 1);
        this.Error = null;
        this.Status = AppConstants.UPDATED;
        this.emit(AppConstants.STORE_CHANGE);
    }.bind(ResourceStore);

    var failureCallback = function (xhr) {
        this.Error = { Message: "An error occured while deleting the location. Please try after some time", StatusCode: xhr.status };
        this.emit(AppConstants.STORE_ERROR);
    }.bind(ResourceStore);

    ResourceStore.delete(url, successCallback, failureCallback);
};

var ResourceStore = function () {
    var store = new ApplicationStore();
    store.Resources = [];
    store.Error = {};
    store.Status = "";
    store.Resource = {};
    store.getResourcesState = function () {
        return { Resources: this.Resources, Status: this.Status };
    };
    store.getResourceState = function () {
        return { Resource: this.Resource, Status: this.Status };
    };
    store.getErrorState = function () {
        return this.Error;
    };

    return store;
}();


function removeResourceActivity(id) {

    var successCallback = function (data, statusText, xhr) {

        var resource = ResourceStore.Resource;
        if (resource) {
            var activites = resource.Activities;
            var index;
            for (var i = 0; i < activites.length; i++) {
                if (activites[i].Id === id) {
                    index = i;
                    break;
                }
            }
            if (index >= 0) {
                activites.splice(index, 1);
            }
        }
        ResourceStore.Resource = resource;
        ResourceStore.Status = AppConstants.DELETED;
        ResourceStore.emit(AppConstants.STORE_CHANGE);
    };

    var failureCallback = function (xhr) {
        ResourceStore.Error = { Message: "An error occured while deleting the Activity. Please try after some time", StatusCode: xhr.status };
        ResourceStore.emit(AppConstants.STORE_ERROR);
    }


    ResourceStore.delete(activitiesUrl + "/" + id, successCallback, failureCallback);
}

function getTopFiveResources() {
    var url = resourceUrl + "?count=5";
    var successCallback = function (data, responseText, xhr) {
        ResourceStore.Resources = data;
        ResourceStore.Status = AppConstants.RETRIEVED;
        ResourceStore.emit(AppConstants.STORE_CHANGE);
    };
    var errorCallback = function (xhr) {
        ResourceStore.Error = { Message: "An error occured while retreving resources. Please try after some time", StatusCode: xhr.status };
        ResourceStore.emit(AppConstants.STORE_ERROR);
    }

    ResourceStore.getJson(url, successCallback, errorCallback);
}

AppDispatcher.register(function (actionType, payload) {
    switch (actionType) {
        case AppConstants.RESOURCE_LIST: {
            getResources();
            break;
        }
        case AppConstants.RESOURCE_ADD: {
            addResource(payload);
            break;
        }
        case AppConstants.RESOURCE_BY_ID: {
            getResourceById(payload);
            break;
        }
        case AppConstants.RESOURCE_EDIT: {
            updateResource(payload);
            break;
        }
        case AppConstants.RESOURCE_DELETE: {
            deleteResource(payload);
            break;
        }
        case AppConstants.ACTIVITY_DELETE: {
            removeResourceActivity(payload);
            break;
        }
        case AppConstants.RESOURCES_TOP_FIVE: {
            getTopFiveResources(payload);
            break;
        }
        default: {
            break;
        }
    }
});

module.exports = ResourceStore;