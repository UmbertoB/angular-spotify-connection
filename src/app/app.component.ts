import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SpotifyAuthService } from './services/auth/spotify-auth.service';
import { ArtistsService } from './services/entities/artists.service';
import { getAllUrlParams } from './utils/app.utils';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public artists = [
    { id: "4kwxTgCKMipBKhSnEstNKj", name: 'Animal Collective' },
    { id: "37ZflmHTdxkSLQuT8w9NBs", name: 'Criolo' },
    { id: "4Va55p3P2P96lIgzntievo", name: 'Nação Zumbi' },
    { id: "0ohvsn0lgt51qZUbu9ct4s", name: 'Boogarins' },
    { id: "74ASZWbe4lXaubB36ztrGX", name: 'Bob Dylan' }
  ];
  public artist = this.artists[0];
  public selectedArtist: string;
  public artistData: any;

  constructor(private auth: SpotifyAuthService, private artistsService: ArtistsService, private router: ActivatedRoute) { 
    this.auth.isAuthorized();
  }

  ngOnInit() { }

  public changeArtist() {
    this.artistsService.get({ id: this.selectedArtist }).subscribe(
      res => this.artistData = res
    );
  }


}
