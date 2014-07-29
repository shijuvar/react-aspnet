/**@jsx React.DOM*/

var React = require('react');
var Router = require('react-router-component');

var ActivityItem = React.createClass({displayName: 'ActivityItem',
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

        return  React.DOM.div(null, 
                "You had an activity",React.DOM.a( {style:notesModalStyle, onClick:this.showNoteModal}, 
                activity.Title
                ), " against this Resource on ", React.DOM.b(null, activity.ActivityDateString));
    }
               
});


module.exports = ActivityItem;