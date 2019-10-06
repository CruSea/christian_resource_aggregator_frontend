import { Component, OnInit } from '@angular/core';
import { BlogService } from './../../services/blog/blog.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {

  constructor(private blogService:BlogService) { }

  ngOnInit() {
    this.load();
  }
  posts=null;
  load(){
    this.blogService.getAll().subscribe(
      response=>{
        this.posts=response
      }
    );
  }
  public form = {
		authorName: null,
		authorChurch: null,
		title: null,
    description: null
    };
addPost(){
  let data=this.form;
  console.log(data);
  this.blogService.create(data).subscribe(
      response=>{
        console.log(response);
        this.load();
      },error=>{
        console.log(error);
      }
    );
}
  delete(id){
    this.blogService.delete(id).subscribe(response=>{
      console.log(response);
      this.load();
    },error=>{
      console.log(error);
    });
  }
}
