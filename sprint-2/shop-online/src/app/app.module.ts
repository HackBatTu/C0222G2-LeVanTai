import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HeaderComponent} from './header/header.component';
import {FooterComponent} from './footer/footer.component';
import {HomeComponent} from './home/home.component';
import {DetailProductComponent} from './detail-product/detail-product.component';
import {CartComponent} from './cart/cart.component';
import {ChartsModule} from 'ng2-charts';
import {BarChartComponent} from './charts-js/bar-chart/bar-chart.component';
import {DoughnutChartComponent} from './charts-js/doughnut-chart/doughnut-chart.component';
import {RadarChartComponent} from './charts-js/radar-chart/radar-chart.component';
import {PieChartComponent} from './charts-js/pie-chart/pie-chart.component';
import {ToastrModule} from 'ngx-toastr';
import {environment} from '../environments/environment';
import {AngularFireModule} from '@angular/fire';
import {ProductModule} from './product/product.module';
import {LoginModule} from './login/login.module';
import {HttpClientModule} from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    DetailProductComponent,
    CartComponent,
    BarChartComponent,
    DoughnutChartComponent,
    RadarChartComponent,
    PieChartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ChartsModule,
    ProductModule,
    HttpClientModule,
    LoginModule,
    AngularFireModule.initializeApp(environment.firebase),
    ToastrModule.forRoot(
      {
        timeOut: 2000,
        closeButton: true,
        progressBar: true,
        positionClass: 'toast-top-left',
        preventDuplicates: true,
      }
    ),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
