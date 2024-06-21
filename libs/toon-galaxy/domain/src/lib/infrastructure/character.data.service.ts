import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@toon-galaxy/env/environment';
import { map, Observable, tap } from 'rxjs';

import {
  CharacterEntity,
  CharacterApiResponse,
} from '../entities/character.models';

const characterBaseApiUrl = `${environment.BASE_API_URL}/character`;

@Injectable({ providedIn: 'root' })
export class CharacterDataService {
  private http = inject(HttpClient);

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}

  loadCharacters(
    characterName: string | undefined,
  ): Observable<CharacterEntity[]> {
    // Uncomment if needed
    /*
        const params = new HttpParams().set('page', '1')
        const byIdURL = characterBaseApiUrl + '/1'
        const byIdsURL = characterBaseApiUrl + '/[1,2,3]'
        const params = new HttpParams().set('name', characterName)
          .set('status', 'alive').set('species', 'human').set('type', 'type')
          .set('gender', 'female')
        const headers = new HttpHeaders().set('Accept', 'application/json');
        return this.http.get<CharacterEntity[]>(url, {params, headers});
        */

    const params = new HttpParams().set('name', characterName || '');

    return this.http
      .get<
        CharacterApiResponse<CharacterEntity[]>
      >(characterBaseApiUrl, { params })
      .pipe(
        tap((res) => console.log(res)),
        map((res) => res.results),
      );
  }
}
