import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoreModule } from 'src/app/core/core.module';
import { AuditInfoComponent } from './audit-info.component';
import { Router } from '@angular/router';
import { ContactPersonService } from 'src/app/core/http/contact-person.service';
import {
  contactPersonServiceSpy,
  interviewServiceSpy,
  questionServiceSpy,
  facCritServiceSpy,
  auditServiceSpy,
} from 'src/app/core/ngxs/test/service-spies';
import { InterviewService } from 'src/app/core/http/interview.service';
import { QuestionService } from 'src/app/core/http/question.service';
import { FacCritService } from 'src/app/core/http/facCrit.service';
import { AuditService } from 'src/app/core/http/audit.service';

describe('AuditInfoComponent', () => {
  let component: AuditInfoComponent;
  let fixture: ComponentFixture<AuditInfoComponent>;

  beforeEach(async(() => {
    const routerStub = { url: '/audits/123/interviews' };

    TestBed.configureTestingModule({
      declarations: [AuditInfoComponent],
      imports: [CoreModule],
      providers: [
        { provide: Router, useValue: routerStub },
        { provide: ContactPersonService, useValue: contactPersonServiceSpy },
        { provide: InterviewService, useValue: interviewServiceSpy },
        { provide: QuestionService, useValue: questionServiceSpy },
        { provide: FacCritService, useValue: facCritServiceSpy },
        { provide: AuditService, useValue: auditServiceSpy },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuditInfoComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
