import {ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {{'{'}}{{class_model.name.get_capitalized_camel()}}Service{{'}'}} from '../../../dbc-pages/{{class_model.name.get_kebab()}}/{{class_model.name.get_kebab()}}.service';
import {catchError, map, debounceTime, switchMap} from 'rxjs/operators';
import {Observable} from 'rxjs/Observable';
import {HttpClient} from '@angular/common/http';

declare var $: any;

@Component({
    selector: '{{class_model.name.get_kebab()}}-ng-select',
    templateUrl: './{{class_model.name.get_kebab()}}-ng-select.component.html'
})
export class {{class_model.name.get_capitalized_camel()}}NgSelectComponent implements OnInit {
    @Input('multiple')
    public multiple = false;

    @Input('outputArray')
    public outputArray: boolean;

    @Input('datesForLoad')
    public datasForLoad: any;

    @Input('datasForLoadSubject')
    public datasForLoadSubject = new Subject();

    @Input('dataIdForLoad')
    public dataIdForLoad: number;

    @Input('dataIdForLoadSubject')
    public dataIdForLoadSubject: Subject<number>;

    @Input('datasForSelect')
    public datasForSelect: any;

    @Input('datasForSelectSubject')
    public datasForSelectSubject = new Subject();

    // The parent can bind to this event
    @Output() datasSelected = new EventEmitter();

    public selectedDatas: any;

    public searchStr = '';

    public selectOptions: any;

    public item: any;
    public items: any;
    public typeahead = new EventEmitter<string>();

    constructor(public http: HttpClient,
                public cd: ChangeDetectorRef,
                public {{class_model.name.get_camel()}}Service: {{class_model.name.get_capitalized_camel()}}Service) {
        this.initSelect();
    }

    ngOnInit(): void {
        this.subscribeParentEvent();
    }

    initSelect() {
        this.typeahead
            .pipe(
                debounceTime(1000),
                switchMap(term => this.getItemsBySearch(term))
            )
            .subscribe((items: any) => {
                this.datasForSelect = items.results;
                this.processDataForSelect();
                this.cd.markForCheck();
            }, (err) => {
                console.log('error', err);
                this.datasForSelect = [];
                this.cd.markForCheck();
            });
    }

    datasChanged($event) {
        console.log($event);
        this.selectedDatas = $event;
        this.datasSelected.emit($event);
    }

    getItemsBySearch(term?: string): Observable<any[]> {
        if (term) {
            this.searchStr = '&{{class_model.name.get_camel()}}__name__contains=' + term;
        }
        return this.{{class_model.name.get_camel()}}Service.getAll(this.searchStr);
    }

    processDataForSelect() {
        // if (!this.multiple && this.datasForSelect && this.datasForSelect.length > 0) {
        //     this.selectedDatas = this.datasForSelect[0];
        // }

        if (this.datasForSelect && this.datasForSelect.length > 0) {
            this.datasForSelect.map(p => {
                // p.name = p.name;
                p.id = p.pk;
            });
        }
    }

    subscribeParentEvent() {
        if (this.dataIdForLoadSubject) {
            this.dataIdForLoadSubject.subscribe(event => {
                console.log(event);
                this.selectedDatas = [this.datasForSelect.find(p =>
                    p.pk === event
                )];
            });
        }

        if (this.datasForSelectSubject) {
            this.datasForSelectSubject.subscribe(event => {
                console.log(event);
                this.datasForSelect = event;
                this.processDataForSelect();
            });
        }

        if (this.datasForLoadSubject) {
            this.datasForLoadSubject.subscribe(event => {
                console.log(event);
                this.datasForLoad = event;
                if (this.datasForLoad && this.datasForLoad.length > 0) {
                    this.datasForLoad.map(p => {
                        // p.name = p.name;
                        p.id = p.pk;
                    });
                    this.selectedDatas = this.datasForLoad;
                }
            });
        }
    }
}
