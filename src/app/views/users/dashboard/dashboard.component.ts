import {
  Component,
  OnInit,
  AfterViewInit,
  ChangeDetectionStrategy
} from "@angular/core";
import { egretAnimations } from "app/shared/animations/egret-animations";
import { ThemeService } from "app/shared/services/theme.service";
import tinyColor from 'tinycolor2';
import { TeamService } from "app/shared/services/team.service";
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  animations: egretAnimations
})
export class DashboardComponent implements OnInit, OnInit, AfterViewInit {
  
  trafficVsSaleOptions: any;
  trafficVsSale: any;
  trafficData: any;
  saleData: any;

  sessionOptions: any;
  sessions: any;
  sessionsData: any;

  trafficGrowthChart: any;
  bounceRateGrowthChart: any;

  dailyTrafficChartBar: any;
  trafficSourcesChart: any;
  countryTrafficStats: any[];

  count: any;


  //  weekly Graph configaration
  weeklyResults: any[] = [];
  weekNumber = 0
  userType: string;
  userLoggedIn = "Admin"
  getWidth(): any {
    if (document.body.offsetWidth < 850) {
      return '85%';
    }

    return 1100;
  }

  padding: any = { left: 5, top: 5, right: 5, bottom: 5 };
  titlePadding: any = { left: 90, top: 0, right: 0, bottom: 10 };

  xAxis: any =
    {
        dataField: 'date',
        showGridLines: true
    };
    seriesGroups: any[] =
    [
        {
            type: 'column',
            columnsGapPercent: 50,
            seriesGapPercent: 0,
            valueAxis:
            {
              unitInterval: 100,
              minValue: 0,
              maxValue: 1000,
              displayValueAxis: true,
              description: 'Count',
              axisSize: 'auto',
              tickMarksColor: '#888888'
          },
            series: [
                { dataField: 'approveCount', displayText: 'Approved' },
                { dataField: 'rejectCount', displayText: 'Rejected' },
                { dataField: 'openCount', displayText: 'Open' },
                { dataField: 'closeCount', displayText: 'Close' }

            ]
        }
    ];
    //  weekly Graph configaration //
  constructor(
    private themeService: ThemeService,
    private teamService: TeamService
  ) { }

  ngAfterViewInit() { }
  ngOnInit() {
    this.userType = localStorage.getItem('m3infrastructure_UserType')
     // Get DashBoard Counts From Api
     this.getCounts()

     // Get GraphCounts From API
     this.getGraphCounts()


    this.themeService.onThemeChange.subscribe(activeTheme => {
      this.initTrafficVsSaleChart(activeTheme);
      this.initSessionsChart(activeTheme);
      this.initTrafficSourcesChart(activeTheme)
      this.initDailyTrafficChartBar(activeTheme)
      this.initTrafficGrowthChart(activeTheme)

    });
    this.initTrafficVsSaleChart(this.themeService.activatedTheme);
    this.initSessionsChart(this.themeService.activatedTheme);
    
    this.initDailyTrafficChartBar(this.themeService.activatedTheme)
    this.initTrafficGrowthChart(this.themeService.activatedTheme)

    this.countryTrafficStats = [
      {
        country: "US",
        visitor: 14040,
        pageView: 10000,
        download: 1000,
        bounceRate: 30,
        flag: "flag-icon-us"
      },
      {
        country: "India",
        visitor: 12500,
        pageView: 10000,
        download: 1000,
        bounceRate: 45,
        flag: "flag-icon-in"
      },
      {
        country: "UK",
        visitor: 11000,
        pageView: 10000,
        download: 1000,
        bounceRate: 50,
        flag: "flag-icon-gb"
      },
      {
        country: "Brazil",
        visitor: 4000,
        pageView: 10000,
        download: 1000,
        bounceRate: 30,
        flag: "flag-icon-br"
      },
      {
        country: "Spain",
        visitor: 4000,
        pageView: 10000,
        download: 1000,
        bounceRate: 45,
        flag: "flag-icon-es"
      },
      {
        country: "Mexico",
        visitor: 4000,
        pageView: 10000,
        download: 1000,
        bounceRate: 70,
        flag: "flag-icon-mx"
      },
      {
        country: "Russia",
        visitor: 4000,
        pageView: 10000,
        download: 1000,
        bounceRate: 40,
        flag: "flag-icon-ru"
      }
    ];


    this.bounceRateGrowthChart = {
      tooltip: {
        trigger: "axis",

        axisPointer: {
          animation: true
        }
      },
      grid: {
        left: "0",
        top: "0",
        right: "0",
        bottom: "0"
      },
      xAxis: {
        type: "category",
        boundaryGap: false,
        data: ["0", "1", "2", "3", "4"],
        axisLabel: {
          show: false
        },
        axisLine: {
          lineStyle: {
            show: false
          }
        },
        axisTick: {
          show: false
        },
        splitLine: {
          show: false
        }
      },
      yAxis: {
        type: "value",
        min: 0,
        max: 1000,
        interval: 200,
        axisLabel: {
          show: false
        },
        axisLine: {
          show: false
        },
        axisTick: {
          show: false
        },
        splitLine: {
          show: false
        }
      },
      series: [
        {
          name: "Bounce Rate",
          type: "line",
          smooth: false,
          data: [0, 20, 90, 120, 190],
          symbolSize: 8,
          showSymbol: false,
          lineStyle: {
            opacity: 0,
            width: 0
          },
          itemStyle: {
            borderColor: "rgba(233, 31, 99, 0.4)"
          },
          areaStyle: {
            normal: {
              color: {
                type: "linear",
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: "rgba(244, 67, 54, 1)"
                  },
                  {
                    offset: 1,
                    color: "rgba(244, 67, 54, .4)"
                  }
                ]
              }
            }
          }
        }
      ]
    };

   
  }

  initTrafficVsSaleChart(theme) {
    this.trafficVsSaleOptions = {
      tooltip: {
        show: true,
        trigger: "axis",
        backgroundColor: "#fff",
        extraCssText: "box-shadow: 0 0 3px rgba(0, 0, 0, 0.3); color: #444",
        axisPointer: {
          type: "line",
          animation: true
        }
      },
      grid: {
        top: "10%",
        left: "80px",
        right: "30px",
        bottom: "60"
      },
      xAxis: {
        type: "category",
        boundaryGap: false,
        data: [
          "day",


        ],
        axisLabel: {
          show: true,
          margin: 20,
          color: "#888"
        },
        axisTick: {
          show: false
        },

        axisLine: {
          show: false,
          lineStyle: {
            show: false
          }
        },
        splitLine: {
          show: false
        }
      },
      yAxis: {
        type: "value",
        max: 1000,
        axisLine: {
          show: false
        },
        axisLabel: {
          show: true,
          margin: 30,
          color: "#888"
        },
        axisTick: {
          show: false
        },
        splitLine: {
          show: true,
          lineStyle: {
            type: "dashed"
          }
        }
      },
      series: [
        {
          name: "Traffic",
          label: { show: false, color: "#0168c1" },
          type: "bar",
          barGap: 0,
          color: tinyColor(theme.baseColor).setAlpha(.4).toString(),
          smooth: true
        },
        {
          name: "Sales",
          label: { show: false, color: "#639" },
          type: "bar",
          color: tinyColor(theme.baseColor).toString(),
          smooth: true
        },
        {
          name: "Salesssssssss",
          label: { show: false, color: "#68955" },
          type: "bar",
          color: tinyColor(theme.baseColor).toString(),
          smooth: true
        }
      ]
    };

    this.trafficData = [
      1400,

    ];
    this.saleData = [
      500,

    ];
    this.trafficVsSale = {
      series: [
        {
          data: this.trafficData
        },
        {
          data: this.saleData
        },
        {
          data: this.saleData
        }
      ]
    };
  }

  initSessionsChart(theme) {
    this.sessionOptions = {
      tooltip: {
        show: true,
        trigger: "axis",
        backgroundColor: "#fff",
        extraCssText: "box-shadow: 0 0 3px rgba(0, 0, 0, 0.3); color: #444",
        axisPointer: {
          type: "line",
          animation: true
        }
      },
      grid: {
        top: "10%",
        left: "60",
        right: "15",
        bottom: "60"
      },
      xAxis: {
        type: "category",
        data: [
          "1",
          "2",
          "3",
          "4",
          "5",
          "6",
          "7",
          "8",
          "9",
          "10",
          "11",
          "12",
          "13",
          "14",
          "15",
          "16",
          "17",
          "18",
          "19",
          "20",
          "21",
          "22",
          "23",
          "24",
          "25",
          "26",
          "27",
          "28",
          "29",
          "30"
        ],
        axisLine: {
          show: false
        },
        axisLabel: {
          show: true,
          margin: 30,
          color: "#888"
        },
        axisTick: {
          show: false
        }
      },
      yAxis: {
        type: "value",
        axisLine: {
          show: false
        },
        axisLabel: {
          show: true,
          margin: 20,
          color: "#888"
        },
        axisTick: {
          show: false
        },
        splitLine: {
          show: true,
          lineStyle: {
            type: "dashed"
          }
        }
      },
      series: [
        {
          data: [],
          type: "line",
          name: "User",
          smooth: true,
          color: tinyColor(theme.baseColor).toString(),
          lineStyle: {
            opacity: 1,
            width: 3
          },
          itemStyle: {
            opacity: 0
          },
          emphasis: {
            itemStyle: {
              color: "rgba(16, 23, 76, 1)",
              borderColor: "rgba(16, 23, 76, .4)",
              opacity: 1,
              borderWidth: 8
            },
            label: {
              show: false,
              backgroundColor: "#fff"
            }
          }
        }
      ]
    };
    this.sessionsData = [
      140,
      135,
      95,
      115,
      95,
      126,
      93,
      145,
      115,
      140,
      135,
      95,
      115,
      95,
      126,
      125,
      145,
      115,
      140,
      135,
      95,
      115,
      95,
      126,
      93,
      145,
      115,
      140,
      135,
      95
    ];

    this.sessions = {
      series: [
        {
          data: this.sessionsData
        }
      ]
    };
  }

  initTrafficSourcesChart(theme) {
    this.trafficSourcesChart = {
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true
      },
      color: [
        tinyColor(theme.baseColor).setAlpha(.6).toString(),
        tinyColor(theme.baseColor).setAlpha(.7).toString(),
        tinyColor(theme.baseColor).setAlpha(.8).toString()
      ],
      tooltip: {
        show: false,
        trigger: "item",
        formatter: "{a} <br/>{b}: {c} ({d}%)"
      },
      xAxis: [
        {
          axisLine: {
            show: false
          },
          splitLine: {
            show: false
          }
        }
      ],
      yAxis: [
        {
          axisLine: {
            show: false
          },
          splitLine: {
            show: false
          }
        }
      ],

      series: [
        {
          name: "Sessions",
          type: "pie",
          radius: ["55%", "85%"],
          center: ["50%", "50%"],
          avoidLabelOverlap: false,
          hoverOffset: 5,
          stillShowZeroSum: false,
          label: {
            normal: {
              show: false,
              position: "center",
              textStyle: {
                fontSize: "13",
                fontWeight: "normal"
              },
              formatter: "{a}"
            },
            emphasis: {
              show: true,
              textStyle: {
                fontSize: "15",
                fontWeight: "normal",
                color: "rgba(15, 21, 77, 1)"
              },
              formatter: "{b} \n{c} ({d}%)"
            }
          },
          labelLine: {
            normal: {
              show: false
            }
          },
          data: [
            {
              value: this.count == undefined ? 0 : this.count.approveCount,
              name: "Approved"
            },
            {
              value: this.count == undefined ? 0 : this.count.rejectCount,
              name: "Rejected"
            },
            { value: this.count == undefined ? 0 : this.count.holdCount,
              name: "Hold" 
            }

          ],
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)"
            }
          }
        }
      ]
    };
  }

  initDailyTrafficChartBar(theme) {
    this.dailyTrafficChartBar = {
      legend: {
        show: false
      },
      grid: {
        left: "8px",
        right: "8px",
        bottom: "0",
        top: "0",
        containLabel: true
      },
      tooltip: {
        show: true,
        backgroundColor: "rgba(0, 0, 0, .8)"
      },
      xAxis: [
        {
          type: "category",
          // data: ['Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
          data: ["1", "2", "3", "4", "5", "6", "7"],
          axisTick: {
            show: false
          },
          splitLine: {
            show: false
          },
          axisLine: {
            show: false
          },
          axisLabel: {
            color: "#fff"
          }
        }
      ],
      yAxis: [
        {
          type: "value",
          axisLabel: {
            show: false,
            formatter: "${value}"
          },
          min: 0,
          max: 100000,
          interval: 25000,
          axisTick: {
            show: false
          },
          axisLine: {
            show: false
          },
          splitLine: {
            show: false,
            interval: "auto"
          }
        }
      ],

      series: [
        {
          name: "Online",
          data: [35000, 69000, 22500, 60000, 50000, 50000, 30000],
          label: { show: true, color: tinyColor(theme.baseColor).toString(), position: "top" },
          type: "bar",
          barWidth: "12",
          color: tinyColor(theme.baseColor).toString(),
          smooth: true,
          itemStyle: {
            barBorderRadius: 10
          }
        }
      ]
    };
  }

  initTrafficGrowthChart(theme) {
    this.trafficGrowthChart = {
      tooltip: {
        trigger: "axis",

        axisPointer: {
          animation: true
        }
      },
      grid: {
        left: "0",
        top: "0",
        right: "0",
        bottom: "0"
      },
      xAxis: {
        type: "category",
        boundaryGap: false,
        data: ["0", "1", "2", "3", "4"],
        axisLabel: {
          show: false
        },
        axisLine: {
          lineStyle: {
            show: false
          }
        },
        axisTick: {
          show: false
        },
        splitLine: {
          show: false
        }
      },
      yAxis: {
        type: "value",
        min: 0,
        max: 200,
        interval: 50,
        axisLabel: {
          show: false
        },
        axisLine: {
          show: false
        },
        axisTick: {
          show: false
        },
        splitLine: {
          show: false
        }
      },
      series: [
        {
          name: "Visit",
          type: "line",
          smooth: false,
          data: [0, 40, 140, 90, 160],
          symbolSize: 8,
          showSymbol: false,
          lineStyle: {
            opacity: 0,
            width: 0
          },
          itemStyle: {
            borderColor: "rgba(233, 31, 99, 0.4)"
          },
          areaStyle: {
            normal: {
              color: {
                type: "linear",
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: tinyColor(theme.baseColor).toString()
                  },
                  {
                    offset: 1,
                    color: tinyColor(theme.baseColor).setAlpha(.6).toString()
                  }
                ]
              }
            }
          }
        }
      ]
    };
  }


  getCounts() {

    this.teamService.GetDasboardCounts().subscribe((resp: any) => {
      this.count = resp.data[0]
      this.initTrafficSourcesChart(this.themeService.activatedTheme)

    })

  }

  getGraphCounts() {

    
    console.log('this.weekNumber' , this.weekNumber)
    // Get Current week first and last days
    var curr = new Date();
    const day = curr.getDay() + this.weekNumber;
    const WeekFirstday = new Date(curr.getTime() - 60 * 60 * 24 * day * 1000); // will return firstday (i.e. Sunday) of the week
    const WeekLastday = new Date(WeekFirstday.getTime() + 60 * 60 * 24 * 6 * 1000); // adding (60*60*6*24*1000) means adding six days to the firstday which results in lastday (Saturday) of the week
    console.log({ WeekFirstday, WeekLastday })

    const requestObj = {
      WeekFirstday: WeekFirstday,
      WeekLastday: WeekLastday
    }
  // Get Graph Counts From API 
    this.teamService.getGraphCounts(requestObj).subscribe(response => {
      console.log('response', response)

       this.weeklyResults =  response.data != undefined ?   response.data : []

    })
  }

  weekReports(weekType){
    // weekType 1 (beforeWeek ) , 2 (afterweek)
    weekType == 1 ?  this.weekNumber += 7 : this.weekNumber -= 7
     this.getGraphCounts()
  }

}
