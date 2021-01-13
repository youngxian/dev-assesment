import { User } from "./Models/user";
import { search } from "./Models/search";
import { ApiService } from "./Service/api.service";
import { Component, OnInit } from "@angular/core";
import * as fileSaver from "file-saver";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  title = "dev-assesment";
  pageNumber: any = 1;
  sortActive = false;
  paginateduser: User[] = [];
  showdetails: boolean = true;
  Alluser: User[] = [];
  coursedetial: any;
  gender: string = "All";
  maleusers: User[] = [];
  femaleusers: User[] = [];
  filteruser: User[] = [];
  country: string;
  search: any;
  constructor(private apiservice: ApiService) {}

  ngOnInit(): void {
    this.userlist();
  }

  userlist(): void {
    this.apiservice.getrandomuser().subscribe((data) => {
      this.Alluser = data["results"];
      this.paginateduser = this.Alluser.slice(0, 3);
      this.sortActive = false;
      // console.log('ewew', this.paginateduser);
      // console.log(this.Alluser);
    });
  }

  nextpage(pagenumber) {
    let nextpageNumber = pagenumber + 1;
    let sliceuser = this.Alluser.slice(
      3 * (nextpageNumber - 1),
      3 * nextpageNumber
    );

    if (sliceuser.length > 0) {
      this.paginateduser = sliceuser;
      this.pageNumber = pagenumber + 1;
    }
    // console.log('hllosd' + sliceuser);
  }
  perviouspage(pagenumber) {
    let nextpageNumber = pagenumber - 1;
    let sliceuser = this.Alluser.slice(
      3 * (nextpageNumber - 1),
      3 * nextpageNumber
    );

    if (sliceuser.length > 0) {
      this.paginateduser = sliceuser;
      this.pageNumber = pagenumber - 1;
    }
  }
  goback() {
    this.showdetails = true;
  }
  showfulldeatils(course) {
    console.log("clicked");
    console.log(course);
    this.showdetails = false;
    this.coursedetial = course;
  }

  sortmaleuser(sort?) {
    if (sort == "male") {
      this.gender = sort[0].toUpperCase() + sort.slice(1);
      +" Users";

      this.maleusers = this.Alluser.filter(
        (a) => a.gender.toLowerCase() === sort
      );
      this.paginateduser = this.maleusers.slice(0, 3);
      this.sortActive = true;
    } else if (sort == "female") {
      this.gender = sort[0].toUpperCase() + sort.slice(1);
      +" Users";

      this.femaleusers = this.Alluser.filter(
        (a) => a.gender.toLowerCase() === sort
      );
      this.paginateduser = this.femaleusers.slice(0, 3);
      this.sortActive = true;
      this.pageNumber = 1;
    } else {
      this.gender = "All";
      this.paginateduser = this.Alluser.slice(0, 3);
    }
    console.log(this.paginateduser);
  }
  download(item: any[]) {
    var element = document.getElementById("link");
    // element.click();
    this.apiservice.downloadFile().subscribe((response) => {
      let blob: any = new Blob([response], {
        type: "text/csv; charset=utf-8",
      });
      const url = window.URL.createObjectURL(blob);
      //window.open(url);
      //window.location.href = response.url;
      fileSaver.saveAs(blob, "file.csv");
    }),
      (error) => console.log("Error downloading the file"),
      () => console.info("File downloaded successfully");
  }
  filterItem(item: any[], value: string): void {
    if (!item) {
    } // when nothing has typed
    // this.filteredItems = Object.assign([], this.items).filter(
    //    item => item.name.toLowerCase().indexOf(value.toLowerCase()) > -1
    //)
    if (value == "") {
      this.paginateduser = this.Alluser.slice(0, 3);
    } else {
      this.filteruser = item.filter(
        (a) => a.name.first.toLowerCase() === value.toLowerCase()
      );
      this.paginateduser = this.filteruser.slice(0, 3);
    }
  }
}
