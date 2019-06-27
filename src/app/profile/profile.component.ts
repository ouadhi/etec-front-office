import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../services.service';
import { SwitchLangService } from '../switch-lang.service';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  profileId:string;
  data: any;

  constructor(
    private route:ActivatedRoute,
    private servicesService:ServicesService,
    public trans:SwitchLangService
    ) { }

    ngOnInit() {
      this.route.params.subscribe(params => {
         this.profileId = params['id']; 
         this.loadProfile(this.profileId);
      });
    }

    loadProfile(id){
      this.servicesService.getProfile(id).subscribe(
        (data)=>{
          this.data = data;
        })
    }

}
