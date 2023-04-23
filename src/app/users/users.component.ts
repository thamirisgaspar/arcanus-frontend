import { Component, ViewEncapsulation, OnInit, Input, ViewChild, ViewContainerRef } from '@angular/core';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class UsersComponent implements OnInit {
  @Input() isLoading: boolean = false;
  @ViewChild('login', { read: ViewContainerRef }) login!: ViewContainerRef;
  @ViewChild('signup', { read: ViewContainerRef }) signup!: ViewContainerRef;

  ngOnInit(): void {
    window.scrollTo(0, 0);

    localStorage.removeItem('userid');
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('name');
    localStorage.removeItem('id');
    this.showLogin();
    this.showSignup();
  }

  showLogin() {
    import('./login/login.component').then((module) => {
      const component = module['LoginComponent'];
      this.login.createComponent(component);
    });
  }

  showSignup() {
    import('./signup/signup.component').then((module) => {
      const component = module['SignupComponent'];
      this.signup.createComponent(component);
    });
  }

}
