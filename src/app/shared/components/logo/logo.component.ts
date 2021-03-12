import { Component, Input, OnInit } from '@angular/core'

@Component({
  selector: 'num-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.scss'],
})
export class LogoComponent implements OnInit {
  constructor() {}
  ShouldAnimate: boolean

  @Input()
  shouldAnimate: boolean

  ngOnInit(): void {
    this.ShouldAnimate = this.shouldAnimate
  }
}
