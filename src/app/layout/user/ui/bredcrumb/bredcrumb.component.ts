import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterLinkActive, RouterModule } from '@angular/router';
import { distinctUntilChanged, filter, map } from 'rxjs';
import { BreadcrumbService,Breadcrumb } from '../../../../breadcrumb.service';


@Component({
  selector: 'app-bredcrumb',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './bredcrumb.component.html',
  styleUrl: './bredcrumb.component.scss'
})
export class BredcrumbComponent implements OnInit {
  breadcrumbs: Breadcrumb[] = [];

  constructor(private breadcrumbService: BreadcrumbService) {}

  ngOnInit(): void {
    this.breadcrumbService.breadcrumbs$.subscribe(breadcrumbs => {
      this.breadcrumbs = breadcrumbs;
    });
  }

}
