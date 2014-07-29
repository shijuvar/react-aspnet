/**@jsx React.DOM*/

var React = require('react');
var $ = require('jquery-browserify');
var select2 = require('select2-browserify');

var Select2 = React.createClass({displayName: 'Select2',
    componentDidMount: function(){
        var node = this.getDOMNode();
        $(node).select2();
    },
    getInitialState: function(){
        return {value : this.props.value, valid: this.props.value && this.props.value.length > 0};
    },
    onChange: function(e){
        this.setState({value:e.target.value, valid : e.target.value.length > 0});
    },
    render: function () {

        var options = function(component){
            if (component.props && component.props.data) {
                return component.props.data.map(function(d){
                    return React.DOM.option( {key:d[component.props.valueField], value:d[component.props.valueField]}, d[component.props.textField]);
                });
            }

            return ;
        }(this);
        


        return this.transferPropsTo(React.DOM.select( {value:this.state.value, onChange:this.onChange}, React.DOM.option( {value:""}, "--Select--"),options));
}
});



module.exports = Select2;