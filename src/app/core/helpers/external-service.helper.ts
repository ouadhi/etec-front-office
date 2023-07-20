import { HttpClient } from "@angular/common/http";
import { ExternalService } from 'dp-formio';

export function createExternalService(http: HttpClient) {
    return new ExternalService(http);
}