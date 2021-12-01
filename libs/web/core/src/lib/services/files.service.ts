import { Injectable } from '@angular/core'
import { nanoid } from 'nanoid';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FilesService {
  currentUploadSubject = new BehaviorSubject<string>(null);
  currentUpload$ =  this.currentUploadSubject.asObservable();



}
