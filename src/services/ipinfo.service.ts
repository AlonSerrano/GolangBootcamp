const http = require('http');
const https = require('https');
export class IPINFOService {
    config: any;
    constructor() {
    }
    async lookUpIP(ip: string) {
        if (process.env.NODE_ENV == "DEV") {
            ip = "187.147.224.140"
        }
        if (validateIPaddress(ip)) {
            const token = process.env.IPINFOTOKEN;
            let ipinfoURL = new URL("https://ipinfo.io/" + ip + "?token=" + token);
            // let options = {
            //     method: 'GET',
            //     url: ipinfoURL.toString()
            // };
            const options = {
                host: ipinfoURL.host,
                port: 443,
                path: ipinfoURL.pathname,
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            };
            return await this.validBody(this.sendRequest(options, "Error al consultar servicio de IP"));
        }
    }
    async sendRequest(options: any, error: string) {
        return new Promise(function (resolve, reject) {
            try {
                console.log('rest::getJSON');
                const port = options.port == 443 ? https : http;
                let output = '';
                const req = port.request(options, (res: any) => {
                    console.log(`${options.host} : ${res.statusCode}`);
                    res.setEncoding('utf8');

                    res.on('data', (chunk: any) => {
                        output += chunk;
                    });

                    res.on('end', () => {
                        let obj = JSON.parse(output);
                        resolve(obj);
                        //onResult(res.statusCode, obj);
                    });
                });
                req.on('error', (err: any) => {
                    reject(err)
                });
                req.end();
            } catch (e) {
                console.log("Error OTP Service sendRequest: " + e);
                reject(e);
            }
        });
    }
    async validBody(promise: Promise<any>) {
        let response = await promise;
        IsJsonString(response.message) ? response.message = JSON.parse(response.message) : response;
        IsJsonString(response.details) ? response.details = JSON.parse(response.details) : response;
        return response;

    }
}
function IsJsonString(str: string) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}
function isError(response: any, errorMsg: string, e?: any) {
    return {
        statusCode: response.statusCode,
        message: errorMsg,
        details: e ? e : (response.body ? response.body : response),
    }
}
function validateIPaddress(ipaddress: string) {
    if (/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(ipaddress)) {
        return (true)
    }
    console.log("Invalid IP on ipinfo service")
    return (false)
}
