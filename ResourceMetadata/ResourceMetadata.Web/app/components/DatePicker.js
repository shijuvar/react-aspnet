/**@jsx React.DOM*/

var React = require('react');
var Router = require('react-router-component');
var Addons = require('react-addons');
var jquery = require('jquery-browserify');
var jqueryui = require('jquery-ui-browserify');

var DatePicker = React.createClass({
    componentDidMount: function(){
        var element = this.getDOMNode();
        var dPicker = $(element).datepicker({
            maxDate:this.props.maxDate ,
            onSelect: function(d){
                this.setState({value:d , valid:d.length });
            }.bind(this)
        });
    },
    getInitialState: function(){
        return {value : this.props.value , valid : !this.props.required || this.props.required && this.props.value};
    },
    onChange: function(e){
        this.setState({ value: e.target.value, valid:e.target.value.length});
    },
    render: function () {

        var controlClass = Addons.classSet({
            "ng-invalid-required":!this.state.valid,
            "ng-valid-required":this.state.valid
        });
        
        return this.transferPropsTo(<input type="text" className={controlClass} onChange={this.onChange} value={this.state.value} />);
}
});

module.exports = DatePicker;