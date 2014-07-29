/** @jsx React.DOM*/

var React = require('react');
var Router = require('react-router-component');
var Header = require('./Header');
var Footer = require('./Footer');
var ContentRouter = require('./ContentRouter');
var AppContainer = React.createClass({displayName: 'AppContainer', 
   
    routeHandler:function(){
        console.log(this.getPath());
    },
    render: function () {  
        return (
            React.DOM.div(null,      
            Header(null ),
            ContentRouter(null )
            )
            );
    }
}); 

module.exports = AppContainer;


