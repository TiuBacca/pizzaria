import { Component, OnInit } from '@angular/core';

import { Subject } from 'rxjs';
import { LoaderService } from 'src/app/services/loader.service';
@Component({
  selector: 'lib-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css'],
})
export class LoaderComponent implements OnInit {

  loading: Subject<boolean> = this.loaderService.isLoading;

  constructor(private loaderService: LoaderService) { }

  ngOnInit(): void {
  }

}
