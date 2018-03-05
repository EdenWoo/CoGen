import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {{'{'}}{{class_model.name.get_capitalized_camel()}}Service{{'}'}} from '../../../dbc-pages/{{class_model.name.get_kebab()}}/{{class_model.name.get_kebab()}}.service';

@Component({
    selector: '{{class_model.name.get_kebab()}}-multi-select',
    templateUrl: './{{class_model.name.get_kebab()}}-multi-select.component.html'
})
export class {{class_model.name.get_capitalized_camel()}}MultiSelectComponent implements OnInit {
    @Input('multiple')
    public multiple: boolean;

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

    constructor(public {{class_model.name.get_camel()}}Service: {{class_model.name.get_capitalized_camel()}}Service) {

    }

    ngOnInit(): void {
        console.log('this.dataForLoad');
        console.log(this.datasForLoad);
        if (this.datasForSelect && this.datasForSelect.length > 0) {

        }
        // this.getDataList();
        this.subscribeParentEvent();
        this.get{{class_model.name.get_capitalized_camel()}}s();
    }

    get{{class_model.name.get_capitalized_camel()}}s() {
        this.{{class_model.name.get_camel()}}Service.getAllFromStore().subscribe(resp => {
            console.log(resp);
            this.datasForSelect = resp.{{class_model.name.get_camel()}}s;
            this.processDataForSelect();
        });
    }

    processDataForSelect() {
        if (this.datasForSelect && this.datasForSelect.length > 0) {
            this.datasForSelect.map(p => {
                p.text = p.name;
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
                        p.text = p.name;
                        p.id = p.pk;
                    });
                    this.selectedDatas = this.datasForLoad;
                }
            });
        }
    }

    // getDataList() {
    //     this.brandTagService.getAll().subscribe(resp => {
    //         this.datasForSelect = resp.results;
    //         console.log(resp);
    //         if (this.datasForSelect && this.datasForSelect.length > 0) {
    //             this.datasForSelect.map(p => {
    //                 p.text = p.name;
    //                 p.id = p.pk;
    //             });
    //
    //             // if have dataForLoad emit it
    //             // else emit the first one in datasForSelect
    //             if (this.datasForLoad && this.datasForSelect) {
    //                 // this.datasSelected.emit(this.dataForLoad)
    //                 this.selectedDatas = this.datasForLoad;
    //                 this.selectedDatas.map(p => {
    //                     p.text = p.name;
    //                     p.id = p.pk;
    //                 });
    //                 this.datasSelected.emit(this.selectedDatas);
    //             }
    //         }
    //     })
    // }

    // ng2 select
    public selected(value: any): void {
        // console.log(value);
    }

    public removed(value: any): void {
        // console.log(value);
    }

    public typed(value: any): void {
        // console.log('New search input: ', value);
    }

    public refreshValue(value: any): void {
        console.log(value);

        let selected = [];
        if (this.datasForSelect && value) {

            if (this.outputArray) {
                selected = this.datasForSelect.filter(p =>
                    value.filter(v => v.id === p.pk).length > 0
                );
                this.datasSelected.emit(selected);
            } else {
                selected = this.datasForSelect.filter(p =>
                    value.id === p.pk
                );
                this.datasSelected.emit(selected);
                this.datasSelected.emit(selected[0]);
            }
        }
    }


}
