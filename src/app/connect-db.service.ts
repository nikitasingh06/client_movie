import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Allpaths } from './url';

@Injectable()
export class ConnectDbService {

  public data;
  public bill;
  public name;

  constructor(public http: Http, public url: Allpaths) { }

  //verify code for user sign up
  VerifyCode(code): Observable<any> {
    alert(code)
    return this.http.put(this.url.UrlObj.VerifyCodeUrl + '/' + code, code).map(
      data => data.json()
    );
  }

  //save user details
  PostUser(user): Observable<any> {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json')
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.url.UrlObj.postUser, user, options).map(
      data => data.json()
    );
  }

   //login
  login(userLogin): Observable<any> {
    console.log("user in service", userLogin);
    let headers = new Headers();
    headers.append('Content-Type', 'application/json')
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.url.UrlObj.login, userLogin, options).map(
      data => data.json()
    );
  }

  //edit user details
  editUser(EditedDetails): Observable<any> {
    alert(EditedDetails)
    return this.http.put(this.url.UrlObj.editUser, EditedDetails).map(
      data => data.json()
    )
  }

  //get users
  getUsers() {
    return this.http.get(this.url.UrlObj.getUsers).map(
      data => data.json()
    );
  }

  //to delete user
  deleteUser(_id){
    return this.http.delete(this.url.UrlObj.deleteUser + '/' + _id).map(
      data => data.json()
    );
  }

  //add cartId to user Collection
  addCartId(name,id): Observable<any>{
    return this.http.put(this.url.UrlObj.addcartId + '/' + name, id).map(
      data => data.json()
    )
  }


  addBill(details): Observable<any> {
    return this.http.put(this.url.UrlObj.addBill, details).map(
      data => data.json()

    );
  }

  //setting bill amount to a variable
  showBill(p) {
    this.bill = p;

  }

  //get bill method to display on final  page
  getBill(): any {
    return this.bill;
  }

  //setting user name to a variable
  setuserName(name) {
    this.name = name;
    console.log("Ser", this.name)
  }

  //get name method to display on final  page
  getuserName(): any {
    console.log("service", this.name)
    return this.name;
  }

  //post series
  postSeries(series): Observable<any> {
    console.log("user in service", series);
    let headers = new Headers();
    headers.append('Content-Type', 'application/json')
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.url.UrlObj.postSeries, series, options).map(
      data => data.json()
    );
  }

  getSeries(){
    return this.http.get(this.url.UrlObj.getSeries).map(
      data => data.json()
    )
  }

  editSeries(series){
    alert(series)
    return this.http.put(this.url.UrlObj.editSeries, series).map(
      data => data.json()
    )
  }

  deleteSeries(_id){
    return this.http.delete(this.url.UrlObj.deleteSeries + '/' + _id).map(
      data => data.json()
    );
  }

  searchSeries(name){
    console.log("name",name)
    return this.http.get(this.url.UrlObj.searchSeries + '/' + name).map(
      data => data.json()
    )
  }

  postSeason(season): Observable<any> {
    console.log("user in service", season);
    console.log("id in  service",season.seriesid)
    let headers = new Headers();
    headers.append('Content-Type', 'application/json')
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.url.UrlObj.postSeason, season, options).map(
      data => data.json()
    );
  }

  getSeasons(){
    return this.http.get(this.url.UrlObj.getSeasons).map(
      data => data.json()
    )
  }

  editSeason(season){
    alert(season)
    return this.http.put(this.url.UrlObj.editSeason, season).map(
      data => data.json()
    )
  }

  deleteSeason(_id){
    return this.http.delete(this.url.UrlObj.deleteSeason + '/' + _id).map(
      data => data.json()
    );
  }

  postEpisode(details): Observable<any> {
    console.log("user in service", details);
    let headers = new Headers();
    headers.append('Content-Type', 'application/json')
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.url.UrlObj.postEpisode, details, options).map(
      data => data.json()
    );
  }

  getEpisodes(){
    return this.http.get(this.url.UrlObj.getEpisodes).map(
      data => data.json()
    )
  }

  editEpisode(comic){
    alert(comic)
    return this.http.put(this.url.UrlObj.editEpisode, comic).map(
      data => data.json()
    )
  }

  //delete comic
  deleteComic(_id){
    return this.http.delete(this.url.UrlObj.deleteEpisode + '/' + _id).map(
      data => data.json()
    );
  }

  //add comment on comic
  addComment(comment): Observable<any> {
    console.log("user in service", comment);
    let headers = new Headers();
    headers.append('Content-Type', 'application/json')
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.url.UrlObj.addComment, comment, options).map(
      data => data.json()
    );
  }

  //get all comments on a particular comic
  getComments(_id){
    return this.http.get(this.url.UrlObj.getComments + '/' + _id).map(
      data => data.json()
    )
  }

  //add new Category
  addCategory(details): Observable<any>{
    console.log("user in service", details);
    
    let headers = new Headers();
    headers.append('Content-Type', 'application/json')
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.url.UrlObj.addCategory, details, options).map(
      data => data.json()
    );
  }

  //get all categories
  getCategories(){
    return this.http.get(this.url.UrlObj.getCategories).map(
      data => data.json()
    )
  }  

  //add new movie
  addMovie(details): Observable<any>{
    console.log("user in service", details);
    let headers = new Headers();
    headers.append('Content-Type', 'application/json')
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.url.UrlObj.addMovie, details, options).map(
      data => data.json()
    );
  }

  //get movies
  getMovies(){
    return this.http.get(this.url.UrlObj.getMovies).map(
      data => data.json()
    )
  }

  //delete a movie
  deleteMovie(_id){
    return this.http.delete(this.url.UrlObj.deleteMovie + '/' + _id).map(
      data => data.json()
    );
  }

  //search movies
  searchMovies(name){
    return this.http.get(this.url.UrlObj.searchMovies + '/' + name).map(
      data => data.json()
    )
  }

}