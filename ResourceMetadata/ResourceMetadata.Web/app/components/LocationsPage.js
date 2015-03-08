/** @jsx React.DOM*/

var React = require('react');
var Router = require('react-router-component');
var LocationStore = require('app/stores/LocationStore');
var $ = require('jquery-browserify'); 
var LoadingIndicator = require('app/components/LoadingIndicator');
var LocationTableRow = require('app/components/LocationTableRow');
var ConfirmationModal = require('app/components/ConfirmationModal');
var LocationActions = require('app/actions/LocationActions');


var LocationsPage = React.createClass({

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
                return <LoadingIndicator />;
            }
            return ;
        }(this);

        var error = function(component){
            if (component.state.Error) {
                return <div className="error-message">
                                                {component.state.Error}
                                             </div>;
            }
            return;
        }(this);

        var confirmModal = <ConfirmationModal modalId="confirmModal" />


        var data = function(component){
            if (!component.state.locations) {
                return;
            }

            if (!component.state.locations.length) {
                return <tr><td colspan="4">There are no locations in the system</td></tr>;
            }

            return component.state.locations.map(function (location) {             
                return (
                    <LocationTableRow key={location.Id} location={location} onDelete={this.handleDelete} />                   
                    );
    }.bind(component));
}(this);


return <div>
            <h5 className="ui header">Locations</h5>
            <div className="ui divider"></div>
{error}
<div>
{confirmModal}
    <table className="ui small table segment">
        <thead>
            <tr>
            <th>
            Name
                </th>
                <th>
                    Description
                </th> 
                <th></th>
                <th></th>
            </tr>
    </thead>    
    <tbody>
        {data}
    </tbody>
    </table>{loading}
      <div style={btnStyle} data-omit="Member">
        <Link className="ui mini blue button" href="/Locations/Add">Create new</Link>
    </div>
</div>
</div> 
}
});


module.exports = LocationsPage;
