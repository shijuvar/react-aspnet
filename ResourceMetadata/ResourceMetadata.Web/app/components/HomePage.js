/** @jsx React.DOM*/

var React = require('react');
var Router = require('react-router-component');
var ResourceStore = require('app/stores/ResourceStore');
var $ = require('jquery-browserify'); 
var LoadingIndicator = require('app/components/LoadingIndicator');
var ResourceActions = require('app/actions/ResourceActions');


var HomePage = React.createClass({
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
                return <LoadingIndicator />;
            }
            return;
        }(this);

        var error = function(component){
            if (component.state.ErrorMessage) {
                return <div className="error-message">{component.state.ErrorMessage}</div>;
            }
            return;
        }(this);

        var resourcesTable = function(component){

            if (component.state.Resources) {
    
                var resourceItems = function(){
                
                    if (!component.state.Resources.length) {
                        return <tr className="danger"><td colSpan="3"> There are no resources</td></tr>;
                    }

                    return component.state.Resources.map(function(r){
                        return <tr><td>{r.Priority}</td><td><Link href={"/Resources/Details/"+r.Id}>{r.Name}</Link></td>
                            <td>{r.Description}</td></tr>;
                    });                
                }();

                return <table className="ui small table segment">
                        <thead>
                         <tr>
                             <th>
                                 Priority
                             </th>
                             <th>
                                 Name
                             </th>
                             <th>
                                 Description
                             </th>
                         </tr>
                        </thead>
                        <tbody>
                        {resourceItems}
                     </tbody>
                    </table>;

            }
            return ;

        }(this);

        return (<div>
            <h5 className="ui header">Home</h5>
            <div className="ui divider"></div>
        {error} {resourcesTable}{loading}</div>);
    }
});

module.exports = HomePage;