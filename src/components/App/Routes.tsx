import React from 'react';
import { Redirect, Route as RouteComp, Switch } from 'react-router-dom';
import { PageError } from 'shared/components/PageError';
import { Authentication } from '../Auth';
import { Calendar } from '../Calendar';
import { Route } from '../../util/route.enum';
import Workplaces from 'components/Workplaces';
import WorkplaceDetails from 'components/WorkplaceDetails';

export const Routes = () => (
  <Switch>
    <Redirect exact from={Route.Root} to={Route.Calendar} />
    <RouteComp path={Route.Authentication} component={Authentication} />
    <RouteComp path={`${Route.Workplaces}/:id`} component={WorkplaceDetails} />
    <RouteComp path={Route.Workplaces} component={Workplaces} />
    <RouteComp path={Route.Calendar} component={Calendar} />
    <RouteComp component={PageError} />
  </Switch>
);
