/** @jsx React.DOM */

var React = require('react');
var Router = require('react-router-component');
var HomePage = require('./HomePage');
var ResourcesPage = require('./ResourcesPage');
var ResourceAddPage = require('./ResourceAddPage');
var ResourceEditPage = require('./ResourceEditPage');
var LocationsPage = require('./LocationsPage');
var LocationAddPage = require('./LocationAddPage');
var LocationEditPage = require('./LocationEditPage');
var ActivitiesPage = require('./ActivitiesPage');
var ResourceDetailsPage = require('./ResourceDetailsPage');
var ActivityAddPage = require('./ActivityAddPage');
var NotFoundPage = require('./NotFoundPage');
var Locations  = Router.Locations;
var Location =Router.Location;
var NotFound = Router.NotFound;

var ContentRouter = React.createClass({
    render: function () {
        return (
            <Locations>
              <Location path= "/Index.html" handler= {HomePage} />
              <Location path= "/" handler= {HomePage }/>
              <Location path= "/Home" handler= {HomePage}/>
              <Location path= "/Resources" handler= {ResourcesPage}/>
              <Location path= "/Locations" handler= {LocationsPage}/>
              <Location path= "/Locations/Add" handler={LocationAddPage}/>
              <Location path= "/Locations/Edit/:locationId" handler={LocationEditPage}/>
              <Location path= "/Resources/Add" handler={ResourceAddPage}/>
              <Location path= "/Resources/Edit/:id" handler={ResourceEditPage}/>
              <Location path= "/Resources/Details/:id" handler={ResourceDetailsPage}/>
              <Location path= "/Activities" handler={ActivitiesPage}/>
              <Location path= "/Activities/Add/:resourceId" handler={ActivityAddPage}/>     
             <NotFound handler={NotFoundPage} />
            </Locations>
            )
}

});

module.exports = ContentRouter;