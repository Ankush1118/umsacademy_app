import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
})
export class LoaderComponent implements OnInit {

  static loaderCount: number = 0;

  constructor() {
  }

  ngOnInit() {
  }

  public static showLoader() {
    ++LoaderComponent.loaderCount;
  }

  public static hideLoader() {
    --LoaderComponent.loaderCount;
  }



  getLoaderCount() {
    return LoaderComponent.loaderCount
  }
}
