import { Component } from '@angular/core';
import { SidekickComponent } from "../sidekick/sidekick.component";
import { mediaType } from '../../core/utils/media-type.enum';
import { TabsComponent } from "../tabs/tabs.component";
import { FooterComponent } from "../shared/footer/footer.component";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-details',
  imports: [SidekickComponent, TabsComponent, FooterComponent],
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
