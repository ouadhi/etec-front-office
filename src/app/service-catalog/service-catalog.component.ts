import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../services.service';
import { FilterPipe } from 'ngx-filter-pipe';
import { Input, Output, EventEmitter } from '@angular/core';

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
  segments_inline_array:Array<string> = [];

  tags:any[];
  tagsInput:object;
  tags_inline_array:Array<string> = [];
  
  public keyword:string;
  dataFilters:any = {

  }


  constructor(private servicesService: ServicesService,public filterPipe:FilterPipe) { }

  ngOnInit() {

    this.servicesService.getSegments().subscribe(data=>{
      this.segments = data.entries
    },()=>{},()=>{
      this.segments.forEach( (element,i) => {
        if(element.activation){
            let newObj = {};
            newObj[element._id]= false
            this.segmentInput = {...this.segmentInput, ...newObj};
        }
      });
      

    });

    this.servicesService.getSegmentType().subscribe(data=>{
      this.segmentType = data.entries
    });

    this.servicesService.getDepartments().subscribe(data=>{
      this.departments = data.entries
    });

    this.servicesService.getTags().subscribe(data=>{
      this.tags = data.entries;
    },()=>{},()=>{

      this.tags.forEach( (element,i) => {
        let newObj = {};
        newObj[element._id]= false
        this.tagsInput = {...this.tagsInput, ...newObj};
      });
      
    });

    this.servicesService.getCategories().subscribe(data=>{
      this.categories = data.entries
    });


    this.mostUsed();
    //this.resetFilters();
    this.search();  
  
  }



  mostUsed(){
    this.dataMostUsed=[];
    this.servicesService.getServices().subscribe(data=>this.dataMostUsed = data.entries);
  }


  resetFilters(withDepartmentAndCategory?){

    let category_temp = this.dataFilters.category_inline;
    let department_temp = this.dataFilters.department_inline;

    this.keyword="";
    this.dataFilters= {}
    this.tagsInput=[]
    this.filterTag();
    this.segmentInput=[]
    this.filterSegment();

    if(withDepartmentAndCategory ==false){
      if (category_temp !=null)
      this.dataFilters.category_inline = category_temp;
      if(department_temp !=null)
       this.dataFilters.department_inline =department_temp;
    }
  }

  search(){

    this.servicesService.getServices().subscribe(data=>  
      {
        this.data = data.entries;
        this.totalResult = data.entries.length
      },()=>{},()=>{
        

        // transform data structure
         this.data.forEach( (element,i) => {

          // change segment object to array with new key
          let segments_inline=[];
          if(element.beneficiaries.length>0){
            element.beneficiaries.forEach(element2 => {
              segments_inline.push(element2._id);
            });
          }
          this.data[i]['segments_inline']= segments_inline;

          // change tag object to array with new key
          let tags_inline=[];
          if(element.tag.length>0){
            element.tag.forEach(element2 => {
              tags_inline.push(element2._id);
            });
          }
          this.data[i]['tags_inline']= tags_inline;

          if(element.category){
            // change category object to array with new key
            this.data[i]['category_inline']= element.category._id;
            // change department object to array with new key
            this.data[i]['department_inline']= element.category.department._id;
          }

        });


      }
    );
  }


  filter(){  
  }


  isEmptyFilters(){
    if(Object.keys(this.dataFilters).length === 0){
      return true;
    }
  }

  showAll(){
    this.resetFilters(false);
  }

  department(_id?){
    if(_id){
    this.dataFilters.department_inline=_id;
    }else{
    this.dataFilters.department_inline=null;
    }
    this.category();
  }

  category(_id?){
    if(_id){
    this.dataFilters.category_inline=_id;
    }else{
    this.dataFilters.category_inline=null;
    }
  }

  filterSegment(){

    // clear array
    while (this.segments_inline_array.length) { this.segments_inline_array.pop(); }
     
    // convert to array
    for (var key in this.segmentInput) {
      if (this.segmentInput.hasOwnProperty(key)) {
        // only if checked
        if(this.segmentInput[key] ==true){    
          this.segments_inline_array.push(key)
        }
      }
    }

    if(this.segments_inline_array.length>0){
      this.dataFilters.segments_inline = {$or:this.segments_inline_array}
    }else{
      this.dataFilters.segments_inline= null;
    }

  }

  filterTag(){
    // clear array content
    while (this.tags_inline_array.length) { this.tags_inline_array.pop(); }
    // convert to array
    for (var key in this.tagsInput) {
      if (this.tagsInput.hasOwnProperty(key)) {
          //only if checked
          if(this.tagsInput[key] ==true){    
            this.tags_inline_array.push(key)
        }
      }
  }

  if(this.tags_inline_array.length>0){
    this.dataFilters.tags_inline = {$or:this.tags_inline_array}
  }else{
    this.dataFilters.tags_inline= null;
  }

  }


  changeKeyword(){
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




}
