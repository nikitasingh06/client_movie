import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { Router, NavigationExtras } from '@angular/router';

@Injectable()
export class AuthService implements CanActivate {
    constructor(private route: Router) { }
    canActivate(route: ActivatedRouteSnapshot) {
        var x = route.data;
        if (x[0].type == localStorage.getItem("type")) {
            return true;
        }
        else {
            this.route.navigate(['/login'])
            return false;
        }
    }
}