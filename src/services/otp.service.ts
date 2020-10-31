import { v4 as uuid } from 'uuid';
import { dateToLocal, newStringDate } from './date.helper.service';
import { repository } from '@loopback/repository';
import { OTPRepository } from '../repositories';
import { HttpErrors } from '@loopback/rest';

export class OTPService {
  constructor(
    @repository(OTPRepository) public otpRepository: OTPRepository,
  ) { }

  async createOTP(type: string, celular?: string, email?: string) {
    let codigo;
    let otpData = { id: "", codigo: "", typeCorreoCelular: "", correocelular: "", typeCode: "", esValido: false, creado: "" }
    if (celular) {
      codigo = crearCodigoCeluluar();
      otpData = { id: uuid(), codigo: codigo, typeCorreoCelular: "Celular", correocelular: celular.toString(), typeCode: type, esValido: true, creado: newStringDate() }
    }
    if (email) {
      codigo = uuid();
      otpData = { id: uuid(), codigo: codigo, typeCorreoCelular: "Correo", correocelular: email, typeCode: type, esValido: true, creado: newStringDate() }
    }
    const savedOTP = await this.otpRepository.create(
      otpData,
    );
    return savedOTP;
  }
  async validOTP(type: string, codigo: string, email?: string, celular?: number) {
    let responseOTP = await this.validateSendOTP(type, email, celular)
    let esValido = false;
    if (Array.isArray(responseOTP)) {
      responseOTP.forEach(async item => {
        if (item.codigo === codigo.toString()) {
          let fechaInicio = dateToLocal(new Date(newStringDate()));
          let fechaExpirado = dateToLocal(new Date(newStringDate()));
          let fechaItem = dateToLocal(new Date(item.creado));
          fechaExpirado.setMinutes(fechaInicio.getMinutes() + Number(process.env.OTPMINUTES))
          if (fechaExpirado > fechaItem) {
            esValido = true;
          }
        }
        item.esValido = false;
        try {
          await this.otpRepository.update(item);
        } catch (error) {
          console.log(error)
        }
      })
    }
    return esValido;
  }

  async getMessages(type: string, email?: string, celular?: number) {
    let responseOTP;
    if (email && email != "") {
      responseOTP = await this.otpRepository.find({
        where: { correocelular: email.toString(), typeCode: type, esValido: true, typeCorreoCelular: "Correo" },
      });
    }
    if (celular) {
      responseOTP = await this.otpRepository.find({
        where: { correocelular: celular.toString(), typeCode: type, esValido: true, typeCorreoCelular: "Celular" },
      });
    }
    return responseOTP;
  }

  async validateSendOTP(type: string, email?: string, celular?: number) {
    let responseOTP = await this.getMessages(type, email, celular)
    if (responseOTP && responseOTP.length > 3) {
      throw new HttpErrors.Conflict('El celular a sido bloqueado por 3 intentos fallidos');
    }
    return responseOTP;
  }

}
function crearCodigoCeluluar() {
  let codigo = Math.floor(1000 + Math.random() * 9000);
  return codigo.toString();
}