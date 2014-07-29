/**@jsx React.DOM*/

var React = require('react');

var InformationModal = React.createClass({displayName: 'InformationModal',

    getDefaultProps: function(){
        return {header:'Modal header', content: 'Modal content'};
    },
    componentDidMount: function(){
        //var element =this.getDOMNode();
        //$(element).modal("show");
    },
    componentWillUnmount: function(){
        console.log("componentWillUnmount");
    },
    handleBackDropClick: function(e){
        console.log('handleBackDropClick');
    },
    render: function () {
        var headerStyle ={
            fontSize:"1em !important"
        };

        return React.DOM.div( {onClick:this.handleBackDropClick}, 
                 React.DOM.i( {className:"close icon"}),
                 React.DOM.div( {className:"header", style:headerStyle}, 
                this.props.header
                 ),
                 React.DOM.div( {className:"content"}, 
                    this.props.content
                 )
               );
    }
});


module.exports = InformationModal;