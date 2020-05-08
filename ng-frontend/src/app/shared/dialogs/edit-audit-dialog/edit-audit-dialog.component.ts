import { Component, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { Store } from '@ngxs/store';
import { AuditRegistryState } from 'src/app/ngxs/audit-registry.state';
import { Observable } from 'rxjs';
import { Audit } from 'src/app/data/models/audit.model';
import { UpdateAudit } from 'src/app/ngxs/audit.actions';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-edit-audit-dialog',
  templateUrl: './edit-audit-dialog.component.html',
  styleUrls: ['./edit-audit-dialog.component.scss'],
})
export class EditAuditDialogComponent implements OnInit {

  constructor(
    protected dialogRef: NbDialogRef<{ id: string }>,
    private store: Store,
    private router: Router,
  ) {}

  ngOnInit(): void {
  }

  onCancel() {
    this.dialogRef.close();
  }
}
