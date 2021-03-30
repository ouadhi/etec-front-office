import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LifeCycleService } from './life-cycle-service.config';
import { environment } from '../../../environments/environment';
import { DatePipe } from '@angular/common';
import { LoggerService } from 'src/app/core/services/logger.service';

@Injectable({ providedIn: 'root' })

export class ServicesService {

  constructor(
    private http: HttpClient,
    private loggerService: LoggerService) { }

  getCMSheaders() {
    let headers: HttpHeaders = new HttpHeaders();
    // headers = headers.append('Authorization', 'Bearer ' + environment.cms.portalUserToken);
    return headers;
  }


  getCollectionAll(collection: string): Observable<any> {
    return this.http.post<any[]>(
      `${environment.cms.api.master}/api/collections/get/${collection}/`, { "populate": 1 }, {
      headers: this.getCMSheaders()
    });
  }

  getCollectionAllActive(collection: string, activeKey, activeVal): Observable<any> {

    let filter = {};
    filter[activeKey] = activeVal;
    this.loggerService.log(filter);



    return this.http.post<any[]>(
      `${environment.cms.api.master}/api/collections/get/${collection}/`, {
      filter,
      "populate": 1,
      "sort": { "_o": 1 }
    }, {
      headers: this.getCMSheaders()
    });
  }

  getCollectionEntryById(collection: string, filterKey: string, id: any): Observable<any> {
    return this.http.post<any[]>(
      `${environment.cms.api.master}/api/collections/get/${collection}/`,
      {
        "filter": {
          "_id": `${id}`
        },
        "populate": 1
      }, {
      headers: this.getCMSheaders()
    });
  }

  getService(id) {
    return this.getCollectionEntryById('Service', '_id', id);
  }

  getServices() {
    return this.getCollectionAllActive('Service', 'lifeCycle', LifeCycleService.PUBLISHED)
  }

  getTags() {
    return this.getCollectionAll('tags');
  }

  getSegments() {
    return this.getCollectionAllActive('segment', 'activation', true);
  }

  getSegmentType() {
    return this.getCollectionAllActive('segmentType', 'activation', true);
  }

  getDepartments() {
    return this.getCollectionAllActive('department', 'activation', true);
  }

  getCategories() {
    return this.getCollectionAllActive('category', 'activation', true);
  }

  getBanners() {
    return this.getCollectionAllActive('bannerSlider', 'activation', true);
  }

  getOpportunity(id) {
    return this.getCollectionEntryById('opportunity', '_id', id);
  }

  postOpportunity(formData): Observable<any> {
    return this.http.post<any[]>(
      `${environment.cms.api.master}/api/collections/save/opportunity/`,
      {
        "data": {
          "name": formData.jobTitle,
          "number": formData.id,
          "city": formData.city,
          "employer": formData.organization,
          "description": formData.description,
          "salaryType": formData.salaryNegotiation,
          "salaryAmount": formData.opportunityDetailsPanelColumnsExpectedSalaryinSar,
          "from": formData.applicationStartDate,
          "to": formData.applicationEndDate,
          "education": formData.educationLevel,
          "vacancies": formData.opportunityDetailsPanelColumnsPositionsCounts,
          "requirements": formData.requirements,
          "qualifications": formData.qualifications,
          "certificates": formData.certificates,
          "yearsOfExperience": formData.requiredExperienceYears,
          "notes": formData.notes,
          "branchId": formData.branchId,
          "_cityName": formData._cityName,
          "_cityId": formData._cityId
        }
      }, {
      headers: this.getCMSheaders()
    });
  }

  applyOpportunity(formData): Observable<any> {
    return this.http.post<any[]>(
      `${environment.cms.api.master}/api/collections/save/opportunitySubmit/`,
      {
        "data": {
          "isCurrentlyEmployed": formData.currentlyWorking,
          //"currentEmployer": formData.,
          //"sectorType": formData.,
          //"currentTitle": formData.,
          "educationAndMajor": formData.specialization,
          "major": formData.educationalQualification,
          "educationPlace": formData.educationalOrganization,
          "graduationYear": formData.graduationYear,
          "graduationScore": formData.gpa,
          "yearOfExperienceSameTitle": formData.experienceYearsPosition,
          "yearOfExperienceOtherTitles": formData.otherExperienceYears,
          "englishLevel": formData.englishLevel,
          "computerSkillsLevel": formData.computerSkillsLevel,
          "cv": formData.cv[0],
          "linkedinProfile": formData.linkedInProfile,

          "branchId": formData.branchId,
          "candidate": formData.candidate,
          "opportunityId": formData.opportunityId,
          "_fullName": formData._fullName,
          "_mobile": formData._mobile,
          "_nationalId": formData._nationalId,
          "_birthDate": formData._birthDate
        }
      }, {
      headers: this.getCMSheaders()
    });
  }


  appliedOpportunity(id): Observable<any> {
    return this.getCollectionEntryById('opportunitySubmit', '_id', id);
  }

  getAllOpportunitiesAvailForToday(branchId, params?): Observable<any> {
    let sendParams = {
      "filter": {
      },
      "populate": 1
    }

    if (branchId !== false) {
      sendParams.filter["branchId"] = `${branchId}`
    }

    const todayDate = new DatePipe('en-US').transform(Date.now(), 'yyyy-MM-dd');

    if (params.number && params.number.length) { sendParams["filter"]["number"] = `${params.number}` };
    if (params.name && params.name.length) { sendParams["filter"]["name"] = `${params.name}` };
    if (params.city && params.city.length) { sendParams["filter"]["city"] = `${params.city}` };
    if (params.employer && params.employer.length) { sendParams["filter"]["employer"] = `${params.employer}` };

    if (params.sortBy && params.sortDirection) {
      sendParams["sort"] = {}
      if (params.sortDirection == 'desc') {
        sendParams["sort"][params.sortBy] = -1
      } else {
        sendParams["sort"][params.sortBy] = 1
      }
    }

    return this.http.post<any[]>(
      `${environment.cms.api.master}/api/collections/get/opportunity/`,
      sendParams, {
      headers: this.getCMSheaders()
    });
  }

  getApplicants(opportunityId): Observable<any> {

    return this.http.post<any[]>(
      `${environment.cms.api.master}/api/collections/get/opportunitySubmit/`,
      {
        "filter": {
          "opportunityId": `${opportunityId}`
        },
        "populate": 1
      }, {
      headers: this.getCMSheaders()
    });
  }
  getApplicantById(opportunityId, userId): Observable<any> {

    return this.http.post<any[]>(
      `${environment.cms.api.master}/api/collections/get/opportunitySubmit/`,
      {
        "filter": {
          "opportunityId": `${opportunityId}`,
          "candidate": `${userId}`
        },
        "populate": 1
      }, {
      headers: this.getCMSheaders()
    });
  }



  getComments(serviceId) {
    return this.http.post<any>(
      `${environment.cms.api.master}/api/collections/get/comments/`,
      {
        "filter": {
          "serviceName._id": `${serviceId}`
        },
        "populate": 0
      }, {
      headers: this.getCMSheaders()
    })
  };

  getSegmentsByIds(ids: Array<string>): Observable<any> {
    let body = [];
    ids.forEach(element => {
      body.push({ "_id": element })
    });

    return this.http.post<any[]>(
      `${environment.cms.api.master}/api/collections/get/segment/`,
      {
        "filter": {
          "$or": body
        },
        "populate": 1
      }, {
      headers: this.getCMSheaders()
    });
  }

  search(keyword: string): Observable<any> {
    let body: object;
    body = {
      "filter": {
        "$or": []
      },
      "limit": 100,
      "populate": 1
    };

    // keyword prepare
    let findKeywordOn: Array<string> = ['serviceName_ar', 'description_ar', 'tag']
    findKeywordOn.forEach(element => {
      body['filter']['$or'].push({ element: { "$regex": keyword } })
    });

    // tags.forEach(element => {
    //   body['filter']['$or'].push({"tag._id": element})
    // });

    //body['filter']['$and'].push({"lifeCycle":"Published"}) //@TODO filter inactive
    //body['filter']['$or'].push({"department._id":{"$eq": category}})




    return this.http.post<any[]>(
      `${environment.cms.api.master}/api/collections/get/Service/`, body, {
      headers: this.getCMSheaders()
    });
  }




  getRequest(id: string): Observable<any[]> {
    return this.http.get<any[]>(
      `${environment.cms.api.master}/api/collections/get/${id}/`, {
      headers: this.getCMSheaders()
    });
  }

  getStats(id: string): Observable<any[]> {
    return this.http.get<any[]>(
      `${environment.statisticsApi.api}#${id}`);
  }

  getNews() {
    return this.getCollectionAllActive('news', 'disable', false)
  }

  getSingleNews(id) {
    return this.getCollectionEntryById('news', '_id', id);
  }

  getAds() {
    return this.getCollectionAllActive('ads', 'disable', false)
  }

  getSingleAds(id) {
    return this.getCollectionEntryById('ads', '_id', id);
  }

  getProfile(id): Observable<any[]> {
    return this.http.get<any[]>(
      `${environment.profile.api}/${id}`, {
      headers: this.getCMSheaders()
    });
  }

}