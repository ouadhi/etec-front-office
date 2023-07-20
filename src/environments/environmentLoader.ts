import { environment as defaultEnvironment } from './environment';

export const environmentLoader = new Promise<any>((resolve, reject) => {
    // tslint:disable-next-line:one-variable-per-declaration
    const xmlhttp = new XMLHttpRequest(),
        method = 'GET',
        url = './assets/environments/environment.json';
    xmlhttp.open(method, url, true);
    xmlhttp.onload = () => {
        const production = defaultEnvironment.production;
        if (xmlhttp.status === 200) {
            try {
                resolve({
                    ...JSON.parse(xmlhttp.responseText),
                    production
                });
            } catch (e) {
                resolve({
                    ...defaultEnvironment,
                    production
                });
            }
        } else {
            resolve({
                ...defaultEnvironment,
                production
            });
        }
    };
    xmlhttp.send();
});
