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

var ResourceAddPage = React.createClass({
    mixins:[Router.NavigatableMixin],

    componentDidMount: function(){
        LocationStore.addSuccessListner(this.onLocationsRetrievalSuccess);
        LocationStore.addFailureListner(this.onFailure); 

        ResourceStore.addSuccessListner(this.onResourceCreationSuccess);
        ResourceStore.addFailureListner(this.onFailure); 
      
    },
    componentWillMount: function(){  
        LocationActions.listLocations();     
    },
    componentWillUnmount: function(){
        LocationStore.removeSuccessListner(this.onLocationsRetrievalSuccess);
        LocationStore.removeFailureListner(this.onFailure); 
    
        ResourceStore.removeSuccessListner(this.onResourceCreationSuccess);
        ResourceStore.removeFailureListner(this.onFailure);  
    },
    getInitialState: function(){
        return {Loading: true, Error : null, Locations:null};
    },
    handleSubmit: function(resource){
        ResourceActions.addResource(resource);
        return false;
    },
    onLocationsRetrievalSuccess: function(){
        var locationState = LocationStore.getLocationsState();
        var locations = locationState.Locations;
        this.setState({Locations: locations, ErrorMessage: null,Loading:false});
    },
    onResourceCreationSuccess: function(){
        this.navigate("/Resources");
        return;
    },
    onFailure: function(){

    },
    render: function () {

        var errorMessage = function(component){
            if (component.state.Error) {
                return <div className="error-message">{component.state.Error.Message}</div>
            }
            return;
    
        }(this);

        var loading = function(component){
            if (component.state.Loading) {
                return <LoadingIndicator />;
            }
            return;
    
        }(this);

        return  <div>
                <h5 className="ui header">Add Resource</h5>
                <div className="ui divider"></div>
        {errorMessage}
        <ResourceForm locations={this.state.Locations} handleSubmit={this.handleSubmit}/>
        {loading}
        </div>;
    }

});


module.exports = ResourceAddPage;