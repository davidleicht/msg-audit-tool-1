import { State, Selector, Action, StateContext, createSelector } from '@ngxs/store';
import { patch, updateItem, removeItem, append } from '@ngxs/store/operators';
import { Injectable } from '@angular/core';
import {
  AddContactPerson,
  DeleteContactPerson,
  UpdateContactPerson,
} from './actions/audit.actions';
import * as shortid from 'shortid';
import { ContactPerson } from '../data/models/contact-person.model';
import { CONTACT_PEOPLE } from '../data/examples/contact-people';

export interface ContactPersonStateModel {
  contactPeople: ContactPerson[];
}

@State<ContactPersonStateModel>({
  name: 'contactPerson',
  defaults: {
    contactPeople: CONTACT_PEOPLE,
  },
})
@Injectable()
export class ContactPersonState {
  @Selector()
  static contactPeople(state: ContactPersonStateModel) {
    return state.contactPeople;
  }

  static contactPerson(id: string) {
    return createSelector([ContactPersonState], (state: ContactPersonStateModel) => {
      return state.contactPeople.find(x => x.id === id);
    });
  }

  @Action(AddContactPerson)
  addContactPerson(
    { setState }: StateContext<ContactPersonStateModel>,
    { contactPerson }: AddContactPerson,
  ) {
    setState(
      patch({
        contactPeople: append<ContactPerson>([{ ...contactPerson, id: shortid.generate() }]),
      }),
    );
  }

  @Action(DeleteContactPerson)
  deleteContactPerson(
    { setState }: StateContext<ContactPersonStateModel>,
    { contactPerson }: DeleteContactPerson,
  ) {
    setState(
      patch({
        contactPeople: removeItem<ContactPerson>(x => x === contactPerson),
      }),
    );
  }

  @Action(UpdateContactPerson)
  updateContactPerson(
    { setState }: StateContext<ContactPersonStateModel>,
    { id, contactPerson }: UpdateContactPerson,
  ) {
    setState(
      patch({
        contactPeople: updateItem<ContactPerson>(x => x.id === id, { id, ...contactPerson }),
      }),
    );
  }
}
