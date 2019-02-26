import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable} from 'rxjs';
import { LifeCycleService } from './config';

@Injectable({
  providedIn: 'root'
})

export class ServicesService {

  constructor(
    private http: HttpClient) { }
  

  getCollectionAll(collection:string):Observable<any> {
    return this.http.post<any[]>(
      `http://localhost:8080/api/collections/get/${collection}/`,{"populate": 1});
  }

  getCollectionAllActive(collection:string,activeKey,activeVal):Observable<any> {

    let filter={};
    filter[activeKey]= activeVal;
    console.log(filter);

    return this.http.post<any[]>(
      `http://localhost:8080/api/collections/get/${collection}/`,{
        filter,
        "populate": 1
      });
  }

  getCollectionEntryById(collection:string,filterKey:string,id:any):Observable<any> {
    return this.http.post<any[]>(
      `http://localhost:8080/api/collections/get/${collection}/`,
      {
        "filter":{
          "_id": `${id}`
        },
        "populate": 1
      },
      {});
  }

  getService(id){
    return this.getCollectionEntryById('Service','_id',id);
  }

  getServices(){
    return this.getCollectionAllActive('Service','lifeCycle',LifeCycleService.PUBLISHED)
  }

  getTags(){
    return this.getCollectionAll('tags');
  }

  getSegments(){
    return this.getCollectionAllActive('segment','activation',true);
  }

  getSegmentType(){
    return this.getCollectionAllActive('segmentType','activation',true);
  }

  getDepartments(){
    return this.getCollectionAllActive('department','activation',true);
  }

  getCategories(){
    return this.getCollectionAllActive('category','activation',true);
  }

  

  getComments(serviceId){
      return this.http.post<any>(
        `http://localhost:8080/api/collections/get/comments/`,
        {
          "filter":{
            "serviceName._id": `${serviceId}`
          },
          "populate": 0
        },{})};

  getSegmentsByIds(ids:Array<string>):Observable<any> {
    let body = [];
    ids.forEach(element => {
      body.push({"_id": element})
    });

    return this.http.post<any[]>(
      `http://localhost:8080/api/collections/get/segment/`,
      {
        "filter":{
          "$or": body
        },
        "populate": 1
      },
      {});
  }

  search(keyword:string):Observable<any> {
    let body:object;
    body = {
    "filter":{
      "$or": []
    },
    "limit": 100,
    "populate": 1
    };

    // keyword prepare
    let findKeywordOn:Array<string> = ['serviceName_ar','description_ar','tag']
    findKeywordOn.forEach(element => {
      body['filter']['$or'].push({element:{"$regex": keyword} })
    });

    // tags.forEach(element => {
    //   body['filter']['$or'].push({"tag._id": element})
    // });

    //body['filter']['$and'].push({"lifeCycle":"Published"}) //@TODO filter inactive
    //body['filter']['$or'].push({"department._id":{"$eq": category}})

    
    

    return this.http.post<any[]>(
      `http://localhost:8080/api/collections/get/Service/`,body,{});
  }


  

  getRequest(id:string):Observable<any[]> {
    return this.http.get<any[]>(
      `http://localhost:8080/api/collections/get/${id}/`);
  }

}
