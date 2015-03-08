/**@jsx React.DOM*/
var React = require('react');
var Router = require('react-router-component'); 
var LoadingIndicator = require('app/components/LoadingIndicator');
var ResourceForm = require('app/components/ResourceForm');

var LocationStore = require("app/stores/LocationStore");
var ResourceStore = require("app/stores/ResourceStore");
var LocationActions = require('app/actions/LocationActions');
var ResourceActions = require('app/actions/ResourceActions');
var AppConstants = require('app/constants/AppConstants');

var ResourceEditPage = React.createClass({
    mixins:[Router.NavigatableMixin],

    componentDidMount: function(){
        LocationStore.addSuccessListner(this.onLocationsRetrievalSuccess);
        ResourceStore.addSuccessListner(this.onResourceUpdationSuccess);
        ResourceStore.addSuccessListner(this.onResourceRetrievalSuccess);

        LocationStore.addFailureListner(this.onFailure); 
      
    },
    componentWillMount: function(){  
        LocationActions.listLocations(); 
        ResourceActions.resourceById(this.props.id);
    },
    componentWillUnmount: function(){
        LocationStore.removeSuccessListner(this.onLocationsRetrievalSuccess);
        ResourceStore.removeSuccessListner(this.onResourceUpdationSuccess);
        ResourceStore.removeSuccessListner(this.onResourceRetrievalSuccess);
  
        ResourceStore.removeFailureListner(this.onFailure);  
    },
    getInitialState: function(){
        return {Loading: true, Error : null, Locations:null, Resource:null};
    },
    handleSubmit: function(resource){
        ResourceActions.updateResource(resource);
        return false;
    },
    onLocationsRetrievalSuccess: function(){
        var locationState = LocationStore.getLocationsState();
        var locations = locationState.Locations;
        this.setState({Locations: locations, Resource:this.state.Resource, ErrorMessage: null,Loading:!this.state.Resource});
    },
    onResourceRetrievalSuccess: function(){
        var resourceState = ResourceStore.getResourceState();

        if (resourceState.Status !== AppConstants.UPDATED) {
            this.setState({Resource: resourceState.Resource, Locations:this.state.Locations, Loading: !this.state.Locations   });
        }        
    },
    onResourceUpdationSuccess: function(){
        var resourceState = ResourceStore.getResourceState();
        if (resourceState.Status === AppConstants.UPDATED) {
            this.navigate("/Resources");
        }
    
        return;
    },
    onFailure: function(){

    },
    render: function () {  
        
        if (this.state.Loading) {
            return <LoadingIndicator />;
        }

        var errorMessage = function(component){
            if (component.state.Error) {
                return <div className="error-message">{component.state.Error.Message}</div>
            }
            return;
    
        }(this);

  

        return  <div>
                <h5 className="ui header">Edit Resource</h5>
                <div className="ui divider"></div>
        {errorMessage}
        <ResourceForm locations={this.state.Locations} resource={this.state.Resource} handleSubmit={this.handleSubmit}/>
       
        </div>;
    }

});

module.exports = ResourceEditPage;