/** @jsx React.DOM */

var React = require('react');
var Router = require('react-router-component');
var HomePage = require('app/components/HomePage');
var ResourcesPage = require('app/components/ResourcesPage');
var ResourceAddPage = require('app/components/ResourceAddPage');
var ResourceEditPage = require('app/components/ResourceEditPage');
var LocationsPage = require('app/components/LocationsPage');
var LocationAddPage = require('app/components/LocationAddPage');
var LocationEditPage = require('app/components/LocationEditPage');
var ActivitiesPage = require('app/components/ActivitiesPage');
var ResourceDetailsPage = require('app/components/ResourceDetailsPage');
var ActivityAddPage = require('app/components/ActivityAddPage');
var NotFoundPage = require('app/components/NotFoundPage');
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