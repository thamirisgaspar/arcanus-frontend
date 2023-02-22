import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from 'src/app/app-routing.module';
import { ArcanusComponent } from './arcanus.component';
import { InfoComponent } from './info/info.component';
import { SkillsComponent } from './skills/skills.component';
import { MagicaesComponent } from './magicaes/magicaes.component';
import { OthersComponent } from './others/others.component';
import { GrimoireComponent } from './grimoire/grimoire.component';
import { NotesComponent } from './notes/notes.component';

@NgModule({
  declarations: [
    ArcanusComponent,
    InfoComponent,
    SkillsComponent,
    MagicaesComponent,
    OthersComponent,
    GrimoireComponent,
    NotesComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    ArcanusComponent,
    InfoComponent,
    SkillsComponent,
    MagicaesComponent,
    OthersComponent,
    GrimoireComponent,
    NotesComponent
  ]
})
export class ArcanusModule { }
