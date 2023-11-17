import { inject } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs';

let count = 0;

export const spinnerInterceptor: HttpInterceptorFn = (req, next) => {

  const spinnerService = inject(NgxSpinnerService);

  if (count++ === 0) {
    spinnerService.show();
  }

  return next(req).pipe(
    finalize(() => {
      if (--count === 0) {
        spinnerService.hide();
      }
    })
  );

};
