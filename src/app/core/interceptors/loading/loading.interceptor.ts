import { NgxSpinnerService } from 'ngx-spinner';
import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { finalize } from 'rxjs';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const ngxSpinnerServic = inject(NgxSpinnerService)

  ngxSpinnerServic.show()
  return next(req).pipe(finalize(    ()=>{
    ngxSpinnerServic.hide()
  } ))
};
