import { DynamoDBService } from './../../../aws/DynamoDBService';
import { Component, OnInit, ViewChild} from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { FormModalComponent } from './form-modal/form-modal.component';
import { LoginService } from '../../../services/Login.Service';
import { Router} from '@angular/router';

@Component({
  selector: 'app-corpo-login',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatSortModule, MatInputModule, FormsModule, NgIf, MatIconModule],
  templateUrl: './corpo-login.component.html',
  styleUrl: './corpo-login.component.css'
})

export class CorpoLoginComponent implements OnInit{

  constructor(private loginService : LoginService, private router: Router){}

  async ngOnInit(): Promise<void> {
    this.loginService.changeValue(true);
    this.router.navigate(['home']);
  }
}


