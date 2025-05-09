import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormatTimePipe } from '../../../core/pipes/format-time.pipe';

@Component({
  selector: 'app-episode-card',
  imports: [CommonModule, FormatTimePipe],
  templateUrl: './episode-card.component.html'
})
export class EpisodeCardComponent {
  @Input() episodeId: number = 0;
  @Input() Poster: string = "/images/posters/harry.jpg"
  @Input() episodeNum: number = 0
  @Input() Runtime: number = 0;
  @Input() Description: string = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nisi laborum vel soluta aspernatur blanditiis provident odio nesciunt? Tenetur, iusto ex.';
}
