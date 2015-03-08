/**@jsx React.DOM*/

var React = require('react');
var Router = require('react-router-component');  

var Select2 = require('app/components/Select2');
var RequiredTextbox = require('app/components/RequiredTextbox');
var RequiredTextArea = require('app/components/RequiredTextArea');

var ResourceForm = React.createClass({ 
    componentWillMount: function(){

    },
    componentWillUnmount: function(){        
      
    },
    onSubmit: function(){

        var name = this.refs.name.getDOMNode().value;
        var desc = this.refs.description.getDOMNode().value;
        var location = this.refs.location.getDOMNode().value;
        var path = this.refs.path.getDOMNode().value;
        var priority = this.refs.priority.getDOMNode().value;
        var id = this.props && this.props.resource && this.props.resource.Id;

        if (!name || !desc || !location || !path || !priority) {
            return false;
        } 

        this.props.handleSubmit({Id : id,Name: name, Description: desc, Priority: priority, Path: path,LocationId: location});
        return false;
    },
    render: function () {

        var Link = Router.Link;

        var requiredSpanStyle ={
            color:'red'
        };

        var dropDownLabelStyle ={
            marginBottom:10
        };

        var dropdownStyle ={
            width:"100%"
        };

        var name= this.props.resource && this.props.resource.Name;
        var desc = this.props.resource && this.props.resource.Description; 
        var path = this.props.resource && this.props.resource.Path; 
        var location = this.props.resource && this.props.resource.LocationId; 
        var priority = this.props.resource && this.props.resource.Priority; 

        var priorityList = [{text:1, value:1},{text:2, value:2},{text:3, value:3},{text:4, value:4},{text:5, value:5},{text:6, value:6},{text:7, value:7},{text:8, value:8},{text:9, value:9},{text:10, value:10}];


        return <form name="resourceform" role="form" className="ui secondary small form segment" onSubmit={this.onSubmit}>
    <div className="field">
        <label>
            Name<span style={requiredSpanStyle}>*</span>
        </label>    
        <RequiredTextbox placeholder="Name" ref="name" value={name} />  
    </div><div className="ui divider"></div>
    <div className="field">
        <label>
            Description<span style={requiredSpanStyle}>*</span>
        </label> 
         <RequiredTextArea  placeholder="Description" ref="description" value={desc} />
    </div><div className="ui divider"></div>
    <div className="field" style={dropDownLabelStyle}>
        <label>
            Location<span style={requiredSpanStyle}>*</span>
        </label>
         <Select2 placeholder="Location" style={dropdownStyle} ref="location" valueField="Id" textField="Name" data={this.props.locations} value={location} />
    </div><div className="ui divider"></div>
    <div className="field">
        <label>
            Path<span style={requiredSpanStyle}>*</span>
        </label>
        <RequiredTextbox placeholder="Path"  ref="path" value={path}/> 
    </div><div className="ui divider"></div>
    <div className="field" style={dropDownLabelStyle}>
        <label>
            Priority<span style={requiredSpanStyle}>*</span>
        </label>
        <Select2 style={dropdownStyle} placeholder="Priority" id="priority" valueField="value" textField="text" ref="priority" data={priorityList} value={priority} />
     
    </div><div className="ui divider"></div>
    <div className="inline field">
        <button className="ui blue mini button">
    Submit
    </button>
        <Link className="ui black mini button" href="/Resources">Cancel</Link>
    </div>
    </form>  

    }
});

module.exports = ResourceForm;