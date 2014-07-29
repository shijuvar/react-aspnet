var AppDispatcher = function () { };

var callbacks = [];

AppDispatcher.prototype.register = function (callback) {
    callbacks.push(callback);
};

AppDispatcher.prototype.dispatch = function (actionType,payload) {
    for (var i = 0; i < callbacks.length; i++) {
        callbacks[i](actionType, payload);
    }
};

module.exports = new AppDispatcher();




 
