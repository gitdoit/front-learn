import { Component, OnInit } from '@angular/core';
import {Input} from '@angular/core';
import { Output, EventEmitter } from '@angular/core';

@Component({
  // 是不是相当于Spring里面的BeanName
  // 按照惯例以app开头，后跟组件名
  selector: 'app-product-alerts',
  // 模板路径
  templateUrl: './product-alerts.component.html',
  // css文件路径
  styleUrls: ['./product-alerts.component.less']
})
export class ProductAlertsComponent implements OnInit {

  // 是不是相当于@Resource
  @Input() product;
  @Output() notify = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

}
