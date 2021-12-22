import { Component, Injector, ViewEncapsulation } from "@angular/core";
import { Platform } from "@ionic/angular";
import { environment } from "src/environments/environment";
import { BaseComponent } from "../base.component";
import { Formio } from 'formiojs';


@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class FooterComponent extends BaseComponent {

}