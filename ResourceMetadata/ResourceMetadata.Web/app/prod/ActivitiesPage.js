/** @jsx React.DOM */

var React = require('react');

var ActivitiesPage = React.createClass({displayName: 'ActivitiesPage',
    render: function () {
        return (
            React.DOM.div(null, "Activities page")
            );
    }
});

module.exports = ActivitiesPage;