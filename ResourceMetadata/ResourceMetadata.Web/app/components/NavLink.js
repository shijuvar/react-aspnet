/**@jsx React.DOM */

var React = require('react');
var Addons = require('react-addons');
var Router = require('react-router-component');

var NavLink = React.createClass({
    mixins:[Router.NavigatableMixin],

    render: function () {
        var currentPath = this.getPath();
        var isCurrentItem = currentPath.lastIndexOf(this.props.value) > -1;

        var cx =  Addons.classSet;
        var navClass = cx({
            "item":true,
            "active": isCurrentItem
        });

        var Link = Router.Link;
        return this.transferPropsTo(<Link className={navClass}>{this.props.value}</Link>);
}
});


module.exports = NavLink;