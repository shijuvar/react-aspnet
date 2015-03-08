/**@jsx React.DOM*/

var React = require('react'); 

var Select2 = React.createClass({ 
    getInitialState: function(){
        return {value : this.props.value, valid: this.props.value && this.props.value.length > 0};
    },
    onChange: function(e){
        this.setState({value:e.target.value, valid : e.target.value.length > 0});
    },
    render: function () { 

        var styles ={
            width: '100%',
            padding: 5,
            borderRadius: 3,
            border: '1 solid rgba(0, 0, 0, 0.15)'
        };

        var options = function(component){
            if (component.props && component.props.data) {
                return component.props.data.map(function(d){
                    return <option key={d[component.props.valueField]} value={d[component.props.valueField]}>{d[component.props.textField]}</option>;
                });
            }

            return ;
        }(this); 

        return this.transferPropsTo(<select style={styles} value={this.state.value} onChange={this.onChange}><option value="">--Select--</option>{options}</select>);
}
});



module.exports = Select2;