/** @jsx React.DOM */

var React = require('react');

var LoadingIndicator = React.createClass({displayName: 'LoadingIndicator',
    render: function () {  
            return  (React.DOM.div( {className:"ui active loader"}, 
                                    React.DOM.div( {className:"ui mini text loader"}, "Loading..")
                               ));
    }
});

module.exports  = LoadingIndicator;