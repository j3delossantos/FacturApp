import { Component, HostBinding, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.less']
})
export class UserListComponent implements OnInit {
  @HostBinding('class')class='row';

  users:any = [];

  constructor(private appService:AppService) { }

  ngOnInit(): void {
    this.getUsers();
  }


  getUsers(){
    this.appService.getUsers().subscribe(
      res=>{
        this.users = res
      },
      err=> console.log(err)

    );
  }

}
