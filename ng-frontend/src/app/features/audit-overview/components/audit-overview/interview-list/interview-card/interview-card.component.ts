import { Component, OnInit, Input } from '@angular/core';
import { Interview } from 'src/app/core/data/models/interview.model';

@Component({
  selector: 'app-interview-card',
  templateUrl: './interview-card.component.html',
  styleUrls: ['./interview-card.component.scss'],
})
export class InterviewCardComponent implements OnInit {
  @Input() interview: Interview;

  constructor() {}

  ngOnInit() {}
}