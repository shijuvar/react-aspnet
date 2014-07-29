/** @jsx React.DOM */
var React = require('react');
var Router = require('react-router-component');

var EditIconLink = React.createClass({
    propTypes:{
        href: React.PropTypes.string.isRequired
    },
    render: function () { 
        var Link = Router.Link;
        return(this.transferPropsTo(<Link><i className="edit icon"></i></Link>));
    }
});

module.exports = EditIconLink;