import { 
	Component,
	Input
} from 'angular2/core';

import { ROUTER_DIRECTIVES, Router, Location } from 'angular2/router';

@Component({
  selector: 'app-nav',
  directives: [ROUTER_DIRECTIVES],
  templateUrl: 'html/nav.component.html'
})

export class NavComponent { 

	@Input()
  routes: string[];

	router: Router;
  location: Location;

  constructor(router: Router, location: Location) {
      this.router = router;
      this.location = location;
  }

  isSelected(path) {
    if(path === this.location.path()){
        return true;
    }
    else if(path.length > 0){
        return this.location.path().indexOf(path) > -1;
    }
  }

}