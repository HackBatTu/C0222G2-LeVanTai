import { Component, OnInit } from '@angular/core';
import {Product} from "../../model/product";
import {Title} from "@angular/platform-browser";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";
import {Order} from "../../model/order";
import {Customer} from "../../model/customer";
import {FormControl, FormGroup} from "@angular/forms";
import {AuthService} from "../../service/security/auth.service";
import {ProductService} from "../../service/product/product.service";
import {OrderService} from "../../service/product/order.service";
import {CustomerService} from "../../service/customer/customer.service";
import {CommonService} from "../../service/security/common.service";

@Component({
  selector: 'app-smart-phone',
  templateUrl: './smart-phone.component.html',
  styleUrls: ['./smart-phone.component.css']
})
export class SmartPhoneComponent implements OnInit {
  role: string = '';
  username: string = '';
  token: string = '';
  public infoStatus: boolean = false;
  smartPhoneProduct: Product[] = [];
  customer: Customer;
  sortTitle: string = 'Sắp xếp theo';
  searchForm: FormGroup;
  p: number = 1;
  public loginStatus: any;
  constructor(private title: Title,
              private productService: ProductService,
              private toastrService: ToastrService,
              private router: Router,
              private authService: AuthService,
              private orderService: OrderService,
              private customerService: CustomerService,
              private commonService: CommonService) {
    this.title.setTitle("Trang Sản Phẩm Điện Thoại")
    this.authService.checkLogin().subscribe(value => {
      this.loginStatus = value;
      if (value) {
        this.authService.getRoles().subscribe(resp => {
          this.getCustomerByUsername(resp.username);
          this.getRole(resp);
        }, error => {
        });
      } else {

      }
    }, error => {
    });
  }

  getRole(value: any) {
    if (this.isAdmin(value.grantList)) {
      this.role = 'ROLE_ADMIN';
    } else if (this.isUser(value.grantList)) {
      this.role = 'ROLE_USER';
    }
    this.username = value.username;
  }

  isAdmin(grantList: string[]): boolean {
    return grantList.some(value => {
      return value === 'ROLE_ADMIN';
    });
  }

  isUser(grantList: string[]): boolean {
    return grantList.some(value => {
      return value === 'ROLE_USER';
    });
  }

  ngOnInit(): void {
    this.getSmartPhone()
    this.searchForm = new FormGroup({
      searchName: new FormControl(),
      searchOrigin: new FormControl(),
    });
  }

  getSmartPhone(){
    this.productService.getSmartPhone().subscribe(data =>{
      console.log(data)
      // @ts-ignore
      this.smartPhoneProduct = data;
    })
  }
  addToCart(product: Product) {
    let order: Order = {
      customer: this.customer,
      product: product,
      quantity: 1
    };
    this.orderService.addOrder(order).subscribe((po: Order) => {
      this.toastrService.success('Thêm thành công sản phẩm ' + po.product.name);
      this.sendMessage();
    }, error => {
      if (error.error.message == 'quantity') {
        this.toastrService.warning('Bạn đã thêm vượt quá số lượng sản phẩm!');
      }
    });
  }
  getCustomerByUsername(username: string) {
    this.customerService.getCustomerByUserName(username).subscribe(value => {
      this.customer = value;
      if (value == null) {
        this.infoStatus = true;
      } else {
        this.infoStatus = value.appUser.isDeleted;
      }
    });
  }

  addToCartMessage() {
    this.toastrService.warning('Vui lòng đăng nhập thành viên để thực hiện chức năng này!');
  }
  addToCartMessage2() {
    this.router.navigateByUrl('/login').then(value => {
      this.toastrService.warning('Vui lòng đăng nhập tài khoản thành viên để thực hiện chức năng này!');
    });
  }
  updateInfoMessage() {
    this.router.navigateByUrl('/info').then(value => {
      this.toastrService.warning('Vui lòng cập nhật thông tin để mua hàng!');
    });
  }
  sendMessage(): void {
    this.commonService.sendUpdate('Success!');
  }
  deleteProduct(id: number) {
    // @ts-ignore
    this.productService.deleteProduct(id).subscribe(value => {
    }, error => {
    }, () => {
      // @ts-ignore
      $('#staticBackdropDelete' + id).modal('hide');
      this.toastrService.error('deleted', 'SOS!!!');
      this.ngOnInit();
      this.router.navigateByUrl('/home').then();
    })
  }
  sortByDate(sortValue: string) {
    this.sortTitle = "Ngày phát hành"
    // this.getAll(0, this.categoryId, '', '', this.startPrice, this.endPrice, sortValue);
  }

  sortByPriceDESC(sortValue: string) {
    this.sortTitle = "Giá cao đến thấp"
    // this.getAll(0, this.categoryId, '', '', this.startPrice, this.endPrice, sortValue);
  }
  sortByPriceASC(sortValue: string) {
    this.sortTitle = "Giá thấp đến cao"
    // this.getAll(0, this.categoryId, '', '', this.startPrice, this.endPrice, sortValue);
  }
  getSearch() {
    const searchByName = this.searchForm.value.searchName;
    const searchByOrigin = this.searchForm.value.searchOrigin;
    // this.getAll(0,this.categoryId, searchByName, searchByOrigin, this.startPrice,this.endPrice,this.sort);
  }
}
