import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoriesService } from 'src/app/shareds/services/categories.service';

@Component({
  selector: 'app-content-body',
  templateUrl: './content-body.component.html',
  styleUrls: ['./content-body.component.scss']
})
export class ContentBodyComponent implements OnInit {

  constructor(private router: Router, private categoryService: CategoriesService){}
  dataUser: any;
  menu: any = []
  ngOnInit() {
    const user: any = sessionStorage.getItem("currentUser");
    const currentUser = JSON.parse(user);
   
    this.dataUser = currentUser;
    this.getCategories()
  }


  logout(){
    sessionStorage.clear();
    this.router.navigateByUrl("")
  }

  getCategories(){
    this.categoryService.getAll().subscribe({
      next: (res: any) => {
        const categories = res.data;
        const values = categories.map((item: any) => ({
          page: item.name,
          title: item.name
        }))

        this.menu = values;
      },
      error: (err) => {
        console.log("test res categories ", err);
      }
    })
  }

}
