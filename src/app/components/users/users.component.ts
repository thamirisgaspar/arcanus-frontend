import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  login = '';
  loginTab ='';
  signup = '';
  signupTab = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    window.scrollTo(0, 0);
    localStorage.removeItem('userid');
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('name');
    localStorage.removeItem('id');

    this.route.queryParams.subscribe((queryParams: any) => {
      if (queryParams['signup'] == 'active show'){
        this.router.navigate(['/users'], {queryParams: {signup: 'active show'}});
        this.trocaRota('signup');
      } else if (queryParams['login'] == 'active show'){
        this.router.navigate(['/users'], {queryParams: {login: 'active show'}});
        this.trocaRota('login');
      } else {
        this.router.navigate(['/users'], {queryParams: {login: 'active show'}});
        this.trocaRota('login');
      }
    });
  }

  trocaRota($event: any){
    if ($event.target == undefined) {
      this.router.navigate(['/users'], {queryParams: {login: 'active show'}});
      this.rotas('login');
    } else {
      if ($event.target.name == 'signup') {
        this.router.navigate(['/users'], {queryParams: {signup: 'active show'}});
        this.rotas('signup');
      } else if ($event.target.name == 'login') {
        this.router.navigate(['/users'], {queryParams: {login: 'active show'}});
        this.rotas('login');
      } else {
        this.router.navigate(['/users'], {queryParams: {login: 'active show'}});
        this.rotas('login');
      }
    }
  }

  rotas(nome: string){
    if (nome == 'login'){
      this.login = 'active';
      this.loginTab = 'active show';
      this.signup = '';
      this.signupTab = '';
    } else if (nome == 'signup'){
      this.login = '';
      this.loginTab = '';
      this.signup = 'active';
      this.signupTab = 'active show';
    } else {
      this.login = 'active';
      this.loginTab = 'active show';
      this.signup = '';
      this.signupTab = '';
    }
  }

}
