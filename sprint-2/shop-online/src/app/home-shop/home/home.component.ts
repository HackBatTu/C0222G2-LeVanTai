import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {CookieService} from '../../login/service/cookie.service';
import {ToastrService} from 'ngx-toastr';
import {LogoutService} from '../../login/service/logout.service';
import {Router} from '@angular/router';
import {CommonService} from '../../login/service/common.service';
import {ProductService} from '../../service/product.service';
import {Product} from "../../model/product";
import {FormControl, FormGroup} from "@angular/forms";
import {Order} from "../../model/order";
import {OrderService} from "../../service/order.service";
import {Customer} from "../../model/customer";
import {CustomerService} from "../../service/customer.service";
import {Category} from "../../model/category";

declare var $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  role: string = '';
  username: string = '';
  token: string = '';
  product: Product[] = [];
  searchForm: FormGroup;
  totalPages: number;
  number: number;
  countTotalPages: number[];
  customer: Customer;
  startPrice: string = '0';
  endPrice: string = '200000000';
  searchName: string;
  searchOrigin: string;
  category: Category;
  sort: string = '';
  categoryId: string = '';
  public infoStatus: boolean = false;


  constructor(private title: Title,
              private cookieService: CookieService,
              private productService: ProductService,
              private toastrService: ToastrService,
              private logoutService: LogoutService,
              private router: Router,
              private orderService: OrderService,
              private customerService: CustomerService,
              private commonService: CommonService) {
    this.title.setTitle("Trang chủ FateShop")
    this.role = this.readCookieService('role');
    this.username = this.readCookieService('username');
    this.token = this.readCookieService('jwToken');
  }

  readCookieService(key: string): string {
    return this.cookieService.getCookie(key);
  }

  ngOnInit(): void {
    this.getCategory();
    this.getAll(0,this.categoryId, this.searchName, this.searchOrigin, this.startPrice,this.endPrice,this.sort);
    this.getCustomerByUsername(this.username);
    this.searchForm = new FormGroup({
      searchName: new FormControl(),
      searchOrigin: new FormControl(),
    });
  }

  getAll(page: number,searchCategory, searchName, searchOrigin, searchStartPrice,searchEndPrice,sort) {
    this.productService.getAll(page,searchCategory, searchName, searchOrigin, searchStartPrice,searchEndPrice,sort).subscribe((data: Product[]) => {
      // console.log(data)
      if (data != null) {
        // @ts-ignore
        this.product = data.content;
      } else {
        this.product = [];
      }
      if (this.product.length !== 0) {
        // @ts-ignore
        this.totalPages = data.totalPages;
        // @ts-ignore
        this.countTotalPages = new Array(data.totalPages);
        // @ts-ignore
        this.number = data.number;
      }
    });
  }

  getCategory(){
    this.productService.getAllCategory().subscribe( data => {
      // console.log(data)
      // @ts-ignore
      this.category = data;
    })
  }

  getSearch() {
    // this.searchForm.value.searchName = this.searchForm.value.searchName.trim();
    // this.searchForm.value.searchOrigin = this.searchForm.value.searchOrigin.trim();
    this.searchName = this.searchForm.value.searchName;
    this.searchOrigin = this.searchForm.value.searchOrigin;
    this.getAll(0,this.categoryId, this.searchName, this.searchOrigin, this.startPrice,this.endPrice,this.sort);
  }


  goPrevious() {
    let numberPage: number = this.number;
    if (numberPage > 0) {
      numberPage--;
      this.getAll(numberPage,this.categoryId, this.searchName, this.searchOrigin, this.startPrice,this.endPrice,this.sort);
    }
  }

  goNext() {
    let numberPage: number = this.number;
    if (numberPage < this.totalPages - 1) {
      numberPage++;
      this.getAll(numberPage, this.categoryId,this.searchName, this.searchOrigin, this.startPrice,this.endPrice,this.sort);
    }
  }

  goItem(i: number) {
    this.getAll(i,this.categoryId, this.searchName, this.searchOrigin, this.startPrice,this.endPrice,this.sort);
  }

  deleteProduct(id: number) {
    let numberPage: number = this.number;
    // @ts-ignore
    this.productService.deleteProduct(id).subscribe(value => {
      // @ts-ignore
      $('#exampleModal' + id).modal('hide');
      this.toastrService.success('Xóa thành công !!!', 'SOS!!!');
      this.getAll(numberPage, this.categoryId,this.searchName, this.searchOrigin, this.startPrice,this.endPrice,this.sort);
      this.router.navigateByUrl('/home').then();
    }, error => {
    }, () => {
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
    this.toastrService.warning('Vui lòng đăng nhập tài khoản thành viên để thực hiện chức năng này!');
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

  public fPrince: string = 'Tìm kiếm theo giá'
  filterPrice(start: string, end: string) {
    this.startPrice = start;
    this.endPrice =end;
    this.getAll(0,this.categoryId,'','',start,end,this.sort)
    this.fPrince = "Từ " + start + 'đ - ' +end + 'đ'
  }

  public cName: string = 'Tìm kiếm theo danh mục';
  filterCategory(id: string, name: string) {
    this.getAll(0,id,this.searchName, this.searchOrigin,this.startPrice,this.endPrice,this.sort);
    this.cName ='Tìm kiếm theo ' + name;
  }
  titleSort: string = 'Sắp xếp';
  sortDate() {
    this.titleSort = 'Mới nhất'
    this.sort = 'date_in,desc';
    this.getAll(0, this.categoryId,this.searchName, this.searchOrigin, this.startPrice, this.endPrice, this.sort);
  }

  sortPriceASC() {
    this.titleSort = 'Giá tăng dần'
    this.sort = 'price';
    this.getAll(0, this.categoryId,this.searchName, this.searchOrigin, this.startPrice, this.endPrice, this.sort);
  }
  sortPriceDESC() {
    this.titleSort = 'Giá giảm dần'
    this.sort = 'price,desc';
    this.getAll(0, this.categoryId,this.searchName, this.searchOrigin, this.startPrice, this.endPrice, this.sort);
  }

  onActivate(event) {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }
}
