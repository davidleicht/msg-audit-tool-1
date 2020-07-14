import { toLength } from 'cypress/types/lodash';

describe('AuditInterviewsListPage', () => {
  let interviewsUrl = Cypress.config().baseUrl + '/audits';
  let audit;
  let interview;

  before(() => {
    cy.fixture('backend-mock-data/audits.json').then(audits => {
      audit = audits[0];
      interviewsUrl = `${interviewsUrl}/${audit.id}/interviews`;
    });
    cy.fixture('backend-mock-data/interviews.json').then(interviews => {
      interview = interviews[0];
    });
  });

  beforeEach(() => {
    cy.injectBackendMocks();
    cy.visit(interviewsUrl);
  });

  it('shows audit name as heading', () => {
    cy.get('[data-cy=heading]').should('contain', audit.name);
  });

  it('shows audit start date and end date as subheading', () => {
    const startDate = new Date(audit.startDate).toLocaleDateString('de-DE', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
    const endDate = new Date(audit.endDate).toLocaleDateString('de-DE', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
    cy.get('[data-cy=subheading]').should('contain', startDate);
    cy.get('[data-cy=subheading]').should('contain', endDate);
  });

  it('shows TBD if end date is missing', () => {
    cy.fixture('backend-mock-data/audits.json').then(audits => {
      audit = audits[0];
      delete audit.endDate;
      cy.route({
        method: 'GET',
        url: '/audits',
        response: [audit],
      });
      cy.visit(interviewsUrl);
    });
    cy.get('[data-cy=subheading]').should('contain.text', 'TBD');
  });

  context('When focussing on events it...', () => {
    it('displays a button to new interviews', () => {
      cy.get('[data-cy=new-interview]').click();
      cy.get('[data-cy=add-interview-form]').should('exist');
      cy.get('[data-cy=cancel-interview-data-form]').click();
    });

    it('shows audit contacts list when clicking on contacts tab');
    it('shows audit contacts list when clicking on contacts tab');
  });

  context('When focussing on the faccrits/interview list ...', () => {
    it('shows "Leerer Scope" scope is empty', () => {
      cy.fixture('backend-mock-data/audits.json').then(audits => {
        let auditEmptyScope = { ...audits[0] };
        auditEmptyScope.scope = [];
        cy.route({
          method: 'GET',
          url: '/audits',
          response: [auditEmptyScope],
        });
        cy.visit(interviewsUrl);
        cy.get('[data-cy=emptyScope]').should('contain', 'Leerer Scope');
      });
    });

    it('shows message that no interview exists on creation', () => {
      cy.route({
        method: 'GET',
        url: '/interviews',
        response: [],
      }).as('getInterviews');
      cy.visit(interviewsUrl);
      cy.get('[data-cy=faccrit-body]').each(body => {
        cy.wrap(body).should('contain', 'Keine Interviews vorhanden');
      });
    });

    it('displays an overview with all chosen factors and criteria', () => {
      audit.scope.forEach(facCrit => {
        if (facCrit.referenceId) {
          cy.get('[data-cy=criteria-header]').should('contain.text', facCrit.name);
        } else {
          cy.get('[data-cy=factor-header]').should('contain.text', facCrit.name);
        }
      });
    });

    it('displays an interview with more than one faccrit in all of their chosen faccrit cards', () => {
      cy.fixture('backend-mock-data/interviews.json').then(interviews => {
        const interview = interviews[0];
        assert(interview.answers.length >= 2);
        interview.answers.forEach(answer => {
          cy.fixture('backend-mock-data/facCrits.json').then(facCrits => {
            const facCritList = facCrits;
            let facCrit = facCritList.filter(element => {
              return element.id === answer.faccritId;
            });
            assert.equal(facCrit.length, 1);
            cy.get('[data-cy=factor-card]')
              .filter(`:contains("${facCrit[0].name}")`)
              .should('contain', interview.interviewedContactPersons[0].forename)
              .should('contain', interview.interviewedContactPersons[0].surname);
          });
        });
      });
    });
  });

  context('When focussing on the interview cards it...', () => {
    it('shows "Keine Kontaktperson gewählt" and startdate when no contact person was chosen', () => {
      cy.fixture('backend-mock-data/interviews.json').then(interviews => {
        let interviewNoContact = { ...interviews[0] };
        delete interviewNoContact.interviewedContactPersons;
        const startDate = new Date(interview.startDate).toLocaleDateString('de-DE', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
        });
        cy.route({
          method: 'GET',
          url: '/interviews',
          response: [interviewNoContact],
        });
        cy.visit(interviewsUrl);
        cy.get('[data-cy=interview]')
          .first()
          .should('contain', 'Keine Kontaktperson gewählt')
          .should('contain', startDate);
      });
    });

    it('shows a contact name, "(+)" and startdate if there are more than one contact person', () => {
      assert(interview.interviewedContactPersons.length >= 2);
      const startDate = new Date(interview.startDate).toLocaleDateString('de-DE', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      });
      cy.get('[data-cy=interview]')
        .first()
        .should('contain', interview.interviewedContactPersons[0].forename)
        .should('contain', interview.interviewedContactPersons[0].surname)
        .should('contain', '(+)')
        .should('contain', startDate);
    });

    it('shows a contact name and startdate if there is one contact person only', () => {
      cy.fixture('backend-mock-data/interviews.json').then(interviews => {
        let interviewOneContact = { ...interviews[0] };
        interviewOneContact.interviewedContactPersons = [
          interviewOneContact.interviewedContactPersons[0],
        ];
        assert.equal(interviewOneContact.interviewedContactPersons.length, 1);
        const startDate = new Date(interview.startDate).toLocaleDateString('de-DE', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
        });
        cy.route({
          method: 'GET',
          url: '/interviews',
          response: [interviewOneContact],
        });
        cy.visit(interviewsUrl);
        cy.get('[data-cy=interview]')
          .first()
          .should('contain', interviewOneContact.interviewedContactPersons[0].forename)
          .should('contain', interviewOneContact.interviewedContactPersons[0].surname)
          .should('contain', startDate);
      });
    });

    it('displays "In Bearbeitung" of the interview if status is "ACTIVE', () => {
      cy.get('[data-cy=interview-status]')
        .first()
        .invoke('attr', 'nbPopover')
        .should('contain', 'In Bearbeitung');
    });

    it('displays "Abgeschlossen" of the interview if status is "FINISHED', () => {
      cy.fixture('backend-mock-data/interviews.json').then(interviews => {
        let interviewFinished = { ...interviews[0] };
        interviewFinished.status = 'FINISHED';
        cy.route({
          method: 'GET',
          url: '/interviews',
          response: [interviewFinished],
        });
        cy.visit(interviewsUrl);
      });
      cy.get('[data-cy=interview-status]')
        .first()
        .invoke('attr', 'nbPopover')
        .should('contain', 'Abgeschlossen');
    });

    it('redirects to its interview when clicking on the card', () => {
      cy.get('[data-cy=interview]')
        .first()
        .click()
        .url()
        .should('contain', `${interviewsUrl}/${interview.answers[0].interviewId}`);
    });
  });

  context('When focussing on the sidebar it', () => {
    const textLength = 25;

    beforeEach(() => {
      cy.get('[data-cy=toggle-sidebar]').click();
    });

    it('shows all faccrits of an audit (scope)', () => {
      interview.answers.forEach(answer => {});
    });

    it('opens sidebar on click', () => {
      cy.get('[data-cy=toggle-sidebar]').should('not.have.class', 'collapsed');
      cy.get('[data-cy=toggle-sidebar]').click();
    });

    it('cuts a faccrit label off when size > 25 and " ..." is appended', () => {
      cy.get('.menu-title').each(item => {
        assert(item.text().length <= textLength + 4);
      });
    });
  });

  context('When focussing on the network request it ...', () => {
    it('shows error message when malformed request received');
    it('shows error message when the network connection/requests failed');
  });
});
