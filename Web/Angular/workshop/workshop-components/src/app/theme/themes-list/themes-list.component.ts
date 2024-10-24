import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';
import { Themes } from '../../types/themes';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-themes-list',
  templateUrl: './themes-list.component.html',
  styleUrls: ['./themes-list.component.css'],
})
export class ThemesListComponent implements OnInit {
  themes: Themes[] = [];
  isLoading: boolean = true;

  constructor(private api: ApiService, private userService: UserService) {}

  get isLoggedIn(): boolean {
    return this.userService.isLogged;
  }

  get userId(): string {
    return this.userService.user?.id || '';
  }

  isSubscribed(theme: Themes) {
    const isSubscribedUser = theme.subscribers.find((s) => {
      s === this.userService.user?.id;
    });
    return !!isSubscribedUser;
  }

  ngOnInit(): void {
    this.api.getThemes().subscribe((themes) => {
      this.themes = themes;
      this.isLoading = false;
    });
  }
}
