import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('viora_token');

  const isAuthEndpoint =
    req.url.includes('/auth/login') || req.url.includes('/auth/register');

  if (!token || isAuthEndpoint) {
    return next(req);
  }

  return next(
    req.clone({
      setHeaders: { Authorization: `Bearer ${token}` },
    })
  );
};
