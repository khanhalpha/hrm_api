import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-error-code',
  templateUrl: './error-code.component.html',
  styleUrls: ['./error-code.component.css']
})
export class ErrorCodeComponent implements OnInit {
  @Input() code = '';
  @Input() title = '';
  @Input() message = '';
  
  constructor() { }

  ngOnInit(): void {
  }

}
