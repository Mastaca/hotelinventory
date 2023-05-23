import { InjectionToken } from "@angular/core";
import { AppConfig } from "./appconfig.interface";
import { environment } from '../../environments/environment';

export const appServiceConfig = new InjectionToken<AppConfig>('app.config');
export const appConfig = {
  apiEndpoint: environment.apiEndPoint,
};
