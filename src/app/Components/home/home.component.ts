import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/AuthService';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{


  constructor(private authService: AuthService, private router: Router) {}


  async ngOnInit(): Promise<void> {
    // console.log(await this.authService.getCurrentUserFullName());
  }

}
