export interface AuthModel {
  token: string;
  refreshToken?: string;
}

export interface UserAddressModel {
  addressLine: string;
  city: string;
  state: string;
  postCode: string;
}

export interface UserCommunicationModel {
  email: boolean;
  sms: boolean;
  phone: boolean;
}

export interface UserEmailSettingsModel {
  emailNotification?: boolean;
  sendCopyToPersonalEmail?: boolean;
  activityRelatesEmail?: {
    youHaveNewNotifications?: boolean;
    youAreSentADirectMessage?: boolean;
    someoneAddsYouAsAsAConnection?: boolean;
    uponNewOrder?: boolean;
    newMembershipApproval?: boolean;
    memberRegistration?: boolean;
  };
  updatesFromKeenthemes?: {
    newsAboutKeenthemesProductsAndFeatureUpdates?: boolean;
    tipsOnGettingMoreOutOfKeen?: boolean;
    thingsYouMissedSindeYouLastLoggedIntoKeen?: boolean;
    newsAboutStartOnPartnerProductsAndOtherServices?: boolean;
    tipsOnStartBusinessProducts?: boolean;
  };
}

export interface UserSocialNetworksModel {
  linkedIn: string;
  facebook: string;
  twitter: string;
  instagram: string;
}
export interface BasicTableState {
  dataList: Array<{}>;
  page: number;
  itemsPerPage: number;
  total: number;
  pages: number;
  filters: Object;
  isFirstTime: boolean;
  isCreating: boolean;
}
export interface ReduxState {
  [key: string]: BasicTableState;
}

// {
//   "id": 22,
//   "name": "Juan",
//   "email": "juanb2b@devstack.com",
//   "first_login": true,
//   "createdAt": "2025-06-18T16:35:49.000Z",
//   "updatedAt": "2025-06-19T17:00:50.249Z",
//   "createdBy": {
//     "id": 1,
//     "name": "Administrador",
//     "email": "user@example.com"
//   },
//   "positions": [
//     {
//       "id": 3,
//       "name": "Analista de BackOffice"
//     }
//   ],
//   "apps": [
//     {
//       "id": 7,
//       "name": "PortOut Backoffice",
//       "code": "POUTBACK",
//       "transactions": [
//         {
//           "id": 37,
//           "name": "Mis asignaciones",
//           "code": "1",
//           "create": false,
//           "update": false,
//           "delete": false
//         },
//         {
//           "id": 38,
//           "name": "Solicitudes vencidas",
//           "code": "2",
//           "create": false,
//           "update": false,
//           "delete": false
//         },
//         {
//           "id": 39,
//           "name": "Solicitudes cerradas",
//           "code": "3",
//           "create": false,
//           "update": false,
//           "delete": false
//         },
//         {
//           "id": 40,
//           "name": "Solicitudes Pendientes",
//           "code": "4",
//           "create": false,
//           "update": false,
//           "delete": false
//         }
//       ]
//     }
//   ]
// }
export interface UserModel {
  id: number;
  name: string;
  email: string;
  firstLogin: boolean;
  createdAt: string;
  updatedAt: string;
  createdBy: {
    id: number;
    name: string;
    email: string;
  };
  positions?: Array<{
    id: number;
    name: string;
  }>;
  transactions?: Array<{
    id: number;
    name: string;
    code: string;
    read: boolean;
    create: boolean;
    update: boolean;
    delete: boolean;
  }>;
}
