/** @jsx React.DOM*/

var React = require('react');
var Router = require('react-router-component');
var ResourceStore = require('app/stores/ResourceStore');
var $ = require('jquery-browserify'); 
var LoadingIndicator = require('app/components/LoadingIndicator');
var ResourceTableRow = require('app/components/ResourceTableRow');
var ConfirmationModal = require('app/components/ConfirmationModal');
var ResourceActions = require('app/actions/ResourceActions');


var ResourcesPage = React.createClass({

    getInitialState:function(){
        return {Resources:null, Loading:true};
    },
    componentWillMount:function(){
        ResourceActions.listResources();        
    },
    componentDidMount:function(){
        ResourceStore.addSuccessListner(this.onSuccess);
        ResourceStore.addFailureListner(this.onFailure);      
    },
    componentWillUnmount:function(){
        ResourceStore.removeSuccessListner(this.onSuccess);
        ResourceStore.removeFailureListner(this.onFailure);       
    },
    onSuccess:function(){
        var entity = ResourceStore.getResourcesState();
        this.setState({  Resources:entity.Resources, Loading:false });
    },
    onFailure:function(){
        var error = ResourceStore.getErrorState();
        this.setState({Error : error.Message, Loading: false});
    },
    handleDelete:function(id){
        if (confirm("Do you want to delete this Resource?")) {
            ResourceActions.deleteResource(id); 
            this.setState({Loading:true});
        }    
       
    },
    render: function () {
        var Link = Router.Link;

        var btnStyle ={
            float:'right',
            "padding-top":10
        }

        var loading = function(component){
            if (component.state.Loading) {
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


        var data = function(component){
            if (!component.state.Resources) {
                return;
            }

            if (!component.state.Resources.length) {
                return <tr><td colSpan="4">There are no Resources in the system</td></tr>;
            }

            return component.state.Resources.map(function (Resource) {             
                return (
                    <ResourceTableRow key={Resource.Id} resource={Resource} onDelete={this.handleDelete} />                   
                    );
    }.bind(component));
}(this);


return <div>
            <h5 className="ui header">Resources</h5>
            <div className="ui divider"></div>
{error}
<div> 
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
        <Link className="ui mini blue button" href="/Resources/Add">Create new</Link>
    </div>
</div>
</div> 
}
});


module.exports = ResourcesPage;
