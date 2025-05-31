import { Component, OnInit } from '@angular/core';
import { LocationService } from '../../../core/services/location.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivityService } from '../../../core/services/activity.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SnackbarService } from '../../../core/services/snackbar.service';

@Component({
  selector: 'app-create-activity',
  templateUrl: './create-activity.component.html',
  styleUrls: ['./create-activity.component.css'],
})
export class CreateActivityComponent implements OnInit {
  activityForm: FormGroup;
  suggestions: any[] = [];
  imagePreviewUrl: string | null = null;
  selectedFile: File | null = null;
  activity: any;
  edit: boolean = false;
  id: string = '';
  isLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private locationService: LocationService,
    private activityService: ActivityService,
    private route: ActivatedRoute,
    private snackbarService: SnackbarService,
    private router: Router
  ) {
    this.activityForm = this.fb.group({
      title: ['', Validators.required],
      imageUrl: ['', Validators.required],
      shortDescription: ['', Validators.required],
      detailedDescription: ['', Validators.required],
      minAge: ['', [Validators.required]],
      maxAge: ['', Validators.required],
      type: ['', Validators.required],
      duration: ['', Validators.required],
      availability: ['', Validators.required],
      location: ['', Validators.required],
      lat: [''],
      lng: [''],
    });
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    if (this.id !== undefined) {
      this.edit = true;
      this.activityForm.get('imageUrl')?.clearValidators();
      this.activityService.getActivityById(this.id).subscribe({
        next: (activity: any) => {
          this.activityForm.patchValue({
            title: activity.title,
            shortDescription: activity.shortDescription,
            detailedDescription: activity.detailedDescription,
            minAge: activity.minAge,
            maxAge: activity.maxAge,
            type: activity.type,
            duration: activity.duration,
            availability: activity.availability,
            location: activity.location,
          });
          this.imagePreviewUrl = activity.imageUrl;
        },
        error: (error) => {},
      });
    }
  }

  onSubmit() {
    this.isLoading = true;
    Object.values(this.activityForm.controls).forEach((control) =>
      control.markAsTouched()
    );

    if (this.activityForm.invalid) {
      this.isLoading = false;
      return;
    }

    let formData = new FormData();
    Object.keys(this.activityForm.value).forEach((key) => {
      formData.append(key, this.activityForm.get(key)?.value);
    });

    if (this.selectedFile) {
      formData.append('file', this.selectedFile, this.selectedFile.name);
    }

    if (this.edit) {
      this.activityService.updateActivity(formData, this.id).subscribe({
        next: (res) => {
          this.snackbarService.openSnackbar(res.message, 'bg-success');
          this.isLoading = false;
        },
        error: (error) => {
          this.snackbarService.openSnackbar(
            'Error updating activity',
            'bg-warning'
          );
          this.isLoading = false;
        },
      });
    } else {
      this.activityService.createActivity(formData).subscribe({
        next: (res) => {
          this.snackbarService.openSnackbar(
            'Activity created Successfully',
            'bg-success'
          );
          this.activityForm.reset();
          this.imagePreviewUrl = '';
          this.isLoading = false;
        },
        error: (err) => {
          this.snackbarService.openSnackbar(err.error.message, 'bg-warning');
          this.isLoading = false;
        },
      });
    }
  }
  get locationControl() {
    return this.activityForm.get('location') as FormControl;
  }

  get imageControl() {
    return this.activityForm.get('imageUrl') as FormControl;
  }

  onLocationSelect(suggestion: any) {
    this.activityForm.patchValue({
      location: suggestion.formatted,
      lat: suggestion.geometry.lat,
      lng: suggestion.geometry.lng,
    });
    this.suggestions = [];
  }

  onLocationInput(event: any) {
    const query = event.target.value;
    if (query.length > 3) {
      this.locationService.getGeoLocationSuggestion(query).subscribe({
        next: (res: any) => {
          this.suggestions = res;
        },
        error: (err) => {
          this.snackbarService.openSnackbar(
            'Unknown error occurred while loading locations please check you internet',
            'bg-warning'
          );
        },
      });
    }
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreviewUrl = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }
}
