/** @jsx React.DOM*/

var React = require('react');
var Router = require('react-router-component');
var ResourceStore = require('../stores/ResourceStore');
var $ = require('jquery-browserify'); 
var LoadingIndicator = require('./LoadingIndicator');
var ResourceActions = require('../actions/ResourceActions');


var HomePage = React.createClass({displayName: 'HomePage',
    getInitialState: function(){
        return {Resources: null, ErrorMessage:null, Loading: true};
    },
    componentWillMount: function(){
        ResourceActions.topFiveResources();
    },
    componentDidMount: function(){
        ResourceStore.addSuccessListner(this.onSuccess);
        ResourceStore.addFailureListner(this.onSuccess);
    },
    componentWillUnmount: function(){
        ResourceStore.removeFailureListner(this.onSuccess);
        ResourceStore.removeSuccessListner(this.onSuccess);
    },
    onSuccess:function(){
        var resourceState = ResourceStore.getResourcesState();
        this.setState({Resources: resourceState.Resources,Loading: false});
    },
    onFailure: function(){
        var errorState = ResourceStore.getErrorState();
        this.setState({Loading: false, ErrorMessage : erroState.Message});
    },
    render: function () {

        var Link = Router.Link;

        var loading = function(component){
            if (component.state.Loading) {
                return LoadingIndicator(null );
            }
            return;
        }(this);

        var error = function(component){
            if (component.state.ErrorMessage) {
                return React.DOM.div( {className:"error-message"}, component.state.ErrorMessage);
            }
            return;
        }(this);

        var resourcesTable = function(component){

            if (component.state.Resources) {
    
                var resourceItems = function(){
                
                    if (!component.state.Resources.length) {
                        return React.DOM.tr( {className:"danger"}, React.DOM.td( {colSpan:"3"},  " There are no resources"));
                    }

                    return component.state.Resources.map(function(r){
                        return React.DOM.tr(null, React.DOM.td(null, r.Priority),React.DOM.td(null, Link( {href:"/Resources/Details/"+r.Id}, r.Name)),
                            React.DOM.td(null, r.Description));
                    });                
                }();

                return React.DOM.table( {className:"ui small table segment"}, 
                        React.DOM.thead(null, 
                         React.DOM.tr(null, 
                             React.DOM.th(null, 
                                 "Priority"
                             ),
                             React.DOM.th(null, 
                                 "Name"
                             ),
                             React.DOM.th(null, 
                                 "Description"
                             )
                         )
                        ),
                        React.DOM.tbody(null, 
                        resourceItems
                     )
                    );

            }
            return ;

        }(this);

        return (React.DOM.div(null, 
            React.DOM.h5( {className:"ui header"}, "Resources"),
            React.DOM.div( {className:"ui divider"}),
        error, " ", resourcesTable,loading));
    }
});

module.exports = HomePage;