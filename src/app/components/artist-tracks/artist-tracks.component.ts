import { Component, OnInit, Input, OnChanges, SimpleChange, SimpleChanges } from '@angular/core';
import { AlbumsService } from 'src/app/services/entities/albums.service';
import { ARTISTS_ID } from 'src/app/utils/consts/consts.utils';
import { Observable, merge } from 'rxjs';
import { mergeAll } from 'rxjs/operators';
import { fade } from 'src/app/utils/consts/animations.utils';

@Component({
  selector: 'app-artist-tracks',
  templateUrl: './artist-tracks.component.html',
  styleUrls: ['./artist-tracks.component.css'],
  animations: [fade]
})
export class ArtistTracksComponent implements OnInit, OnChanges {

  @Input() albums: string[];
  public tracks: any[];
  public search: string;

  constructor(private albumsService: AlbumsService) { }

  ngOnInit() {

  }

  ngOnChanges(changes: SimpleChanges) {
    let albums: SimpleChange = changes.albums;

    if (this.albums) {
      this.tracks = [];
      albums.currentValue = albums.currentValue.map(album => album.id);

      albums.currentValue.forEach(album => {
        
        this.albumsService.get({ id: album, url: 'tracks' }).subscribe(res => {
          this.tracks.push(...res.items);
        });

      });

    }



  }

}
