import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  SessionService,
  DataStoredInToken,
} from '../common/services/session.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  session: DataStoredInToken;

  constructor(private sessionService: SessionService, router: Router) {}

  ngOnInit(): void {
    this.session = this.sessionService.decodeSession();
  }
}
