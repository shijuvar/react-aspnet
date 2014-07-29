/**@jsx React.DOM*/

var React = require('react');
var Router = require('react-router-component');

var ActivityItem = React.createClass({
    showNoteModal: function(e){
        this.setState({Modal: true});
    },
  
    render: function () {

        var contentStyle ={
            width:"95%"
        };

        var notesModalStyle ={
            color:"#00BAFF",
            textDecoration:"none"
        };

        var activity = this.props.activity;

        return  <div>
                You had an activity<a style={notesModalStyle} onClick={this.showNoteModal}>
                {activity.Title}
                </a> against this Resource on <b>{activity.ActivityDateString}</b></div>;
    }
               
});


module.exports = ActivityItem;