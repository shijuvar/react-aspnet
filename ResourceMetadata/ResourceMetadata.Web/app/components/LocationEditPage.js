/** @jsx React.DOM*/

var React = require('react');
var Router = require('react-router-component');
var AppConstants = require("app/constants/AppConstants");
var LocationForm = require("app/components/LocationForm");
var LoadingIndicator = require("app/components/LoadingIndicator");
var LocationStore = require('app/stores/LocationStore');
var LocationActions = require('app/actions/LocationActions');

var LocationEditPage = React.createClass({
    mixins: [Router.NavigatableMixin],

    getInitialState:function(){
        return {Loading:true,Location:null,ResponseError:null};
    }, 
    componentDidMount:function(){
        LocationStore.addSuccessListner(this.onSuccess);
        LocationStore.addFailureListner(this.onFailure);   
    },
    componentWillMount:function(){
        var id = this.props.locationId;
        LocationActions.locationById(id);
    },
    componentWillUnmount:function(){
        LocationStore.removeSuccessListner(this.onSuccess);
        LocationStore.removeFailureListner(this.onFailure);
    },
    submitForm:function(location){
        location.Id = this.state.Location.Id;
        location.CreatedOn = this.state.Location.CreatedOn;
        LocationActions.updateLocation(location);
        return false;
    },
    onSuccess:function(){
        var state = LocationStore.getLocationState();
        if (state.Status === AppConstants.RETRIEVED) {
            this.setState({Location: state.Location, Loading: false});
        }
        else {
            this.navigate("/Locations");
        }
    
    },
    onFailure:function(){
        var error = LocationStore.getErrorState();
        this.setState({ResponseError: error, Loading: false});
    },
    render: function () {

        if (this.state.Loading) {
            return <LoadingIndicator />;
        }

        if (this.state.ResponseError) {
            var errorMessage = <div className="error-message">{this.state.ResponseError.Message}</div>;
        }       

        return(
            <div>
            <h5 className="ui header">Edit Location</h5>
            <div className="ui divider"></div>
        {errorMessage}
        <LocationForm handleSubmit={this.submitForm} location={this.state.Location} />
        </div>
            );
    }
});


module.exports = LocationEditPage;