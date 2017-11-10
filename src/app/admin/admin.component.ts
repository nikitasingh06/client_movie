import { Component, OnInit } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { ConnectDbService } from '../connect-db.service';
import { FormBuilder, FormGroup, FormControl, Validators, FormArray, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  flagcategory;
  flagMovie;
  flagSeries;
  flagSeason;
  flagEpisode;
  flagEditseries;
  flagEditseason;
  flagEditcomic;
  series: any;
  seasons: any;
  comics: any;
  categories: any;
  category: FormGroup;
  movie: FormGroup;
  newSeries: FormGroup;
  newSeason: FormGroup;
  newEpisode: FormGroup;
  movies: any;
  type;
  showError = false;



  constructor(public connect: ConnectDbService, public router: Router, public fb: FormBuilder) {
    this.category = fb.group({
      name: ['', [Validators.required]]
    })

    this.movie = fb.group({
      name: ['', [Validators.maxLength(99), Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      image: ['', [Validators.required]],
      type: ['', [Validators.required]]
    })

    this.newSeries = fb.group({
      name: ['', [Validators.maxLength(99), Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      description: ['', [Validators.maxLength(99), Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      createdby: ['', [Validators.maxLength(99), Validators.required, Validators.pattern('[a-zA-Z ]*')]],
    })

    this.newSeason = fb.group({
      seriesid: ['', [Validators.required]],     
      name: ['', [Validators.maxLength(99), Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      description: ['', [Validators.maxLength(99), Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      startson: [''],
      endson: ['']
    })

    this.newEpisode = fb.group({
      seriesid: ['', [Validators.required]],    
      seasonid: ['', [Validators.required]],   
      name: ['', [Validators.maxLength(99), Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      story:['', [Validators.maxLength(99), Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      image: ['', [Validators.required]]   
    })
  }

  ngOnInit() {
  }

  formCategory() {
    this.flagcategory = 1;
  }
  formSeries() {
    this.flagSeries = 1;
    this.flagSeason = 0;
    this.flagEpisode = 0;
  }

  formSeason() {
    this.flagSeries = 0;
    this.flagSeason = 1;
    this.flagEpisode = 0;
  }

  formComic() {
    this.flagSeries = 0;
    this.flagSeason = 0;
    this.flagEpisode = 1;
  }

  ESeries(_id) {
    this.flagEditseries = 1;
    this.flagEditseason = 0;
    this.flagEditcomic = 0;
  }

  ESeason() {
    this.flagEditseries = 0;
    this.flagEditseason = 1;
    this.flagEditcomic = 0;
  }

  EComic() {
    this.flagEditseries = 0;
    this.flagEditseason = 0;
    this.flagEditcomic = 1;
  }

  //add new category
  addCategory() {
    if (this.category.valid === true) {
      this.showError = false;
      this.connect.addCategory(this.category.value).subscribe(res => {
        this.flagcategory = 0;
        if (res.data != "exist") {
          alert("Category has been added");
          this.getCategories();
          console.log("added", res);
        }
        else if (res.data = "exist") {
          alert("exists")
        }
        else {
          error => alert(error);
        }
      })
    }
    else {
      this.showError = true;
    }
  }

  //get categories
  getCategories() {
    this.connect.getCategories().subscribe(res => {
      this.categories = res;
      console.log("res", res)
    })
  }

  //for displaying form for adding  movie
  addM(type){
    this.flagMovie = 1;    
    this.type= type;
  }

  //add movies
  addMovie() {
    this.movie.controls['type'].setValue(this.type);    
    if (this.movie.valid === true) {
      this.showError = false;
      this.connect.addMovie(this.movie.value).subscribe(res => {
        this.flagMovie = 0;
        if (res.data != "exist") {
          alert("Movie has been added");
            this.getMovies();
          console.log("added", res);
        }
        else if (res.data = "exist") {
          alert("exists")
        }
        else {
          error => alert(error);
        }
      })
    }
    else {
      alert("eknwk")
      this.showError = true;
    }
  }

  //get movies
  getMovies() {
    this.connect.getMovies().subscribe(res => {
      this.movies = res;
      console.log("res", res)
    })
  }

  //delete a movie
  deleteMovie(_id){
    var sure = confirm("Are you sure to delete this movie?");
    if (sure == true) {
      this.connect.deleteMovie(_id).subscribe(res => {
        alert("Deleted");
        this.getMovies();
      }
        , error => {
          alert(error);
        });
    } else {
      alert("Movie cannot be deleted!");
    }
  }
  
  //add a series
  addSeries() {
    if (this.newSeries.valid === true) {
      this.showError = false;
    this.connect.postSeries(this.newSeries.value).subscribe(res => {
      this.flagSeries = 0;
      if (res.data != "exist") {
        console.log(res)
        localStorage.setItem("seriesid",res.body._id);
        alert("Series has been added");
        this.flagSeason = 1;
        console.log("added", res);
      }
      else if (res.data = "exist") {
        alert("exists")
      }
      else {
        error => alert(error);
      }
    })
  }
    else{
      alert("else")
      this.showError = true;
    }
  }

  //get Series
  getSeries() {
    this.connect.getSeries().subscribe(res => {
      this.series = res;
    })
  }

  //edit Series
  editSeries() {
    this.connect.editSeries(this.newSeries.value).subscribe(res => {
      alert("edited")
    }
      , error => {
        alert(error);
      });
  }


  deleteSeries(_id) {
    var sure = confirm("Are you sure to delete this series?");
    if (sure == true) {
      this.connect.deleteSeries(_id).subscribe(res => {
        alert("Deleted");
        this.getSeries();
      }
        , error => {
          alert(error);
        });
    } else {
      alert("Series cannot be deleted!");
    }
  }

  addSeason() {
    var seriesid1 = localStorage.getItem("seriesid")
    console.log("series",seriesid1)
    this.newSeason.controls['seriesid'].setValue(seriesid1);  
    if (this.newSeason.valid === true) {
      this.showError = false;
    this.connect.postSeason(this.newSeason.value).subscribe(res => {
      this.flagSeason = 0;
      if (res.data != "exist") {
        localStorage.setItem("seasonid",res.body._id);
        alert("Season has been added");
        this.flagEpisode = 1;
        console.log("added", res);
      }
      else if (res.data = "exist") {
        alert("exists")
      }
      else {
        error => alert(error);
      }
    })
  }
  else{
    this.showError = true;
    
  }
  }

  getSeasons() {
    this.connect.getSeasons().subscribe(res => {
      this.seasons = res;
    })
  }

  editSeason() {
    console.log(this.newSeason)
    this.connect.editSeason(this.newSeason.value).subscribe(res => {
      alert("edited")
    }
      , error => {
        alert(error);
      });
  }

  deleteSeason(_id) {
    var sure = confirm("Are you sure to delete this season?");
    if (sure == true) {
      this.connect.deleteSeason(_id).subscribe(res => {
        alert("Deleted");
        this.getSeasons();
      }
        , error => {
          alert(error);
        });
    } else {
      alert("season cannot be deleted!");
    }
  }

  addEpisode() { 
    var seriesid = localStorage.getItem("seriesid")
    var seasonid = localStorage.getItem("seasonid");
    this.newEpisode.controls['seriesid'].setValue(seriesid);  
    this.newEpisode.controls['seasonid'].setValue(seasonid);  
    
    if (this.newEpisode.valid === true) {
    this.showError = false;
    this.connect.postEpisode(this.newEpisode.value).subscribe(res => {
      this.flagEpisode = 0;
      if (res.data != "exist") {
        alert("Episode has been added");
        console.log("added", res);
      }
      else if (res.data = "exist") {
        alert("exists")
      }
      else {
        error => alert(error);
      }
    })
  }
  else{
    this.showError = true;
  }
  }

  getEpisodes() {
    this.connect.getEpisodes().subscribe(res => {
      console.log(res)
      this.comics = res;
    })
  }

  editEpisode() {
    this.connect.editEpisode(this.newEpisode.value).subscribe(res => {
      alert("edited")
    }
      , error => {
        alert(error);
      });
  }

  deleteComic(_id) {
    var sure = confirm("Are you sure to delete this comic?");
    if (sure == true) {
      this.connect.deleteComic(_id).subscribe(res => {
        alert("Deleted");
        this.getEpisodes();
      }
        , error => {
          alert(error);
        });
    } else {
      alert("comic cannot be deleted!");
    }
  }

}
