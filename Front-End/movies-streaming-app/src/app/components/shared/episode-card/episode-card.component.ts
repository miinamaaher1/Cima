import { Component, input, Input } from '@angular/core';
import { IconComponent } from "../icon-component/icon.component";
import { CommonModule, LowerCasePipe, TitleCasePipe } from '@angular/common';
import { RuntimePipe } from '../../../core/pipes/runtime.pipe';

@Component({
  selector: 'app-episode-card',
  imports: [CommonModule,IconComponent,RuntimePipe],
  templateUrl: './episode-card.component.html'
})
export class EpisodeCardComponent {
  @Input() episodeId:number=0;
  @Input() Poster:string="/images/posters/harry.jpg"
  @Input() episodeNum:number=0
  @Input() Runtime:number=0;
  @Input() Description:string='Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nisi laborum vel soluta aspernatur blanditiis provident odio nesciunt? Tenetur, iusto ex.';
}
