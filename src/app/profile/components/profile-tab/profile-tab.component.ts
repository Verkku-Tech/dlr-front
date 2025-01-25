import { AfterViewInit, Component, OnInit, inject } from '@angular/core';
import { NiceSelectOption } from '../../../shared/interfaces/option.interface';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../../auth/services/auth.service';
import { finalize } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { genderData } from '../../../shared/data/gender.data';
import { User } from '../../interfaces/user.interface';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-profile-tab',
  templateUrl: './profile-tab.component.html',
  styleUrl: './profile-tab.component.scss'
})
export class ProfileTabComponent implements OnInit, AfterViewInit {
  pendingPurchases: number = 1
  profileImg: ArrayBuffer | string | null = null
  lastFile: File | undefined
  displayedName: string = ''
  userId: string = ''
  defaultGender: number | undefined
  genderSelectOptions: NiceSelectOption[] = genderData;
  authService: AuthService = inject(AuthService)

  form: FormGroup = inject(FormBuilder).group({
    name: ['', [Validators.required]],
    phoneNumber: ['', [Validators.required]],
    email: ['', [Validators.required]],
    gender: ['', [Validators.required]],
    address: [''],
    imgUrl: [''],
  })

  private userService: UserService = inject(UserService)
  private spinnerService: NgxSpinnerService = inject(NgxSpinnerService)
  private toastrService: ToastrService = inject(ToastrService)


  constructor() {
    this.spinnerService.show()
  }
  ngAfterViewInit(): void {
    this.spinnerService.hide()
  }

  ngOnInit(): void {
    const { id } = this.authService.getDecodedAccessToken()
    this.userId = id
    this.userService.getUserDataById(id)
      .pipe(
        finalize(() => this.spinnerService.hide())
      )
      .subscribe(user => {
        this.loadUserData(user);
      })
  }

  changeHandler(selectedOption: NiceSelectOption) {
    this.userService.genderNiceSelectValue.set(selectedOption)
    this.form.get('gender')?.setValue(selectedOption.value)
  }

  saveChanges() {
    const override = {
      positionClass: 'toast-top-right'
    }

    this.spinnerService.show()
    const user: User = this.form.value;
    this.userService.updateUser(this.userId, user, this.lastFile)
      .pipe(
        finalize(() => this.spinnerService.hide())
      )
      .subscribe({
        next: (user) => {
          this.loadUserData(user)
          this.toastrService.success('', 'La información fue actualizada exitosamente!', override)
        },
        error: (err) => {
          this.toastrService.error('', err.error.message, override)
        }
      })
  }

  readImg(event: any): void {
    if (event.target.files && event.target.files[0]) {
      const file: File = event.target.files[0];
      this.lastFile = event.target.files[0]
      const reader = new FileReader();
      reader.onload = e => this.profileImg = reader.result;
      reader.readAsDataURL(file);
    }
  }

  private loadUserData(user: User) {
    const { name, phoneNumber, email, gender, address, imgUrl } = user;
    this.form.patchValue({ name, phoneNumber, email, gender, address, imgUrl });
    this.displayedName = name;
    this.userService.genderNiceSelectValue.set(this.genderSelectOptions.find(e => e.value === gender));
    this.profileImg = imgUrl
  }
}
