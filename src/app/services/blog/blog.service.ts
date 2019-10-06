import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Url } from 'app/common/url';
import { DataService } from './../data.service';

@Injectable({
  providedIn: 'root'
})
export class BlogService extends DataService {
	constructor(http: Http) {
		super(`${Url.getBaseUrl()}/api/posts`, http);
	}
}
