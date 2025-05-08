import { Component, OnChanges, OnInit, signal, SimpleChanges } from '@angular/core';
import { SidekickComponent } from "../../components/sidekick/sidekick.component";
import { mediaType } from '../../core/utils/media-type.enum';
import { ActivatedRoute } from '@angular/router';
import { TabsComponent } from '../../components/tabs/tabs.component';

@Component({
  selector: 'app-details',
  imports: [SidekickComponent, TabsComponent],
  templateUrl: './details.component.html'
})
export class DetailsComponent implements OnInit {
  mediaId = signal<number>(0);
  mediaType = signal<mediaType>(mediaType.movie);

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.mediaId.set(Number(params.get('id')));
      this.mediaType.set(params.get('type') as mediaType);
    });
  }
}
