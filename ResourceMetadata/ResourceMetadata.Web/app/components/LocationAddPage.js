/** @jsx React.DOM */

var React = require('react');
var Router = require('react-router-component');
var LocationForm = require('app/components/LocationForm');
var LoadingIndicator = require('app/components/LoadingIndicator');
var LocationStore = require('app/stores/LocationStore');
var LocationActions = require('app/actions/LocationActions');

var LocationAddPage = React.createClass({
    mixins: [Router.NavigatableMixin],

    submitForm:function(location){
        this.setState({Loading:true});
        LocationActions.addLocation(location);
        return false;
    },
    getInitialState:function(){
        return {Location:null,ResponseError:null};
    },
    componentDidMount:function(){
        LocationStore.addSuccessListner(this.onSuccess);
        LocationStore.addFailureListner(this.onFailure);      
    },
    componentWillUnmount:function(){
        LocationStore.removeSuccessListner(this.onSuccess);
        LocationStore.removeFailureListner(this.onFailure);  
    },
    onSuccess:function(){
        this.navigate("/Locations");
    },
    onFailure:function(){
        var error = LocationStore.getErrorState();
        this.setState({ ResponseError: error.Message, Loading: false  });
    },
    render: function () {
        if (this.state.ResponseError) {
            var errorMessage = <div className="error-message">{this.state.ResponseError}</div>;
        }       

        if (this.state.Loading) {
            var loading = <LoadingIndicator />;
        }

        return(
            <div>
            <h5 className="ui header">Add Location</h5>
            <div className="ui divider"></div>
        {errorMessage}
        <LocationForm handleSubmit={this.submitForm} />
            {loading}
        </div>
            );
    }
});

module.exports = LocationAddPage;

