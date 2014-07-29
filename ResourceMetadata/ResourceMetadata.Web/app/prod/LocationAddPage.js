/** @jsx React.DOM */

var React = require('react');
var Router = require('react-router-component');
var LocationForm = require('./LocationForm');
var LoadingIndicator = require('./LoadingIndicator');
var LocationStore = require('../stores/LocationStore');
var LocationActions = require('../actions/LocationActions');

var LocationAddPage = React.createClass({displayName: 'LocationAddPage',
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
            var errorMessage = React.DOM.div( {className:"error-message"}, this.state.ResponseError);
        }       

        if (this.state.Loading) {
            var loading = LoadingIndicator(null );
        }

        return(
            React.DOM.div(null, 
            React.DOM.h5( {className:"ui header"}, "Add Location"),
            React.DOM.div( {className:"ui divider"}),
        errorMessage,
        LocationForm( {handleSubmit:this.submitForm} ),
            loading
        )
            );
    }
});

module.exports = LocationAddPage;

