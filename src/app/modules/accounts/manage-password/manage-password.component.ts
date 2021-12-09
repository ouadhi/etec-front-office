import { Injector, ViewEncapsulation } from "@angular/core";
import { Component, OnInit } from "@angular/core";
import { BaseComponent } from "../../../shared/components/base.component";
import { InOutAnimation } from "src/app/core/animations/in-out.animation";
import { Router } from "@angular/router";

@Component({
  selector: "app-manage-password",
  templateUrl: "./manage-password.component.html",
  // styleUrls: ['./manage-password.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: [InOutAnimation],
})
export class ManagePasswordComponent extends BaseComponent implements OnInit {
  verify = false;
  userId: string;
  token: string;
  languages = [
    { name: "ENGLISH", code: "en" },
    { name: "ARABIC", code: "ar" },
  ];

  constructor(public injector: Injector) {
    super(injector);
  }

  async ngOnInit() {
    //logout if user logged in
    if (await this.keycloakService.isLoggedIn()) {
      localStorage.setItem("needLogin", "true");
      await this.keycloakService.logout();
    }

    this.sub = this.route.params.subscribe((params) => {
      this.userId = params.userId;
    });
  }

  verifiedOTP(token: string) {
    this.verify = true;
    this.token = token;
  }

  get currentLang() {
    const lang = this.languages.find(
      (lang) => lang.code === this.switchLangService.getSelectedLang()
    );
    return lang ? lang.name.toLocaleUpperCase() : "";
  }

  redirectToHome() {
    this.router.navigate(["/"]);
  }
}
