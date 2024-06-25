import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';

import {
  CharacterEntity,
  CharacterApiResponse,
} from '../entities/character.models';

// REFACTOR: - Use environment variable
// const characterBaseApiUrl = `${environment.BASE_API_URL}/character`;
const characterBaseApiUrl = `https://rickandmortyapi.com/api/character`;

@Injectable({ providedIn: 'root' })
export class CharacterDataService {
  private http = inject(HttpClient);

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}

  loadCharacters(
    characterName: string | undefined,
  ): Observable<CharacterEntity[]> {
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
