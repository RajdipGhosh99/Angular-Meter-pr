import { Component, Inject, Input, NgZone, OnInit, PLATFORM_ID } from "@angular/core";


import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import { AppDashboardService } from "src/app/services/app-dashboard.service";

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css']
})
export class GraphComponent implements OnInit {

  @Input() meterReading: any
  @Input() meterId: any
  @Input() index: any

  progressBarVar:any


  data: any = []
  root: any = []
  chart: any = []
  yAxis: any = []
  xAxis: any = []
  series: any = []
  legend: any = []



  constructor(private appDashService: AppDashboardService) { }

  ngOnInit(): void { }



  ngAfterViewInit() {
    function SortData(params: any) {
      let data = params.filter(v => v.rUnit == "KWH")
      if (data.length >= 24) {
        let data2 = data.slice(0, 23)
        return data2

      }else{
        return data
      }
    }

    // Chart code goes in here

    this.root[this.index] = am5.Root.new(`chartdiv${this.index}`);

    this.root[this.index].setThemes([am5themes_Animated.new(this.root[this.index])]);

    this.chart[this.index] = this.root[this.index].container.children.push(
      am5xy.XYChart.new(this.root[this.index], {
        panY: false,
        layout: this.root[this.index].verticalLayout
      })
    );

    // Define data
    this.data[this.index] = [...SortData(this.meterReading)]
    this.progressBarVar = this.data[this.index]
    console.log(this.data[this.index])

    // Create Y-axis
    this.yAxis[this.index] = this.chart[this.index].yAxes.push(
      am5xy.ValueAxis.new(this.root[this.index], {
        renderer: am5xy.AxisRendererY.new(this.root[this.index], {})
      })
    );

    // Create X-Axis
    this.xAxis[this.index] = this.chart[this.index].xAxes.push(
      am5xy.CategoryAxis.new(this.root[this.index], {
        renderer: am5xy.AxisRendererX.new(this.root[this.index], {}),
        categoryField: "rDate"
      })
    );
    this.xAxis[this.index].data.setAll(this.data[this.index]);

    // Create series
    this.series[this.index] = this.chart[this.index].series.push(
      am5xy.ColumnSeries.new(this.root[this.index], {
        name: "KWH",
        xAxis: this.xAxis[this.index],
        yAxis: this.yAxis[this.index],
        valueYField: "rValue",
        categoryXField: "rDate"
      })
    );
    this.series[this.index].data.setAll(this.data[this.index]);



    // Add legend
    this.legend[this.index] = this.chart[this.index].children.push(am5.Legend.new(this.root[this.index], {}));
    this.legend[this.index].data.setAll(this.chart[this.index].series.values);

    // Add cursor
    this.chart[this.index].set("cursor", am5xy.XYCursor.new(this.root[this.index], {}));

    this.root = this.root[this.index];


  }



}
