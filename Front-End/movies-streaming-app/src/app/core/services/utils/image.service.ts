import { Injectable } from '@angular/core';
import { IImage } from '../../interfaces/IImage';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor() { }


  getImagePath(imageObject : IImage) : string{
    return `${environment.media_url}/t/p/original/${imageObject.file_path}`
  }
}
