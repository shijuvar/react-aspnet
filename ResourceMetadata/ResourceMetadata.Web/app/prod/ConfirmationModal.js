/** @jsx React.DOM*/

var React = require("react");
var $ = require('jquery-browserify'); 

var ConfirmationModal = React.createClass({displayName: 'ConfirmationModal',

    showModal:function(){
        $('#' + scope.id).modal('show');
    },
    hideModal:function(){
        $('#' + scope.id).modal('hide');
    },
    render:function(){
        var mainCss ={
            marginTop:-110
        };

        return (            
            React.DOM.div( {className:"ui small modal", style:mainCss}, 
            React.DOM.div( {className:"header"}, 
              "Confirm"
            ),
            React.DOM.div( {className:"content"}, 
            "Do you want to proceed?"
            ),
            React.DOM.div( {className:"actions"}, 
                React.DOM.div( {className:"ui small negative button"}, 
                    "No"
                ),
                React.DOM.div( {className:"ui small positive right labeled icon button"}, 
                    "Yes ", React.DOM.i( {className:"checkmark icon"})
                )
            )
            )
            );
}
});


module.exports = ConfirmationModal;