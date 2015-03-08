/**@jsx React.DOM*/

var React = require('react');
var Router = require('react-router-component');

var LoadingIndicator = require('app/components/LoadingIndicator');
var ActivityGridItem = require('app/components/ActivityGridItem'); 

var ResourceActions = require('app/actions/ResourceActions');
var ActivityActions = require('app/actions/ActivityActions');
var AppConstants = require('app/constants/AppConstants');
var ResourceStore = require("app/stores/ResourceStore"); 

var ResourceDetailsPage = React.createClass({

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
            this.setState({Loading:true});
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
                return <LoadingIndicator />;
            }
            return;
        }(this);
     

        var errorMessage = function(component){
            if (component.state.ErrorMessage) {
                return <div className="error-message">{component.state.ErrorMessage}</div> 
            }
            return;
        }(this);

        var activities = function(component){
            if (component.state.Resource) {
                return component.state.Resource.Activities.map(function(a){
                    return <ActivityGridItem key={a.Id} activity={a} onItemDelete={component.handleDelete} />;
                });
            }
            return;
        }(this);

        var resourceView = function(component){
            if (component.state.Resource) {
                var resource  = component.state.Resource;
                return (<div>
                    <div style={fontStyle}>
                        <strong>{resource.Name}</strong> <br />
                        <p>{resource.Description}</p>
                            <div>
                                <span style={spanWidth}>Priority:</span>{resource.Priority}
                            </div>
            
                            <div>
                                <span style={spanWidth}>Path:</span>{resource.Path}
                            </div><div>
                                <span style={spanWidth}>Location:</span>{resource.LocationName}
                            </div>
                    </div>
               <div className="ui two column divided grid">{activities}</div> 
                   <div style={btnStyle}><Link className="ui blue mini button" href={"/Activities/Add/"+resource.Id}>New Activity</Link> 
                                            </div>
        </div>) ; 
        }
        return;
    }(this);

return <div>
        <h5 classNameName="ui header">Resource Details</h5>
                    <div className="ui divider"></div>
{errorMessage}
{resourceView}
{loading}
                          
</div>;
        
}
});



module.exports = ResourceDetailsPage;
