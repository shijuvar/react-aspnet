/** @jsx React.DOM*/

var React = require('react');
var Router = require('react-router-component');
var Header = require('app/components/Header');
var Footer = require('app/components/Footer');
var ContentRouter = require('app/components/ContentRouter');
var AppContainer = React.createClass({ 
   
    routeHandler:function(){
        console.log(this.getPath());
    },
    render: function () {  
        return (
            <div>     
            <Header />
            <ContentRouter />
            </div>
            );
    }
}); 

module.exports = AppContainer;


