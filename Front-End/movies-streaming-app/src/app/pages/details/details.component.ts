import { Component } from '@angular/core';
import { SidekickComponent } from "../../components/sidekick/sidekick.component";
import { mediaType } from '../../core/utils/media-type.enum';
import { ActivatedRoute } from '@angular/router';
import { TabsComponent } from '../../components/tabs/tabs.component';

@Component({
  selector: 'app-details',
  imports: [SidekickComponent, TabsComponent],
  templateUrl: './details.component.html'
})
export class DetailsComponent {
  mediaId!: number;
  mediaType!: mediaType;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.mediaId = Number(params.get('id'));
      this.mediaType = params.get('type') as mediaType;
    });
  }
}
