import { 
  Component,
  Injectable,
  Input,
  Type
} from 'angular2/core';

import { 
  Route,
  Router,
  RouteConfig,
  RouteRegistry,
  ROUTER_DIRECTIVES,
  Location,
  LocationStrategy,
  PathLocationStrategy
} from 'angular2/router';

import { NavComponent } from './nav.component';
import { HomeComponent } from './home.component';
import { TestComponent } from './test.component';
import { Test2Component } from './test2.component';

// Source: https://github.com/mgechev/dynamic-route-creator/blob/master/app/components/app/app.ts
@Injectable()
class DynamicRouteConfigurator {
  constructor(private registry: RouteRegistry) {}
  addRoute(component: Type, route) {
    let routeConfig = this.getRoutes(component);
    routeConfig.configs.push(route);
    this.updateRouteConfig(component, routeConfig);
    this.registry.config(component, route);
  }
  getRoutes(component: Type) {
    return Reflect.getMetadata('annotations', component)
      .filter(a => {
        return a.constructor.name === 'RouteConfig';
      }).pop();
  }
  updateRouteConfig(component: Type, routeConfig) {
    let annotations = Reflect.getMetadata('annotations', component);
    let routeConfigIndex = -1;
    for (let i = 0; i < annotations.length; i += 1) {
      if (annotations[i].constructor.name === 'RouteConfig') {
        routeConfigIndex = i;
        break;
      }
    }
    if (routeConfigIndex < 0) {
      throw new Error('No route metadata attached to the component');
    }
    annotations[routeConfigIndex] = routeConfig;
    Reflect.defineMetadata('annotations', annotations, AppComponent);
  }
}

@Component
({
  selector: 'app',
  viewProviders: [DynamicRouteConfigurator],
  directives: [NavComponent, ROUTER_DIRECTIVES],
  templateUrl: 'html/app.component.html'
})

@RouteConfig([
  new Route ({ path: '/home', name: "Home", component: HomeComponent, useAsDefault: true }),
  new Route ({ path: '/test', name: "Test", component: TestComponent }),
  new Route ({ path: '/test2', name: "Test2", component: Test2Component })
])

export class AppComponent { 

  title: string;

  router: Router;
  location: Location;

  appRoutes: string[][];

  constructor(router: Router, location: Location, private dynamicRouteConfigurator: DynamicRouteConfigurator) {
    this.title = 'Angular2 Routing Example';
    this.router = router;
    this.location = location;

    this.appRoutes = this.getAppRoutes();
  }

  private getAppRoutes(): string[][] {
    return this.dynamicRouteConfigurator.getRoutes(this.constructor).configs.map(route => {
        return { path: [`/${route.name}`], name: route.name };
      });
  }
}
