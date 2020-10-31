import { HttpErrors } from '@loopback/rest';

export class MessageBird_Service {
    messageBird: any;
    constructor() {
        this.messageBird = require('messagebird')(process.env.MESSAGEBIRD_KEY);
    }
    async sendMessage(otp: any) {
        var params = {
            'originator': process.env.MESSAGEBIRDORIGINATOR,
            'recipients': [
                "+52" + otp.correocelular
            ],
            'body': 'Tu codigo de confirmacion de ' + otp.typeCode + ' en perissonGo es: ' + otp.codigo
        };
        let promise = new Promise((resolve, reject) => {
            this.messageBird.messages.create(params, async function (err: any, res: any) {
                if (err) {
                    resolve(err);
                }
                resolve(res);
            });
        });
        let response: any = await promise;
        if (response && response.statusCode && response.statusCode != 200) {
            throw new HttpErrors.UnprocessableEntity('Error al enviar OTP');
        }
        return { statusCode: 200, message: "Mensaje enviado", details: response }
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
