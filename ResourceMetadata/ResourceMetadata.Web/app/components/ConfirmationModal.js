/** @jsx React.DOM*/

var React = require("react");
var $ = require('jquery-browserify'); 

var ConfirmationModal = React.createClass({

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
            <div className="ui small modal" style={mainCss}>
            <div className="header">
              Confirm
            </div>
            <div className="content">
            Do you want to proceed?
            </div>
            <div className="actions">
                <div className="ui small negative button">
                    No
                </div>
                <div className="ui small positive right labeled icon button">
                    Yes <i className="checkmark icon"></i>
                </div>
            </div>
            </div>
            );
}
});


module.exports = ConfirmationModal;