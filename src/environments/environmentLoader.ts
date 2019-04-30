import { environment as defaultEnvironment } from './environment';

export const environmentLoader = new Promise<any>((resolve, reject) => {
    // tslint:disable-next-line:one-variable-per-declaration
    const xmlhttp = new XMLHttpRequest(),
        method = 'GET',
        url = './assets/environments/environment.json';
    xmlhttp.open(method, url, true);
    xmlhttp.onload = () => {
        if (xmlhttp.status === 200) {
            try {
                resolve(JSON.parse(xmlhttp.responseText));
            } catch (e) {
                resolve(defaultEnvironment);
            }
        } else {
            resolve(defaultEnvironment);
        }
    };
    xmlhttp.send();
});
