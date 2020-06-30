import { Component } from '@angular/core';
import * as moment from 'moment';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'calender';
  noOfDaysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  months = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];
  days = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat' ];
  month: number; // indexes of the month array
  Presentday: number; // todays date
  Presentyear: number;
  FirstDayOfMonth: number; // index of the day starting from 0-sunday to 6-saturday
  calendar = [];
  selectedDate: string;
  constructor() {
    let date = new Date();
    this.month = moment(date).month();
    this.Presentday = moment(date).date();
    this.Presentyear = moment(date).year();
    this.FirstDayOfMonth = moment(date).startOf('month').day();
    let isFirstRow: boolean = false;
    let MonthCalender = [];
    let startCount = 1;
    let maxCount = this.noOfDaysInMonth[this.month];
    for(let i = 0; i < 6; i++) {
      for(let j = 0; j < 7; j++) {
        if(j < this.FirstDayOfMonth && !isFirstRow){
          continue;
        } else {
          isFirstRow = true;
        }
        if(startCount <= maxCount) {
          if(!this.calendar[i])
            this.calendar[i] = [];
          this.calendar[i][j] = startCount++;
        }
      }
    }
    this.selectedDate = this.Presentday + "-" + this.month + "-" + this.Presentyear;
  }

  isselected(day) {
  let selectedDayDetails = this.selectedDate.split('-');
  if(selectedDayDetails[0] == day && selectedDayDetails[1] === this.month.toString() && selectedDayDetails[2] === this.Presentyear.toString()) {
   return true;
  }
  return false;
  }
  updateDate(day) {
    let date = new Date();
    let todayMonth = moment(date).month();
    let today = moment(date).date();
    let todayYear = moment(date).year();
    if(day) {
      if(todayMonth > this.month || todayYear > this.Presentyear) {
          return;
      } else if (todayMonth === this.month && todayYear === this.Presentyear) {
        console.log(todayMonth,this.month);
          if(today > day)
            return;
      }
      this.selectedDate = day + "-" + this.month + "-" + this.Presentyear;
    }
    return;
  }
  nextMonth() {
    if(this.month === 11) {
      this.month = 0;
      this.Presentyear++;
    } else {
      this.month++;
    }
    this.updateCalender();
  }
  previousMonth() {
    if(this.month === 0) {
      this.month = 11;
      this.Presentyear--;
    } else {
      this.month--;
    }
    this.updateCalender();
  }
  updateCalender() {
    this.FirstDayOfMonth = moment([this.Presentyear,this.month]).day();
    let isFirstRow: boolean = false;
    let startCount = 1;
    let maxCount = this.noOfDaysInMonth[this.month];
    this.calendar = [];
    for(let i = 0; i < 6; i++) {
      for(let j = 0; j < 7; j++) {
        if(j < this.FirstDayOfMonth && !isFirstRow){
          continue;
        } else {
          isFirstRow = true;
        }
        if(startCount <= maxCount) {
          if(!this.calendar[i])
            this.calendar[i] = [];
          this.calendar[i][j] = startCount++;
        }
      }
    }
  }
}
