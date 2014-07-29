/**@jsx React.DOM*/

var React = require('react');
var Router = require('react-router-component');
var RequiredTextbox = require('./RequiredTextbox');
var RequiredTextArea = require('./RequiredTextArea');
var DatePicker = require('./DatePicker');

var ActivityActions = require("../actions/ActivityActions");
var ActivityStore = require("../stores/ActivityStore");

var ActivityAddPage = React.createClass({displayName: 'ActivityAddPage',
    mixins:[Router.NavigatableMixin],

    getInitialState: function(){
        return {ErrorMessage: null};
    },
    componentDidMount: function(){
        ActivityStore.addSuccessListner(this.onActivityAdd);
        ActivityStore.addFailureListner(this.onFailure);
    },
    componentWillUnmount:function(){
        ActivityStore.removeSuccessListner(this.onActivityAdd);
        ActivityStore.removeFailureListner(this.onFailure);
    },
    onActivityAdd: function(){
        var id = this.props.resourceId;
        this.navigate("/Resources/Details/"+ id);
    },
    onFailure: function(){
        var error = ActivityStore.getErrorState();
        this.setState({ErrorMessage: error.Message});
    },
    onActivitySubmit: function(){

        var title = this.refs.Title.getDOMNode().value;
        var notes = this.refs.notes.getDOMNode().value;
        var date = this.refs.activityDate.getDOMNode().value;
        var resourceId = this.props.resourceId;
        ActivityActions.addActivity({Title: title, Notes: notes,ActivityDate: date, ResourceId: resourceId});


        return false;
    },
    render: function () {

        var Link = Router.Link;

        var requiredSpanStyle = {
            color:"red"
        };

        var marginStyle ={
            marginBottom:10
        };

        var errorMessage = function(component){
            if (component.state.ErrorMessage) {
                return React.DOM.div( {className:"error-message"}, "component.state.ErrorMessage");
            }
            return;
        }(this);

        var resourceId = this.props.resourceId;

        return React.DOM.div(null, 
               React.DOM.h5( {className:"ui header"}, "Add Activity"),
               React.DOM.div( {className:"ui divider"}), 
        errorMessage,
        React.DOM.form( {name:"activityform", role:"form", className:"ui secondary small form segment", onSubmit:this.onActivitySubmit}, 
        React.DOM.h5( {className:"ui header"}, 
             "Add Activity"
        ),React.DOM.div( {className:"ui divider"}),
        React.DOM.div( {className:"field"}, 
        React.DOM.label(null, 
         "Title",React.DOM.span( {style:requiredSpanStyle}, "*")
        ),               
            RequiredTextbox(  {placeholder:"Title", ref:"Title"} )
        ),React.DOM.div( {className:"ui divider"}),
        React.DOM.div( {className:"field"}, 
         React.DOM.label(null, 
             "Notes",React.DOM.span( {style:requiredSpanStyle}, "*")
         ),
         RequiredTextArea(  {placeholder:"Notes", ref:"notes"} )        
         ),React.DOM.div( {className:"ui divider"}),
         React.DOM.div( {className:"field", style:marginStyle}, 
         React.DOM.label(null, 
             "Date",React.DOM.span( {style:requiredSpanStyle}, "*")
         ),
         DatePicker( {ref:"activityDate", maxDate:"0", required:"true", placeholder:"Activity Date"} )                
         ),React.DOM.div( {className:"ui divider"}),
         React.DOM.div( {className:"inline-field"}, 
          React.DOM.button(
        {className:"ui blue mini button"}, 
    "Submit"
),
Link(  {className:"ui black mini button", href:"/Resources/Details/"+resourceId}, "Cancel")
)
)
)
    }
});

module.exports = ActivityAddPage;