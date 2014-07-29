/** @jsx React.DOM*/
var React = require('react');

var NotFoundPage = React.createClass({displayName: 'NotFoundPage',
    render: function () {
        return (
            React.DOM.div(null, "Page not found")
            );
    }
});

module.exports = NotFoundPage;