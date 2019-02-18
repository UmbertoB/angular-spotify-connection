import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SpotifyAuthService } from './services/auth/spotify-auth.service';
import { ArtistsService } from './services/entities/artists.service';
import { ARTISTS_ID } from './utils/consts/consts.utils';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public artists;
  public selectedArtist: string;
  public artistData: any;
  public artistAlbums;

  constructor(private auth: SpotifyAuthService, private artistsService: ArtistsService, private router: ActivatedRoute) {
    this.auth.isAuthorized();
  }

  ngOnInit() {
    this.artistsService.get({ query: { ids: ARTISTS_ID.join(',') } }).subscribe(
      res => this.artists = res.artists
    );
  }

  public changeArtist() {
    this.artistsService.get({ id: this.selectedArtist, url: 'albums', query: { include_groups: 'album' } }).subscribe(
      res => {
      this.artistData = res
        this.artistAlbums = res.items;
      });
  }


}
