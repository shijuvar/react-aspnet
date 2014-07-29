/**@jsx React.DOM*/

var React = require('react');
var ActivityItem = require('./ActivityItem');
var DeleteIcon = require('./DeleteIcon');

var ActivityGridItem = React.createClass({displayName: 'ActivityGridItem',
    handleDelete: function(){
        var a = this.props.activity;
        this.props.onItemDelete(a);
    },
    render: function(){

        var gridColumnStyle ={
            width:"80%"
        };

        var activity = this.props.activity;
        return  React.DOM.div( {className:"row"}, React.DOM.div( {className:"column", style:gridColumnStyle}, ActivityItem( {activity:activity} )),React.DOM.div( {className:"column"}, DeleteIcon( {onClick:this.handleDelete} )));
    }
});


module.exports = ActivityGridItem;