import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../services.service';
import { FilterPipe } from 'ngx-filter-pipe';
import { Input, Output, EventEmitter } from '@angular/core';
import {RequestsService} from '../requests.service';
import {IImage} from 'ng-simple-slideshow'
import { environment } from 'src/environments/environment';
import { KeycloakService } from 'keycloak-angular';
import { SwitchLangService } from './../switch-lang.service';

@Component({
  selector: 'app-service-catalog',
  templateUrl: './service-catalog.component.html',
  styleUrls: ['./service-catalog.component.css']
})
export class ServiceCatalogComponent implements OnInit {

  dataMostUsed:any;
  data: any[];
  totalResult:number;

  departments:object;
  categories:object; 

  segments:any[];
  segmentType:object;
  segmentInput:object;

  tags:any[];
  tagsInput:object;
  
  public keyword:string;

  dataFilters:any = {
    category: { _id: null, department: { _id: null } },
    segments_inline:{},
    tags_inline:{}
  }

  public imagesSlider:IImage[];


  userSegments:string[]=[];

  constructor(
    private servicesService: ServicesService,
    public filterPipe:FilterPipe,
    private keycloakService:KeycloakService, 
    private requestsService:RequestsService,
    public trans:SwitchLangService
    ) { }

  ngOnInit() {

    this.loadBanners();
    this.mostUsed();

    this.search()
    this.prepareFiltersFetch();  //this.prepareFilters(this.userSegments);
  
  }

  loadBanners(){
    this.servicesService.getBanners().subscribe(data=>{

      this.imagesSlider=[];
      data.entries.forEach(element => {
        let item={
        url :`${environment.cms.api.assets}${element.url.path}`,
        href : element.href
      }
          
        this.imagesSlider.push(item)
      });

    });
  }

  mostUsed(){
    this.dataMostUsed=[];
    this.servicesService.getServices().subscribe(data=>this.dataMostUsed = data.entries);
  }


  // prepare filter to be displayed
  prepareFilters(userSegments){

    this.servicesService.getSegments().subscribe(data=>{
      this.segments = data.entries;
      
      this.segments.forEach( (element,i) => {
        if(element.activation){
            let newObj = {};
            if(userSegments.includes(element._id)){
              newObj[element._id]= true
            }else{
              newObj[element._id]= false
            }
            this.segmentInput = {...this.segmentInput, ...newObj};
        }
      });

      this.filterSegment();
      
    });

    this.servicesService.getSegmentType().subscribe(data=>{
      this.segmentType = data.entries
    });

    this.servicesService.getDepartments().subscribe(data=>{
      this.departments = data.entries
    });

    this.servicesService.getTags().subscribe(data=>{
      this.tags = data.entries;

      this.tags.forEach( (element,i) => {
        let newObj = {};
        newObj[element._id]= false
        this.tagsInput = {...this.tagsInput, ...newObj};
      });
    });

    this.servicesService.getCategories().subscribe(data=>{
      this.categories = data.entries
    });

    return true;

  }

  // get search from server-side Plus transform result object 
  // and add two new keys : 1st (segments_inline -> for beneficiaries), 2nd (tags_inline -> for tags)
  search(){

    this.servicesService.getServices().subscribe(data=>  
      {
        this.data = data.entries;
        this.totalResult = data.entries.length;

        // transform data structure
        this.data.forEach( (element,i) => {

          // change segment object to array with new key
          let segments_inline=[];
          if(element.beneficiaries.length>0){
            element.beneficiaries.forEach(element2 => {
              segments_inline[element2._id]=true;
            });
          }
          this.data[i]['segments_inline']= segments_inline;

          // change tag object to array with new key
          let tags_inline=[];
          if(element.tag.length>0){
            element.tag.forEach(element2 => {
              tags_inline[element2._id]=true;
            });
          }
          this.data[i]['tags_inline']= tags_inline;

        });

      }
    );
  }

  // action filter for department
  filterDepartment(_id?){
    if(_id){
      this.dataFilters.category.department._id=_id;
    }else{
      this.dataFilters.category.department._id =null;
    }
    this.filterCategory();
  }

  // action filter for category
  filterCategory(_id?){
    if(_id){
      this.dataFilters.category._id=_id;
    }else{
      this.dataFilters.category._id=null;
    }
  }

  // action filter for segment(beneficiaries)
  filterSegment(){
    // clear array
    this.dataFilters.segments_inline={}
     
    // convert to array
    for (var key in this.segmentInput) {
      if (this.segmentInput.hasOwnProperty(key)) {
        // only if checked
        if(this.segmentInput[key] ==true){  
          this.dataFilters.segments_inline[key] = true
        }
      }
    }

  }

  // action filter for tags
  filterTag(){
    // clear array content
    this.dataFilters.tags_inline= {}

    // convert to array
    for (var key in this.tagsInput) {
      if (this.tagsInput.hasOwnProperty(key)) {
          //only if checked
          if(this.tagsInput[key] ==true){    
            this.dataFilters.tags_inline[key] = true
        }
      }
    }

  }

  // action filter for keyword
  filterKeyword(){
    this.dataFilters.$or = [ 
      { _id: this.keyword },
      { serviceName_ar: this.keyword },
      { serviceName_en: this.keyword },
      { description_ar: this.keyword },
      { description_en: this.keyword },
      { primaryService_ar: this.keyword },
      { primaryService_en: this.keyword },
      { conditionsAndRequirements_ar: this.keyword },
      { conditionsAndRequirements_en: this.keyword },
      { requiredDocs_ar: this.keyword },
      { requiredDocs_en: this.keyword }
    ]
  }

  // reset filters
  resetFilters(){
    this.keyword="";
    this.filterKeyword();
    this.dataFilters.segments_inline={},
    this.dataFilters.tags_inline={}
    
    this.tagsInput=[]
    this.segmentInput=[]
  }

  //apply filter for loggedIn user
  async prepareFiltersFetch(){

    if (await this.keycloakService.isLoggedIn()) {
      
      this.requestsService.getListOfUserSegments().subscribe(data=>{
        this.userSegments = data;
        this.prepareFilters(this.userSegments);
      },err=>{
        this.prepareFilters(this.userSegments);
      });
      
    }
    else{
      this.prepareFilters(this.userSegments);
    }
    
    

  }

}