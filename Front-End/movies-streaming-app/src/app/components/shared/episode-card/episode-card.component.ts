import { Component, input, Input, OnInit } from '@angular/core';
import { IconComponent } from "../icon-component/icon.component";
import { CommonModule } from '@angular/common';
import { FormatTimePipe } from '../../../core/pipes/format-time.pipe';
import { RouterLink } from '@angular/router';
import { AccountService } from '../../../core/services/Account/account.service';

@Component({
  selector: 'app-episode-card',
  imports: [CommonModule,FormatTimePipe,RouterLink],
  templateUrl: './episode-card.component.html'
})
export class EpisodeCardComponent implements OnInit{
  constructor(private accountService:AccountService){}
  ngOnInit(): void {
    this.isAuthenticated= this.accountService.isLoggedIn()
  }
  seasonNumber=input.required<number>();
  seriesId=input.required<number>();
  @Input() episodeId:number=0;
  @Input() Poster:string="/images/posters/harry.jpg"
  @Input() episodeNum:number=0
  @Input() Runtime:number=0;
  @Input() Description:string='Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nisi laborum vel soluta aspernatur blanditiis provident odio nesciunt? Tenetur, iusto ex.';

  isAuthenticated:boolean=false;


  

}
