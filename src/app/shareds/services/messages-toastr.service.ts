import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { StatusCodeMessage } from '../enuns/status-code-message';
import { StatusCode } from '../enuns/status-code.enum';

@Injectable({
  providedIn: 'root'
})
export class MessagesToastrService {

  constructor(private toastrService: ToastrService) { }

  setErrorMessage(status: any) {

    switch (status) {
      case StatusCode.NOTAUTHORIZED:
        this.toastrService.warning(StatusCodeMessage.NOTAUTHORIZED_MESSAGE)
        return false;
      case StatusCode.FORIBIDDEN:
        this.toastrService.error(StatusCodeMessage.NOTAUTHORIZED_MESSAGE)
        return false;
      case StatusCode.INTERNAL_SERVER_ERROR:
        this.toastrService.error(StatusCodeMessage.INTERNAL_SERVER_ERROR_MESSAGE)
        return false;
      case StatusCode.NOT_FOUND:
        this.toastrService.error(StatusCodeMessage.NOTFOUND_MESSAGE)
        return false;
      case StatusCode.HTTP_ERROR_RESPONSE:
        this.toastrService.error(StatusCodeMessage.HTTP_ERROR_RESPONSE_MESSAGE)
        return false;
      default:
        this.toastrService.error(StatusCodeMessage.INTERNAL_SERVER_ERROR_MESSAGE)
        return false;
    }
  }

  setSuccessMessage(status: any){
    switch (status) {
      case StatusCode.SUCESS:
        this.toastrService.success(StatusCodeMessage.SUCESS_MESSAGE)
        return true;
      case StatusCode.SUCESS_CREATE:
        this.toastrService.success(StatusCodeMessage.SUCESS_CREATE_MESSAGE)
        return true;

      default:
        this.toastrService.success(StatusCodeMessage.SUCESS_MESSAGE)
        return true;
    }
  }
}
