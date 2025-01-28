import { Injectable } from '@angular/core';
import { Router, NavigationEnd, ActivatedRouteSnapshot } from '@angular/router';
import { BehaviorSubject, filter } from 'rxjs';
export interface Breadcrumb {
  label: string;
  url: string;
}
@Injectable({
  providedIn: 'root'
})

export class BreadcrumbService {

  private breadcrumbs = new BehaviorSubject<Breadcrumb[]>([]);
  breadcrumbs$ = this.breadcrumbs.asObservable();

  constructor(private router: Router) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        const root = this.router.routerState.snapshot.root;
        const breadcrumbs = this.createBreadcrumbs(root);
        this.breadcrumbs.next(breadcrumbs);
      });
  }

  private createBreadcrumbs(route: ActivatedRouteSnapshot, url: string = '', breadcrumbs: Breadcrumb[] = []): Breadcrumb[] {
    const routeUrl: string = route.url.map(segment => segment.path).join('/');
    const nextUrl = routeUrl ? `${url}/${routeUrl}` : url;

    // Check if breadcrumb data exists
    if (route.data['breadcrumb']) {
      breadcrumbs.push({
        label: route.data['breadcrumb'],
        url: nextUrl,
      });
    }

    if (route.firstChild) {
      return this.createBreadcrumbs(route.firstChild, nextUrl, breadcrumbs);
    }

    return breadcrumbs;
  }

}
