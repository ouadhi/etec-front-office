import { Component, Injector, ViewEncapsulation, OnInit } from '@angular/core';
import { ETECService } from 'src/app/core/services/etec.service';
import { BaseComponent } from 'src/app/shared/components/base.component';

@Component({
    selector: 'app-formio-demo',
    templateUrl: './formio-demo.component.html',
    styleUrls: ['./formio-demo.component.scss'],
})

export class FormioDemoComponent extends BaseComponent implements OnInit {
    formKey: string;
    submission: any = {};
    extraOptions: any;

    formReady = false;

    constructor(public injector: Injector,
        private etecService: ETECService) { super(injector); }

    async ngOnInit(): Promise<void> {
        const etecData = await this.etecService.getEtecData();
        const params = this.route.snapshot.params;
        this.extraOptions = this.route.snapshot.queryParams;

        this.formKey = params.formKey;
        this.submission.data = { ...etecData, ...this.extraOptions };
        this.formReady = true;
    }

}
