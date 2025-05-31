import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class LocationService {
  apiKey = environment.locationApiKey;
  constructor(private http: HttpClient) {}
  getGeoLocationSuggestion(query: string) {
    return this.http
      .get<any>(
        `https://api.opencagedata.com/geocode/v1/json?q=${query}&key=${this.apiKey}`
      )
      .pipe(map((res: any) => res.results || []));
  }
}
