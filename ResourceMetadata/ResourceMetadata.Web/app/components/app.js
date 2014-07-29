/** @jsx React.DOM */

var React = require('react');
var NavigationRouter = require('./NavigationRouter');

if (window) {
    window.onload = function(){
        React.renderComponent(<NavigationRouter />,document.getElementById("content"));
    }
}