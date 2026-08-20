import { Component, inject } from '@angular/core';
import { FormBuilder, Validators, ɵInternalFormsSharedModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile',
  imports: [ɵInternalFormsSharedModule, ReactiveFormsModule],
  templateUrl: './profile.html',
  styleUrl: './profile.scss',
})
export class Profile {

  imagePreview: string = 'https://static.vecteezy.com/system/resources/thumbnails/036/594/092/small/man-empty-avatar-photo-placeholder-for-social-networks-resumes-forums-and-dating-sites-male-and-female-no-photo-images-for-unfilled-user-profile-free-vector.jpg';

  onImageSelected(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (!input.files || input.files.length === 0) {
      return;
    }

    const file = input.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };

    reader.readAsDataURL(file);
  }

  fb = inject(FormBuilder)

  profileForm = this.fb.group({

    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    phone: ['', Validators.required],
    dateOfBirth: ['', [Validators.required, Validators.pattern(/^(0[1-9]|[12]\d|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/)]]
  })

}
