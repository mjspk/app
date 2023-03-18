import { Injectable } from "@angular/core";
import jsPDF from "jspdf";
import { Book } from "../models/book";
import { GutendexService } from "../services/gutendex.service";
import { TxtHelper } from "./txtHelper";

@Injectable({
    providedIn: 'root'
})

export class PdfHelper {

    txtHelper: TxtHelper;
    gutendexService: GutendexService;
    constructor(txtHelper: TxtHelper, gutendexService: GutendexService) {
        this.txtHelper = txtHelper;
        this.gutendexService = gutendexService;
    }


    async downloadPdf(id: number, title: string) {
        const doc = new jsPDF();
        const text = await this.gutendexService.getBookText(id);
        const pageHeight = doc.internal.pageSize.height;
        const pageWidth = doc.internal.pageSize.width;
        const lineHeight = 10;



        const textLines = doc.splitTextToSize(text, pageWidth - 20);

        let cursorY = 10;
        let linesLeft = textLines;

        setTimeout(() => {
            while (linesLeft.length > 0) {
                if (cursorY + lineHeight > pageHeight - 10) {
                    doc.addPage();
                    cursorY = 10;
                }

                const line = linesLeft.shift();
                doc.text(line, 10, cursorY);
                cursorY += lineHeight;
            }

            doc.save(title + '.pdf');
        }
            , 0);





    }

    async readPdf(id: number) {
        const doc = new jsPDF();
        const text = await this.gutendexService.getBookText(id);
        const pageHeight = doc.internal.pageSize.height;
        const pageWidth = doc.internal.pageSize.width;
        const lineHeight = 10;

        const textLines = doc.splitTextToSize(text, pageWidth - 20);

        let cursorY = 10;
        let linesLeft = textLines;

        setTimeout(() => {
            while (linesLeft.length > 0) {
                if (cursorY + lineHeight > pageHeight - 10) {
                    doc.addPage();
                    cursorY = 10;
                }

                const line = linesLeft.shift();
                doc.text(line, 10, cursorY);
                cursorY += lineHeight;
            }

            doc.output('dataurlnewwindow');

        }, 0);

    }

}