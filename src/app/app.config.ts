import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes)]
};

export const awsConfig = {
  CognitoId: "cognito-idp.us-east-2.amazonaws.com/us-east-2_8KkHocSfT",
  userCognito: {
    region: 'us-east-2',
    clientConfig: {region: 'us-east-2'},
    identityPoolId: 'us-east-2:92bb552d-95a1-4b56-8160-4ed4864bb054',
  }
};

export const awsTables = {
  camposTabela: {
    id: 'id',
  },
  tabelas: {
    funcionarios: "FUNCIONARIO",
    veiculos: "VEICULOS",
  },
  urlApiTabelas: {
    funcionarios: "",
  },

};
