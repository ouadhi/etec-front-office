import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { FormConfigService } from 'src/formio/src/public_api';
import { DEFAULTS_IMAGES, DEFAULTS_THEM_OPTIONS, DEFAULT_CONFIG } from '../consts';
declare let FontFace: any;

@Injectable({ providedIn: 'root' })
export class ConfigService {
	private storageCssKey = '_fo_css_variable';
	private style = 'locale-style';
	private config = null;

	get logo(): string {
		return !this.config || !this.config?.logo
			? null
			: `${environment.cms}${this.config?.logo?.path}`;
	}

	get smallLogo(): string {
		return !this.config || !this.config.smallLogo
			? null
			: `${environment.cms}${this.config.smallLogo.path}`;
	}

	get userAvatar(): string {
		return !this.config || !this.config?.userAvatar
			? null
			: `${environment.cms}${this.config?.userAvatar?.path}`;
	}

	constructor(private http: HttpClient, private formConfigService: FormConfigService) {}

	getAppConfig(queryParams = {}): Observable<any> {
		const defaultConfig$ = from([
			{
				entries: DEFAULT_CONFIG,
			},
		]);

		if (!environment.appConfig['endpoint'] || !environment.appConfig['id']) {
			return defaultConfig$;
		}
		const endpoint = `${environment.cms}${environment.appConfig['endpoint']}?filter[_id]=${environment.appConfig['id']}`;

		return this.http.post<any>(endpoint, {}).pipe(catchError((e) => defaultConfig$));
	}

	async loadConfig(): Promise<any> {
		const cssVariable = localStorage.getItem(this.storageCssKey);
		if (!cssVariable) {
			return this.getUpdatedConfig();
		}

		const cachedData = JSON.parse(cssVariable);
		const currentRevision = cachedData.entries[0].revisionsNumber;

		if (!environment.appConfig['frontOfficeSettings']) {
			this.getUpdatedConfig();
		}

		try {
			const isSameVersion = await this._validateCurrentRevisions(currentRevision);
			return isSameVersion ? this.getDefaultCachedData(cachedData) : this.getUpdatedConfig();
		} catch (e) {
			return this.getDefaultCachedData(cachedData);
		}
	}

	private async _validateCurrentRevisions(currentRevision) {
		const endpoint = `${environment.cms}/${environment.appConfig['frontOfficeSettings']}`;
		const result = await this.http.post<any>(endpoint, {}).toPromise();
		return result.revisionsNumber == currentRevision;
	}

	private getDefaultCachedData(cachedData) {
		return new Promise((resolve, _) => {
			this.config = cachedData.entries[0];
			resolve(this.config);
		});
	}

	private getUpdatedConfig() {
		return new Promise(async (resolve, reject) => {
			if (this.config) {
				resolve(this.config);
				return;
			}

			this.getAppConfig()
				.toPromise()
				.then(
					async (result) => {
						localStorage.setItem(this.storageCssKey, JSON.stringify(result));
						this.config = result.entries[0];
						resolve(this.config);
					},
					() => reject('App Config could not be loaded.')
				);
		});
	}

	setupEssentials(): void {
		if (!this.config) {
			return;
		}
		this.formConfigService.config$.next(this.config);
		this.changeFont();
		const cssVars = this._generateCssVars();
		this._appendCssVarsToRoot(cssVars);
		this.loadOverrideCss();
	}

	private _extendsOptions(config): { [x: string]: any } {
		return {
			...DEFAULTS_THEM_OPTIONS,
			...config,
			fontFamily: !!config?.fontFamily ? 'font' : DEFAULTS_THEM_OPTIONS?.fontFamily,
			favicon: !!config?.favicon?.path
				? `${environment.cms}/${config?.favicon?.path}`
				: DEFAULTS_THEM_OPTIONS.favicon,
		};
	}

	private _getCssColorVar(key, color): string {
		const [red, green, blue] = color.match(/[\d\.]+/g);
		const parts = red + ',' + green + ',' + blue;
		return `--${key}:${color};--${key}-parts:${parts} ;`;
	}

	private _generateCssVars(): string {
		let cssVars = '';
		const imagesKeys = Object.keys(DEFAULTS_IMAGES);
		const options = this._extendsOptions(this.config);

		for (const [key, value] of Object.entries(options)) {
			if (key === 'name') {
				document.title = `${value}`;
				continue;
			}
			if (key === 'fontFamily') {
				cssVars += `--font:${value};`;
				continue;
			}

			if (CSS.supports('color', value as any)) {
				cssVars += this._getCssColorVar(key, value);
				continue;
			}

			if (imagesKeys.includes(key) && (value as any)?.path) {
				const path = `url("${environment.cms}${(value as any)?.path}")`;
				cssVars += `--${key}:${path};`;
				continue;
			}

			if (key === 'favicon') {
				document.getElementById('favicon').setAttribute('href', `${value}`);
				continue;
			}
		}
		return cssVars;
	}

	private _appendCssVarsToRoot(cssVars): void {
		const sheet = document.createElement('style');
		sheet.id = 'root';
		sheet.innerHTML = `:root{${cssVars}}`;
		document.head.appendChild(sheet);
	}

	private changeFont(): void {
		if (this.config.fontFamily) {
			var customFont = new FontFace('font', `url(${this.config.fontFamily})`);
			customFont
				.load()
				.then((loaded_face) => {
					(document as any).fonts.add(loaded_face);
				})
				.catch((error) => {
					console.log(error);
				});
		}
	}

	private loadOverrideCss(): void {
		const head = document.head || document.getElementsByTagName('head')[0];

		const stylesheet = document.createElement('link');
		stylesheet.rel = 'stylesheet';
		stylesheet.href = this.style + '.css';
		head.appendChild(stylesheet);

		const css = this.config?.customCss ?? '';
		var style = document.createElement('style') as any;
		style.type = 'text/css';
		style.innerHTML = css;
		head.appendChild(style);
	}
}
