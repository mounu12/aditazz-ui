import { Injectable } from '@angular/core';
import { map } from "rxjs/operators";
import { HttpClient , HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TestService {

  constructor(private httpClient: HttpClient) { }
  
  postTestValues(testnodes) {
    return this.httpClient.put('http://3.84.150.172:8080/report/generateStatistics', testnodes).pipe(map((res: Response) => {
      return res;
    }));
  }
}
