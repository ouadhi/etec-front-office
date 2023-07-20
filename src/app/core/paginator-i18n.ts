import { Injectable } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class PaginatorI18n extends MatPaginatorIntl {

    constructor(private translateService: TranslateService) {
        super();
        this.translateService.onLangChange
            .subscribe(() => {
                this.getTranslations();
            });

        this.getTranslations();
    }

    getTranslations() {
        this.translateService.get([
            'matTable.ITEMS_PER_PAGE_LABEL',
            'matTable.NEXT_PAGE_LABEL',
            'matTable.PREVIOUS_PAGE_LABEL',
            'matTable.FIRST_PAGE_LABEL',
            'matTable.LAST_PAGE_LABEL',
        ])
            .subscribe(translation => {
                this.itemsPerPageLabel = translation['matTable.ITEMS_PER_PAGE_LABEL'];
                this.nextPageLabel = translation['matTable.NEXT_PAGE_LABEL'];
                this.previousPageLabel = translation['matTable.PREVIOUS_PAGE_LABEL'];
                this.firstPageLabel = translation['matTable.FIRST_PAGE_LABEL'];
                this.lastPageLabel = translation['matTable.LAST_PAGE_LABEL'];
                this.changes.next();
            });
    }

    getRangeLabel = (page, pageSize, length) => {
        if (length === 0 || pageSize === 0) {
            return this.translateService.instant('matTable.RANGE_PAGE_LABEL_1', { length });
        }
        length = Math.max(length, 0);
        const startIndex = page * pageSize;
        // If the start index exceeds the list length, do not try and fix the end index to the end.
        const endIndex = startIndex < length ? Math.min(startIndex + pageSize, length) : startIndex + pageSize;
        return this.translateService.instant('matTable.RANGE_PAGE_LABEL_2', { startIndex: startIndex + 1, endIndex, length });
    };
}
