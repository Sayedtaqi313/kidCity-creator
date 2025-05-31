// src/app/profile/profile.component.ts
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { ProfileService } from '../../../core/services/profile.service';
import { Router } from '@angular/router';
import { SnackbarService } from '../../../core/services/snackbar.service';
import { tap } from 'rxjs';
import { UserProfile } from '../../../core/types/user-profile.type.interface';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  isEditing = false;
  showPassword = false;
  imageUrl: string | null = null;
  profileForm: FormGroup;
  isLoading: boolean = false;
  isImageLoading: boolean = false;
  private originalData!: UserProfile;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private profileService: ProfileService,
    private router: Router,
    private snackbarService: SnackbarService
  ) {
    this.profileForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: [
        { value: '', disabled: true },
        [Validators.required, Validators.email],
      ],
      phoneNumber: [
        '',
        [Validators.required, Validators.pattern(/^[0-9]{10,15}$/)],
      ],
      whatsappNumber: [
        '',
        [Validators.required, Validators.pattern(/^[0-9]{10,15}$/)],
      ],
      biography: ['', [Validators.required, Validators.maxLength(500)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit(): void {
    const user = this.authService.getUser() as UserProfile | null;
    if (!user) {
      this.router.navigate(['/auth/signin']);
      return;
    }
    this.initializeData(user);
  }

  private initializeData(user: UserProfile): void {
    this.imageUrl = user.imageUrl ?? null;
    this.originalData = { ...user };
    this.profileForm.patchValue({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phoneNumber: user.phoneNumber || '',
      whatsappNumber: user.whatsappNumber || '',
      biography: user.biography || '',
    });
    this.profileForm.disable();
  }

  toggleEdit(): void {
    this.isEditing = !this.isEditing;
    if (this.isEditing) {
      this.profileForm.enable();
      this.profileForm.get('email')?.disable();
    } else {
      this.profileForm.disable();
    }
  }

  saveChanges(): void {
    this.profileForm.markAllAsTouched();
    if (this.profileForm.invalid) return;
    this.isLoading = true;

    const {
      firstName,
      lastName,
      password,
      whatsappNumber,
      phoneNumber,
      biography,
    } = this.profileForm.value;
    const updatedData: any = {
      firstName,
      lastName,
      whatsappNumber,
      phoneNumber,
      biography,
    };
    if (password) updatedData.password = password;
    this.profileService.updateUserProfile(updatedData).subscribe({
      next: (res) => {
        this.snackbarService.openSnackbar(
          'Profile data updated successfully',
          'bg-success'
        );
        this.isLoading = false;
      },
      error: (err) => {
        this.snackbarService.openSnackbar(err.error.message, 'bg-warning');
        this.isLoading = false;
      },
    });
  }

  cancelEdit(): void {
    this.profileForm.patchValue({
      firstName: this.originalData.firstName,
      lastName: this.originalData.lastName,
      password: '',
    });
    this.toggleEdit();
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) return;
    const file = input.files[0];
    const reader = new FileReader();
    reader.onload = () => (this.imageUrl = reader.result as string);
    reader.readAsDataURL(file);
    this.isImageLoading = true;
    const formData = new FormData();
    formData.append('imageUrl', file);
    this.profileService.changeProfileImage(formData).subscribe({
      next: (res: any) => {
        this.imageUrl = res.imageUrl;
        this.snackbarService.openSnackbar(
          'Image profile updated successfully',
          'bg-success'
        );
        this.isImageLoading = false;
      },

      error: (err) => {
        this.snackbarService.openSnackbar(err.error.message, 'bg-bg-warning');
        this.isImageLoading = false;
      },
    });
  }
}
