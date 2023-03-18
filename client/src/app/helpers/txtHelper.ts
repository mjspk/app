import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GutendexService } from '../services/gutendex.service';

@Injectable({
    providedIn: 'root'
})
export class TxtHelper {

    constructor(private gutendexService: GutendexService) { }



    downloadTxtFile(id: number, fileName: string) {
        this.gutendexService.getBookText(id).then((txtContent: string) => {
            const element = document.createElement('a');
            element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(txtContent));
            element.setAttribute('download', fileName);
            element.style.display = 'none';
            document.body.appendChild(element);
            element.click();
            document.body.removeChild(element);
        }).catch((error) => {
            console.error(error);
        });
    }

}