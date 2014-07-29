/**@jsx React.DOM*/

var React = require('react');

var InformationModal = React.createClass({

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

        return <div onClick={this.handleBackDropClick}>
                 <i className="close icon"></i>
                 <div className="header" style={headerStyle}>
                {this.props.header}
                 </div>
                 <div className="content">
                    {this.props.content}
                 </div>
               </div>;
    }
});


module.exports = InformationModal;