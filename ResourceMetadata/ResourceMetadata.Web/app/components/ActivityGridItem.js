/**@jsx React.DOM*/

var React = require('react');
var ActivityItem = require('app/components/ActivityItem');
var DeleteIcon = require('app/components/DeleteIcon');

var ActivityGridItem = React.createClass({
    handleDelete: function(){
        var a = this.props.activity;
        this.props.onItemDelete(a);
    },
    render: function(){

        var gridColumnStyle ={
            width:"80%"
        };

        var activity = this.props.activity;
        return  <div className="row"><div className="column" style={gridColumnStyle}><ActivityItem activity={activity} /></div><div className="column"><DeleteIcon onClick={this.handleDelete} /></div></div>;
    }
});


module.exports = ActivityGridItem;