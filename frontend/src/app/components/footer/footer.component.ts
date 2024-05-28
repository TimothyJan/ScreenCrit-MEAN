import { Component, OnInit } from '@angular/core';
import { SocialLink } from '../../models/social-link';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent implements OnInit{
  links = new Array<SocialLink>;

  ngOnInit(): void {
    let link1 = new SocialLink("https://github.com/TimothyJan/TimMari", "github");
    let link2 = new SocialLink("https://www.linkedin.com/in/timothy-jan-m-s-533212108/", "linkedin");
    this.links.push(link1, link2);
  }
}
