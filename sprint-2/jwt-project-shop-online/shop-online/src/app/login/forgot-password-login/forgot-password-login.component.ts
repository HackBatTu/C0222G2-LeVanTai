import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';

import {Title} from '@angular/platform-browser';
import {ForgotService} from "../../service/security/forgot.service";
import {CommonService} from "../../service/security/common.service";
import {CheckLogService} from "../../service/security/check-log.service";

@Component({
  selector: 'app-forgot-password-login',
  templateUrl: './forgot-password-login.component.html',
  styleUrls: ['./forgot-password-login.component.css']
})
export class ForgotPasswordLoginComponent implements OnInit {
  changePasswordForm: FormGroup;
  private token;

  constructor(private activatedRoute: ActivatedRoute,
              private forgotService: ForgotService,
              private toastrService: ToastrService,
              private router: Router,
              private logoutService: CheckLogService,
              private title: Title,
              private commonService: CommonService) {
    this.title.setTitle('Quên mật khẩu');
    this.activatedRoute.paramMap.subscribe(value => {
      this.token = value.get('token');
    }, error => {
    }, () => {
    });
    this.logoutService.onLogout().subscribe(value => {
    }, error => {
    }, () => {
      this.sendMessage();
    });
    this.createChangePasswordForm(this.token);
  }

  ngOnInit(): void {
  }

  createChangePasswordForm(token: string) {
    this.changePasswordForm = new FormGroup({
      token: new FormControl(token),
      pass: new FormGroup({
        password: new FormControl('', [Validators.required, Validators.pattern('^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{8,}$')]),
        confirmPassword: new FormControl('', [Validators.required, Validators.pattern('^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{8,}$')])
      }, this.checkConfirmPassword)
    });
  }

  checkConfirmPassword(pass: AbstractControl) {
    let value = pass.value;
    if (value.password != value.confirmPassword) {
      return {'confirm': true};
    }
    return null;
  }

  onChangePassword() {
    if (this.changePasswordForm.valid) {
      this.forgotService.onFindPassword(this.changePasswordForm.value).subscribe(value => {
        setTimeout(() => {
          this.router.navigateByUrl('/login').then(() => {
            this.toastrService.success('Đổi mật khẩu thành công!');
          });
        }, 1000);
        this.router.navigateByUrl('/loading').then(() => {
        });
      }, error => {

        setTimeout(() => {
          this.router.navigateByUrl('/home').then(() => {
            this.router.navigateByUrl('/login').then(() => {
              this.toastrService.warning('Có vẻ như liên kết của bạn đã hết hạn hãy thử lại sau ít phút!');
            });
            this.sendMessage();
          });
        }, 1000);
        this.router.navigateByUrl('/loading').then(() => {
        });
      }, () => {
      });
    } else {
      this.toastrService.error('Vui lòng nhập đúng dữ liệu!');
    }
  }

  sendMessage(): void {
    // send message to subscribers via observable subject
    this.commonService.sendUpdate('Đăng Nhập thành công!');
  }
}
