import { AuditDto } from '../dtos/audit.dto';
import { AuditStatus } from '../../data/models/audit.model';
import { Salutation } from '../../data/models/contact-person.model';

export const AUDITS_DTO_DUMMY: AuditDto[] = [
  {
    id: 1,
    name: 'MSG project audit',
    startDate: '2020-07-06',
    endDate: '2020-07-06',
    creationDate: '2020-07-06T14:35:44.035Z',
    status: AuditStatus.Active,
    scope: [
      {
        id: 2,
        referenceId: 3,
        name: 'Modifizierbarkeit',
      },
    ],
    contactPersons: [
      {
        id: 4,
        salutation: Salutation.Herr,
        title: 'Prof',
        forename: 'Max',
        role: 'asds',
        surname: 'Mustermann',
        contactInformation: 'max.mustermann@gmx.de, tel: 0123456789',
        companyName: 'msg systems AG',
        department: 'Softwareentwicklung',
        sector: 'msg Public Sector',
        corporateDivision: 'Software',
      },
    ],
    cancellationDate: '2020-07-06',
    cancellationReason: 'Project got canceled',
    cancellationContactPerson: {
      id: 5,
      role: '',
      salutation: Salutation.Herr,
      title: 'Prof',
      forename: 'Max',
      surname: 'Mustermann',
      contactInformation: 'max.mustermann@gmx.de, tel: 0123456789',
      companyName: 'msg systems AG',
      department: 'Softwareentwicklung',
      sector: 'msg Public Sector',
      corporateDivision: 'Software',
    },
  },
  {
    id: 2,
    name: 'MSG project audit',
    startDate: '2020-07-06',
    endDate: '2020-07-06',
    creationDate: '2020-07-06T14:35:44.035Z',
    status: AuditStatus.Active,
    scope: [
      {
        id: 2,
        referenceId: 12,
        name: 'Modifizierbarkeit',
      },
    ],
    contactPersons: [
      {
        id: 1,
        salutation: Salutation.Herr,
        title: 'Prof',
        forename: 'Max',
        role: 'asds',
        surname: 'Mustermann',
        contactInformation: 'max.mustermann@gmx.de, tel: 0123456789',
        companyName: 'msg systems AG',
        department: 'Softwareentwicklung',
        sector: 'msg Public Sector',
        corporateDivision: 'Software',
      },
    ],
    cancellationDate: '2020-07-06',
    cancellationReason: 'Project got canceled',
    cancellationContactPerson: {
      id: 123,
      role: '',
      salutation: Salutation.Herr,
      title: 'Prof',
      forename: 'Max',
      surname: 'Mustermann',
      contactInformation: 'max.mustermann@gmx.de, tel: 0123456789',
      companyName: 'msg systems AG',
      department: 'Softwareentwicklung',
      sector: 'msg Public Sector',
      corporateDivision: 'Software',
    },
  },
];
