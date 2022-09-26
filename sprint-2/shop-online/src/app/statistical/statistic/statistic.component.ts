import {Component, OnInit} from '@angular/core';
import {StatisticalService} from "../../service/statistical.service";
import {FormGroup} from "@angular/forms";
import * as Chart from 'chart.js'
import {QuantityDto} from "../../model/quantity-dto";
import html2canvas from "html2canvas";
import {jsPDF} from "jspdf";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-statistic',
  templateUrl: './statistic.component.html',
  styleUrls: ['./statistic.component.css']
})
export class StatisticComponent implements OnInit {
  listStatisticWeek: QuantityDto[] = [];
  listStatisticMonth: QuantityDto[] = [];
  listStatisticYear: QuantityDto[] = [];
  public canvas: any;
  a: number = 222222;
  public ctx: any;
  public labelsW: string[] = [];
  public dataCasesW: number[] = [];
  public labelsM: string[] = [];
  public dataCasesM: number[] = [];
  public labelsY: string[] = [];
  public dataCasesY: number[] = [];
  isLoading: Boolean = false;

  constructor(private statisticalService: StatisticalService,
              private toast: ToastrService) {

  }

  ngOnInit(): void {
    this.getListWeek()
    this.getListMonth()
    this.getListYear()
    this.createLineChart();
  }

  private createLineChart() {
    this.canvas = document.getElementById('myChart');
    this.ctx = this.canvas.getContext('2d');

    const myChart = new Chart(this.ctx, {
      type: 'bar',
      data: {
        labels: this.labelsW,
        datasets: [{

          label: "Tuần",
          data: this.dataCasesW,
          backgroundColor: '#ffbb33',
          borderColor: '#ffbb33',
          fill: false,
          borderWidth: 2
        },
          {
            label: "Tháng",
            data: this.dataCasesM,
            backgroundColor: 'red',
            borderColor: 'red',
            fill: false,
            borderWidth: 2
          },
          {
            label: "Năm",
            data: this.dataCasesY,
            backgroundColor: '#1bff00',
            borderColor: '#1bff00',
            fill: false,
            borderWidth: 2
          }]
      },
      options: {
        title: {
          display: false,
          text: ""
        },
        tooltips: {
          mode: 'index',
          intersect: true
        },
        hover: {
          mode: 'nearest',
          intersect: true
        },
      }
    });
  }

  getListWeek() {
    this.statisticalService.getStatisticByWeek().subscribe((data: QuantityDto[]) => {
      this.listStatisticWeek = data;
      for (let i = 0; i < data.length; i++) {
        this.labelsW.push(data[i].name)
        this.dataCasesW.push(data[i].quantity)
      }
    })
  }

  getListMonth() {
    this.statisticalService.getStatisticByMonth().subscribe((value: QuantityDto[]) => {
      this.listStatisticMonth = value;
      for (let i = 0; i < value.length; i++) {
        this.labelsM.push(value[i].name)
        this.dataCasesM.push(value[i].quantity)
      }
    })
    console.log(this.listStatisticMonth)
  }

  getListYear() {
    this.statisticalService.getStatisticByYear().subscribe((year: QuantityDto[]) => {
      this.listStatisticYear = year;
      for (let i = 0; i < year.length; i++) {
        this.labelsY.push(year[i].name)
        this.dataCasesY.push(year[i].quantity)
      }
    })
  }

  generatePDF() {
    this.toggleLoading();
    let data = document.getElementById('pdf');
    html2canvas(data).then(canvas => {
      const contentDataURL = canvas.toDataURL('image/png')
      // @ts-ignore
      let doc = new jsPDF('p', 'pt', 'a4');
      let position = 0;
      // @ts-ignore
      const imgProps = doc.getImageProperties(canvas);
      const pdfWidth = doc.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      doc.addImage(contentDataURL, 'PNG', 0, 0, pdfWidth, pdfHeight);
      doc.save('Statistic-FateShop.pdf');
      this.toast.success("Xuất File Lịch Sử Của Bạn Thành Công!", "Thông Báo");
    });
  }

  toggleLoading() {

    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
    }, 2600)
  }

  selectType(target: any) {
    switch (target.value[3]) {
      case 'week':
        // @ts-ignore
        $('#week').show();
        // @ts-ignore
        $('#month').hide();
        // @ts-ignore
        $('#year').hide();
        break;
      case 'month':
        // @ts-ignore
        $('#week').hide();
        // @ts-ignore
        $('#month').show();
        // @ts-ignore
        $('#year').hide();
        break;
      case 'year':
        // @ts-ignore
        $('#week').hide();
        // @ts-ignore
        $('#month').hide();
        // @ts-ignore
        $('#year').show();
        break;
    }
  }
}
