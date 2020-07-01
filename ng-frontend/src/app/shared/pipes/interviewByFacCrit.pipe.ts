import { Pipe, PipeTransform } from '@angular/core';
import { Interview } from 'src/app/core/data/models/interview.model';

@Pipe({
  name: 'interviewByFacCrit',
})
export class InterviewByFacCritPipe implements PipeTransform {
  transform(interviews: Interview[], facCritId: number): Interview[] {
    const result = interviews?.filter(
      interview => interview.answers.findIndex(answer => answer.faccritId === facCritId) != -1,
    );

    return result?.length == 0 ? null : result;
  }
}
