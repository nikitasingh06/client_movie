import { Component, OnInit } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { ConnectDbService } from '../connect-db.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  flag;
  id;
  search;
  searchedSeries;
  searchedMovies;
  comics:any;
  // comments:any;
  // newComment: {
  //   name: String,
  //   comment: String,
  //   comicId: String
  // } = {
  //   name: localStorage.getItem('name'),
  //   comment: '',
  //   comicId: ''
  // }

  constructor(public connect: ConnectDbService) { }
  
  ngOnInit() {
  }

  //search a movie
  searchMovies(){
    this.connect.searchMovies(this.search).subscribe(res =>{
      console.log(res);
        this.searchedMovies=res.data[0];
    })
  }

  //search a series
  searchSeries(){
    this.connect.searchSeries(this.search).subscribe(res =>{
      console.log(res);
        this.searchedSeries=res.data[0];
    })
  }

  // showComics(){
  //   this.connect.getComics().subscribe(res=>{
  //     console.log("comic res",res);
  //     this.comics=res;
  //   })
  // }

//   comment(_id){
//     this.id=_id;
//     this.flag =1;
//   }

//   commentOnComic(){
//     this.newComment.comicId = this.id;
//     this.connect.addComment(this.newComment).subscribe(res=>
//     {
//       if(res){
//             alert("Submitted! Thank you for your feedback")
//             console.log("response",res);
//       }
//     })
//   }

//   getComments(_id){
//     this.connect.getComments(_id).subscribe(res=>{
//       if(res.data!= "no comments"){
//         this.comments =res;
//         console.log(res)
//         console.log("comments",this.comments)
//       }
//       else if(res.data= "no comments"){
//         alert("no comments")        
//       }
//       else {
//         error => alert(error);
//       }
//      })    
//   }

}
