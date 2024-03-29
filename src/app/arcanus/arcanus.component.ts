import { Component, Input, OnInit, ViewChild, ViewContainerRef, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router'

@Component({
  selector: 'app-arcanus',
  templateUrl: './arcanus.component.html',
  styleUrls: ['./arcanus.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ArcanusComponent implements OnInit {
  @Input() arcanusId: Number = 0;
  @Input() isLoading: boolean = false;
  @ViewChild('information', { read: ViewContainerRef }) information!: ViewContainerRef;
  @ViewChild('skills', { read: ViewContainerRef }) skills!: ViewContainerRef;
  @ViewChild('magicae', { read: ViewContainerRef }) magicae!: ViewContainerRef;
  @ViewChild('others', { read: ViewContainerRef }) others!: ViewContainerRef;
  @ViewChild('grimoire', { read: ViewContainerRef}) grimoire!: ViewContainerRef;
  @ViewChild('notes', { read: ViewContainerRef}) notes!: ViewContainerRef;

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
    window.scrollTo(0, 0);

    if (localStorage.getItem('token') == null || localStorage.length == 0){
      this.router.navigate(['/users']);
    }

    this.showInformation();
  }

  loadForm(){
    this.showSkills();
    this.showMagicae();
    this.showOthers();
    this.showGrimoire();
    this.showNotes();
  }

  showInformation() {
    import('./information/information.component').then((module) => {
      const component = module['InformationComponent'];
      this.information.createComponent(component);
    });
  }

  showSkills() {
    import('./skills/skills.component').then((module) => {
      const component = module['SkillsComponent'];
      this.skills.createComponent(component);
    });
  }

  showMagicae() {
    import('./magicae/magicae.component').then((module) => {
      const component = module['MagicaeComponent'];
      this.magicae.createComponent(component);
    });
  }

  showOthers() {
    import('./others/others.component').then((module) => {
      const component = module['OthersComponent'];
      this.others.createComponent(component);
    });
  }

  showGrimoire() {
    import('./grimoire/grimoire.component').then((module) => {
      const component = module['GrimoireComponent'];
      this.grimoire.createComponent(component);
    });
  }

  showNotes() {
    import('./notes/notes.component').then((module) => {
      const component = module['NotesComponent'];
      this.notes.createComponent(component);
    });
  }
  
}
