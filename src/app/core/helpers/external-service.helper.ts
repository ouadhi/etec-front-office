import { HttpClient } from "@angular/common/http";
import { ExternalService } from "src/formio/src/public_api";

export function createExternalService(http: HttpClient) {
    return new ExternalService(http);
}