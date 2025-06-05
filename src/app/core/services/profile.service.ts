import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { map, tap } from 'rxjs';
import { AuthService } from './auth.service';
import { UserProfile } from '../types/user-profile.type.interface';
@Injectable({ providedIn: 'root' })
export class ProfileService {
  appUrl = environment.appUrl;
  fileUrl = environment.fileUrl;
  constructor(private http: HttpClient, private authService: AuthService) {}

  changeProfileImage(data: any) {
    return this.http.post<any>(`${this.appUrl}/user/profile/image`, data).pipe(
      map((res: any) => {
        res.imageUrl = `${this.fileUrl}/profiles/${res.imageUrl}`;
        return res;
      }),
      tap((res) => {
        const user = this.authService.getUser();
        let imageUrl = res.imageUrl;

        if (!/^https?:\/\//i.test(imageUrl)) {
          imageUrl = `${this.fileUrl}/${imageUrl}`;
        }

        user.imageUrl = imageUrl;
        localStorage.setItem('user', JSON.stringify(user));
      })
    );
  }

  updateUserProfile(data: UserProfile) {
    return this.http
      .put<any>(`${this.appUrl}/user/creator/profile/update`, data)
      .pipe(
        tap((res) => {
          if (res.statusCode == 200) {
            const user = {
              firstName: res.user.firstName,
              lastName: res.user.lastName,
              whatsappNumber: res.user.whatsappNumber,
              phoneNumber: res.user.phoneNumber,
              biography: res.user.biography,
              role: res.user.role,
              imageUrl: res.user.imageUrl,
            };
            localStorage.setItem('user', JSON.stringify(user));
          }
        })
      );
  }
}
