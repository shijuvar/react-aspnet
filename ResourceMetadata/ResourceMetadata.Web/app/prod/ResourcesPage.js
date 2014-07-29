/** @jsx React.DOM*/

var React = require('react');
var Router = require('react-router-component');
var ResourceStore = require('../stores/ResourceStore');
var $ = require('jquery-browserify'); 
var LoadingIndicator = require('./LoadingIndicator');
var ResourceTableRow = require('./ResourceTableRow');
var ConfirmationModal = require('./ConfirmationModal');
var ResourceActions = require('../actions/ResourceActions');


var ResourcesPage = React.createClass({displayName: 'ResourcesPage',

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


        var data = function(component){
            if (!component.state.Resources) {
                return;
            }

            if (!component.state.Resources.length) {
                return React.DOM.tr(null, React.DOM.td( {colSpan:"4"}, "There are no Resources in the system"));
            }

            return component.state.Resources.map(function (Resource) {             
                return (
                    ResourceTableRow( {key:Resource.Id, resource:Resource, onDelete:this.handleDelete} )                   
                    );
    }.bind(component));
}(this);


return React.DOM.div(null, 
            React.DOM.h5( {className:"ui header"}, "Resources"),
            React.DOM.div( {className:"ui divider"}),
error,
React.DOM.div(null,  
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
        Link( {className:"ui mini blue button", href:"/Resources/Add"}, "Create new")
    )
)
) 
}
});


module.exports = ResourcesPage;
