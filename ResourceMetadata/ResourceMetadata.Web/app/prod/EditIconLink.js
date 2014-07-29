/** @jsx React.DOM */
var React = require('react');
var Router = require('react-router-component');

var EditIconLink = React.createClass({displayName: 'EditIconLink',
    propTypes:{
        href: React.PropTypes.string.isRequired
    },
    render: function () { 
        var Link = Router.Link;
        return(this.transferPropsTo(Link(null, React.DOM.i( {className:"edit icon"}))));
    }
});

module.exports = EditIconLink;