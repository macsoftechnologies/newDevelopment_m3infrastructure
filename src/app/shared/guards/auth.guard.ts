import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from "@angular/router";
import { JwtAuthService } from "../services/auth/jwt-auth.service";

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private jwtAuth: JwtAuthService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    if (this.jwtAuth.isLoggedIn()) {
      const secretKeyValue = localStorage.getItem('m3infrastructure_secretkey');
      if (secretKeyValue === 'm3infrastructure') {
        return true;
      } else {
        this.router.navigate(["/sessions/signin"], {
          queryParams: {
            return: state.url
          }
        });
        return false;
      }
      // return true;
    } else {
      this.router.navigate(["/sessions/signin"], {
        queryParams: {
          return: state.url
        }
      });
      return false;
    }
  }
}
