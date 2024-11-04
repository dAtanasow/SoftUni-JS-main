import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { Post } from 'src/app/types/posts';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.css']
})
export class PostsListComponent implements OnInit{
  posts: Post[] = []
  isLoading: boolean = true
  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.api.getPosts(5).subscribe((posts) => {
      this.posts = posts;
      this.isLoading = false;
    });
  }
}
