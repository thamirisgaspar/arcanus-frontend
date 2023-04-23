import { Component, Input, OnInit, ViewChild, ViewContainerRef } from '@angular/core';

@Component({
  selector: 'app-arcanus',
  templateUrl: './arcanus.component.html',
  styleUrls: ['./arcanus.component.css']
})
export class ArcanusComponent implements OnInit {
  @Input() isLoading: boolean = false;
  @Input() show: boolean = false;
  @Input() arcanusId: Number = 0;
  @ViewChild('information', { read: ViewContainerRef }) information!: ViewContainerRef;
  @ViewChild('skills', { read: ViewContainerRef }) skills!: ViewContainerRef;
  @ViewChild('magicae', { read: ViewContainerRef }) magicae!: ViewContainerRef;
  @ViewChild('others', { read: ViewContainerRef }) others!: ViewContainerRef;
  @ViewChild('grimoire', { read: ViewContainerRef}) grimoire!: ViewContainerRef;
  @ViewChild('notes', { read: ViewContainerRef}) notes!: ViewContainerRef;

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.showInformation();
    this.showSkills(this.show);
    this.showMagicae(this.show);
    this.showOthers(this.show);
    this.showGrimoire(this.show);
    this.showNotes(this.show);
  }

  showInformation() {
    import('./information/information.component').then((module) => {
      const component = module['InformationComponent'];
      this.information.createComponent(component);
    });
  }

  showSkills(show: boolean) {
    if (show){
      import('./skills/skills.component').then((module) => {
        const component = module['SkillsComponent'];
        this.skills.createComponent(component);
      });
    }
  }

  showMagicae(show: boolean) {
    if (show){
      import('./magicae/magicae.component').then((module) => {
        const component = module['MagicaeComponent'];
        this.magicae.createComponent(component);
      });
    }
  }

  showOthers(show: boolean) {
    if (show) {
      import('./others/others.component').then((module) => {
        const component = module['OthersComponent'];
        this.others.createComponent(component);
      });
    }
  }

  showGrimoire(show: boolean) {
    if (show){
      import('./grimoire/grimoire.component').then((module) => {
        const component = module['GrimoireComponent'];
        this.grimoire.createComponent(component);
      });
    }
  }

  showNotes(show: boolean) {
    if (show) {
      import('./notes/notes.component').then((module) => {
        const component = module['NotesComponent'];
        this.notes.createComponent(component);
      });
    }
  }

}
