import { Component, OnInit } from '@angular/core';
import { ResourcesService } from 'app/services/resource/resources.service';

@Component({
  selector: 'app-resources',
  templateUrl: './resources.component.html',
  styleUrls: ['./resources.component.scss']
})
export class ResourcesComponent implements OnInit {

  constructor(private resService:ResourcesService) { }
  resources=null;
  ngOnInit() {;
    this.load()
  }
  load(){
    this.resService.getAll().subscribe(
      response=>{
        this.resources=response;
        console.log(response);
      },error=>{
        console.log(error);
      }
    );
  }
  public form = {
		name: null,
		resourceType: null,
		description: null,
    keyword: null,
    link:null
  };
  delete(id){
    this.resService.delete(id).subscribe(response=>{
      console.log(response);
      this.load();
    },error=>{
      console.log(error);
    });
  }
  registerResource(){
    let data=this.form;
    console.log(this.form);
    this.resService.create(data).subscribe(
      response=>{
        console.log(response);
        this.load();
      },error=>{
        console.log(error);
      }
    );
  }
}
