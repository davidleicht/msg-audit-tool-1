import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuditDataFormComponent } from './audit-data-form.component';
import { FormBuilder } from '@angular/forms';
import { NbDialogService } from '@nebular/theme';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from 'src/app/shared/shared.module';

describe('AuditDataComponent', () => {
  let component: AuditDataFormComponent;
  let fixture: ComponentFixture<AuditDataFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AuditDataFormComponent],
      imports: [SharedModule, BrowserAnimationsModule],
      providers: [NbDialogService, FormBuilder],
    });

    fixture = TestBed.createComponent(AuditDataFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});