import { provide } from 'angular2/core';

import { 
	bootstrap, 
	bind 
} from 'angular2/platform/browser'

import { 
	ROUTER_PROVIDERS, 
	LocationStrategy, 
	PathLocationStrategy 
} from 'angular2/router';

import { AppComponent } from './app.component'


bootstrap(AppComponent, [
	ROUTER_PROVIDERS, 
	provide(
		LocationStrategy, 
		{ useClass: PathLocationStrategy }
	)
]);