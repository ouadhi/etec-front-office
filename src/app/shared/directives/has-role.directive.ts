import { Directive, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { Subject } from 'rxjs';
import { SessionService } from 'src/app/core/services/session.service';

@Directive({
    selector: '[appHasRole]'
})
export class HasRoleDirective implements OnInit {
    // the role the user must have
    @Input() appHasRole: string;

    stop$ = new Subject();

    isVisible = false;

    /**
     * @param {ViewContainerRef} viewContainerRef
     * 	-- the location where we need to render the templateRef
     * @param {TemplateRef<any>} templateRef
     *   -- the templateRef to be potentially rendered
     * @param {KeycloakService} keycloakService
     *   -- will give us access to the roles a user has
     */
    constructor(
        private viewContainerRef: ViewContainerRef,
        private templateRef: TemplateRef<any>,
        private sessionService: SessionService) { }

    ngOnInit() {
        if (this.sessionService.isUserInRole(this.appHasRole)) {
            // If it is already visible (which can happen if
            // his roles changed) we do not need to add it a second time
            if (!this.isVisible) {
                // We update the `isVisible` property and add the
                // templateRef to the view using the
                // 'createEmbeddedView' method of the viewContainerRef
                this.isVisible = true;
                this.viewContainerRef.createEmbeddedView(this.templateRef);
            }
        } else {
            // If the user does not have the role,
            // we update the `isVisible` property and clear
            // the contents of the viewContainerRef
            this.isVisible = false; 
            this.viewContainerRef.clear();
        }
    }
}
