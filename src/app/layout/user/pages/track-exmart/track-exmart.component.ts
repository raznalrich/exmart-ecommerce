import { ActivatedRoute, RouterLink } from '@angular/router';
import { Component } from '@angular/core';
import { OdertrackingTableComponent } from "../../ui/odertracking-table/odertracking-table.component";
import { ApiServiceService } from '../../../../services/api-service.service';

@Component({
  selector: 'app-track-exmart',
  standalone: true,
  imports: [RouterLink, OdertrackingTableComponent],
  templateUrl: './track-exmart.component.html',
  styleUrl: './track-exmart.component.scss'
})
export class TrackExmartComponent {
  id:any;
constructor(public api: ApiServiceService, private route: ActivatedRoute) {}
ngOninit(){
  this.id = this.route.snapshot.paramMap.get('id');
    console.log(this.id);

}
}
