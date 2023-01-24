import { Component, OnInit } from '@angular/core';
import { FunctionsService } from 'src/app/utilities/functions.service';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.page.html',
  styleUrls: ['./forgotpassword.page.scss'],
})
export class ForgotpasswordPage implements OnInit {

  constructor(private fun: FunctionsService) {


  }

  ngOnInit() {

  }


}
