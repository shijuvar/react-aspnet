/**@jsx React.DOM*/

var React = require('react');
var Router = require('react-router-component');

var LoadingIndicator = require('./LoadingIndicator');
var ActivityGridItem = require('./ActivityGridItem'); 

var ResourceActions = require('../actions/ResourceActions');
var ActivityActions = require('../actions/ActivityActions');
var AppConstants = require('../constants/AppConstants');
var ResourceStore = require("../stores/ResourceStore"); 

var ResourceDetailsPage = React.createClass({displayName: 'ResourceDetailsPage',

    componentDidMount: function(){
        ResourceStore.addSuccessListner(this.onResourceRetrievalSuccess);
        ResourceStore.addFailureListner(this.onFailure);

        ResourceStore.addSuccessListner(this.onActivityDeletionSuccess);
    },
    componentWillUnmount: function(){
        ResourceStore.removeSuccessListner(this.onResourceRetrievalSuccess);
        ResourceStore.removeFailureListner(this.onFailure);

        ResourceStore.removeSuccessListner(this.onActivityDeletionSuccess);
    },
    componentWillMount: function(){
        ResourceActions.resourceById(this.props.id);
    },
    getInitialState: function(){
        return {Loading: true, Resource:null, ErrorMessage: null};
    },
    onResourceRetrievalSuccess: function(){
        var resourceState = ResourceStore.getResourceState();
        this.setState({Resource: resourceState.Resource, Loading: false});
    },
    onActivityDeletionSuccess: function(){
        var resourceState = ResourceStore.getResourceState();
        var resource = resourceState.Resource; 
        this.setState({Resource: resource, Loading: false});
    },
    onFailure: function(){
        var errorState = ResourceStore.getErrorState();
        this.setState({ErrorMessage : errorState.Message, Loading: false});
    },
    handleDelete: function(activity){
        if (confirm("Do you really want to remove this activity?")) {
            ActivityActions.deleteActivity(activity.Id);
        }
        return false;
    },
    render: function () {

        var Link = Router.Link;

        var fontStyle ={
            fontSize:"small"
        };

        var spanWidth = {
            wdith:"50%"
        };

        var btnStyle ={
            float:"right"
        };

        var loading = function(component){
            if (component.state.Loading) {
                return LoadingIndicator(null );
            }
            return;
        }(this);
     

        var errorMessage = function(component){
            if (component.state.ErrorMessage) {
                return React.DOM.div( {className:"error-message"}, component.state.ErrorMessage) 
            }
            return;
        }(this);

        var activities = function(component){
            if (component.state.Resource) {
                return component.state.Resource.Activities.map(function(a){
                    return ActivityGridItem( {key:a.Id, activity:a, onItemDelete:component.handleDelete} );
                });
            }
            return;
        }(this);

        var resourceView = function(component){
            if (component.state.Resource) {
                var resource  = component.state.Resource;
                return (React.DOM.div(null, 
                    React.DOM.div( {style:fontStyle}, 
                        React.DOM.strong(null, resource.Name), " ", React.DOM.br(null ),
                        React.DOM.p(null, resource.Description),
                            React.DOM.div(null, 
                                React.DOM.span( {style:spanWidth}, "Priority:"),resource.Priority
                            ),
            
                            React.DOM.div(null, 
                                React.DOM.span( {style:spanWidth}, "Path:"),resource.Path
                            ),React.DOM.div(null, 
                                React.DOM.span( {style:spanWidth}, "Location:"),resource.LocationName
                            )
                    ),
               React.DOM.div( {className:"ui two column divided grid"}, activities), 
                   React.DOM.div( {style:btnStyle}, Link( {className:"ui blue mini button", href:"/Activities/Add/"+resource.Id}, "New Activity") 
                                            )
        )) ; 
        }
        return;
    }(this);

return React.DOM.div(null, 
        React.DOM.h5( {classNameName:"ui header"}, "Resource Details"),
                    React.DOM.div( {className:"ui divider"}),
errorMessage,
resourceView,
loading
                          
);
        
}
});



module.exports = ResourceDetailsPage;
