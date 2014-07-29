/** @jsx React.DOM*/

var React = require('react');
var Router = require('react-router-component');
var LocationStore = require('../stores/LocationStore');
var $ = require('jquery-browserify'); 
var LoadingIndicator = require('./LoadingIndicator');
var LocationTableRow = require('./LocationTableRow');
var ConfirmationModal = require('./ConfirmationModal');
var LocationActions = require('../actions/LocationActions');


var LocationsPage = React.createClass({displayName: 'LocationsPage',

    getInitialState:function(){
        return {locations:null, loading:true};
    },
    componentWillMount:function(){
        LocationActions.listLocations();        
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
        var entity = LocationStore.getLocationsState();
        this.setState({  locations:entity.Locations, loading:false });
    },
    onFailure:function(){
        var error = LocationStore.getErrorState();
        this.setState({Error : error.Message, loading: false});
    },
    handleDelete:function(id){
        if (confirm("Do you want to delete this location?")) {
            LocationActions.deleteLocation(id);
            this.setState({loading:true});
        }    
    },
    render: function () {
        var Link = Router.Link;

        var btnStyle ={
            float:'right',
            "padding-top":10
        }

       

        var loading = function(component){
            if (component.state.loading) {
                return LoadingIndicator(null );
            }
            return ;
        }(this);

        var error = function(component){
            if (component.state.Error) {
                return React.DOM.div( {className:"error-message"}, 
                                                component.state.Error
                                             );
            }
            return;
        }(this);

        var confirmModal = ConfirmationModal( {modalId:"confirmModal"} )


        var data = function(component){
            if (!component.state.locations) {
                return;
            }

            if (!component.state.locations.length) {
                return React.DOM.tr(null, React.DOM.td( {colspan:"4"}, "There are no locations in the system"));
            }

            return component.state.locations.map(function (location) {             
                return (
                    LocationTableRow( {key:location.Id, location:location, onDelete:this.handleDelete} )                   
                    );
    }.bind(component));
}(this);


return React.DOM.div(null, 
            React.DOM.h5( {className:"ui header"}, "Locations"),
            React.DOM.div( {className:"ui divider"}),
error,
React.DOM.div(null, 
confirmModal,
    React.DOM.table( {className:"ui small table segment"}, 
        React.DOM.thead(null, 
            React.DOM.tr(null, 
            React.DOM.th(null, 
            "Name"
                ),
                React.DOM.th(null, 
                    "Description"
                ), 
                React.DOM.th(null),
                React.DOM.th(null)
            )
    ),    
    React.DOM.tbody(null, 
        data
    )
    ),loading,
      React.DOM.div( {style:btnStyle, 'data-omit':"Member"}, 
        Link( {className:"ui mini blue button", href:"/Locations/Add"}, "Create new")
    )
)
) 
}
});


module.exports = LocationsPage;
