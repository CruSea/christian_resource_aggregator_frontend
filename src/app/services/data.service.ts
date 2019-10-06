import { Http, RequestOptions, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry,map } from 'rxjs/operators';
import { NotFoundError } from 'app/common/not-found-error';
import { BadInput } from 'app/common/bad-input';
import { AppError } from 'app/common/app-error';


@Injectable()
export class DataService {
	constructor(private url,public http: Http) {}
	// private baseUrl = BaseUrl.getURL;
	getAll() {
		return this.http.get(this.url).pipe(map((response: any) => response.json()), catchError(this.handleError));
	}
	create(resource) {
		let headers = new Headers({
			'Content-Type': 'application/json',
			Accept: 'application/json'
		});
		let options = new RequestOptions({ headers: headers });
		let body = resource;
		return this.http
			.post(this.url, body, options)
			.pipe(map((response: any) => response.json()), catchError(this.handleError));
	}
	update(resource) {
		return this.http
			.patch(this.url + '/' + resource.id, JSON.stringify({ isRead: true }))
			.pipe(map((response: any) => response.json()), catchError(this.handleError));
	}
	delete(id) {
		return this.http
			.delete(this.url + '/' + id)
			.pipe(map((response: any) => response.json()), catchError(this.handleError));
	}
	getOneItem(id) {
		let headers = new Headers({
			'Content-Type': 'application/json',
			Accept: 'application/json'
		});
		let options = new RequestOptions({ headers: headers });
		return this.http
			.get(this.url + '/' + id)
			.pipe(map((response: any) => response.json()), catchError(this.handleError));
	}
	customeCreate(body) {
		return this.http
			.post(this.url, body)
			.pipe(map((response: any) => response.json()), catchError(this.handleError));
	}
	updateWithFormData(body, resource_id) {
		return this.http
			.post(this.url + '/' + resource_id, body)
			.pipe(map((response: any) => response.json()), catchError(this.handleError));
	}
	private handleError(error: Response) {
		if (error.status === 404) {
			return throwError(new NotFoundError());
		}
		if (error.status === 400) {
			return throwError(new BadInput(error.json()));
		}
		if (error.status === 422) {
			return throwError(error.json());
		}
		if (error.status == 401) {
			return throwError(error.json());
		}

		return throwError(new AppError(error));
	}
}
