/**@jsx React.DOM*/

var React = require('react');
var Router = require('react-router-component');
var RequiredTextbox = require('app/components/RequiredTextbox');
var RequiredTextArea = require('app/components/RequiredTextArea');
var DatePicker = require('app/components/DatePicker');

var ActivityActions = require("app/actions/ActivityActions");
var ActivityStore = require("app/stores/ActivityStore");

var ActivityAddPage = React.createClass({
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
                return <div className="error-message">component.state.ErrorMessage</div>;
            }
            return;
        }(this);

        var resourceId = this.props.resourceId;

        return <div>
               <h5 className="ui header">Add Activity</h5>
               <div className="ui divider"></div> 
        {errorMessage}
        <form name="activityform" role="form" className="ui secondary small form segment" onSubmit={this.onActivitySubmit}>
        <h5 className="ui header">
             Add Activity
        </h5><div className="ui divider"></div>
        <div className="field">
        <label>
         Title<span style={requiredSpanStyle}>*</span>
        </label>               
            <RequiredTextbox  placeholder="Title" ref="Title" />
        </div><div className="ui divider"></div>
        <div className="field">
         <label>
             Notes<span style={requiredSpanStyle}>*</span>
         </label>
         <RequiredTextArea  placeholder="Notes" ref="notes" />        
         </div><div className="ui divider"></div>
         <div className="field" style={marginStyle}>
         <label>
             Date<span style={requiredSpanStyle}>*</span>
         </label>
         <DatePicker ref="activityDate" maxDate="0" required="true" placeholder="Activity Date" />                
         </div><div className="ui divider"></div>
         <div className="inline field">
          <button
        className="ui blue mini button">
    Submit
</button>
<Link  className="ui black mini button" href={"/Resources/Details/"+resourceId}>Cancel</Link>
</div>
</form>
</div>
    }
});

module.exports = ActivityAddPage;