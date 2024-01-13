import { Component, OnInit } from '@angular/core';
import io from 'socket.io-client'
import * as _ from 'lodash';
import * as moment from 'moment'
import { environment } from 'src/environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from '../services/post.service';
@Component({
  selector: 'app-comments',
  templateUrl: './comments.page.html',
  styleUrls: ['./comments.page.scss'],
})
export class CommentsPage implements OnInit {
socket:any
socketHost= environment.SocketURL
idp:any
comment!: string
commentArray:any = []
postArr:any= []
username:any
post:any
picId!: string
picVersion!: string
likedate: any
  constructor(private route: ActivatedRoute, private postservice: PostService, private router: Router) {
    this.socket= io(this.socketHost)
    this.idp= this.route.snapshot.paramMap.get('id')


   }

  ngOnInit() {
    this.getpost()
    this.socket.on('refreshPage',(data:any)=>{
      this.getpost()
    })
  }
 getpost(){
  this.postservice.GetPost(this.idp).subscribe(data=>{
    console.log(data);
this.postArr= Object.values(data.post)
this.post= data.post.post
this.likedate= data.post.likesdate
this.picId=data.post.user.picId
this.picVersion=data.post.user.picVersion
this.username= data.post.username
this.commentArray= data.post.comments.reverse()
  })
 }

 AddComment(){
  if(this.comment){
    this.postservice.AddComment(this.idp, this.comment).subscribe(data=>{
      console.log(data);

      this.comment= ''
      this.socket.emit('refresh', {})

    })
  }
 }
 TimeFromNow(time:any){
  return  moment(time).fromNow()
}


back(){
  this.router.navigate(['search'])
}
}
