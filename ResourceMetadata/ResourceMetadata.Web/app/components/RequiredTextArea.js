/**@jsx React.DOM */

var React = require('react');
var Addons = require('react-addons');

var RequiredTextArea = React.createClass({

    getInitialState: function(){
        return {value :this.props && this.props.value , valid : this.props && this.props.value && this.props.value.length};
    },
    _onChange:function(e){
        this.setState({value:e.target.value, valid:e.target.value.length});
    },
    render: function () {

        var controlClass = Addons.classSet({
            "ng-invalid-required":!this.state.valid,
            "ng-valid-required":this.state.valid
        });

        return this.transferPropsTo(<textarea onChange={this._onChange} className={controlClass} value={this.state.value} />);
}

});


module.exports = RequiredTextArea;

