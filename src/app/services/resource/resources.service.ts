import { Injectable } from '@angular/core';
import { Url } from '../../common/url';
import { Http } from '@angular/http';
import { DataService } from '../data.service';

@Injectable({
  providedIn: 'root'
})
export class ResourcesService extends DataService{
 	constructor(http: Http) {
		super(`${Url.getBaseUrl()}/api/resources`, http);
	}
}
