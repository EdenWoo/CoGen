import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {{'{'}}{{class_model.name.get_capitalized_camel()}}Service{{'}'}} from '../../../dbc-pages/{{class_model.name.get_kebab()}}/{{class_model.name.get_kebab()}}.service';
import {AuthenticationService} from '../../../services/authentication.service';

@Component({
    selector: '{{class_model.name.get_kebab()}}-ajax-multi-select',
    templateUrl: './{{class_model.name.get_kebab()}}-ajax-multi-select.component.html'
})
export class {{class_model.name.get_capitalized_camel()}}AjaxMultiSelectComponent implements OnInit {
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

    public selectOptions: any;

    constructor(public {{class_model.name.get_camel()}}Service: {{class_model.name.get_capitalized_camel()}}Service,
                public authService: AuthenticationService) {
    }

    ngOnInit(): void {
        this.setSelectionOptions();
        this.subscribeParentEvent();
    }

    processDataForSelect() {
        if (this.datasForSelect && this.datasForSelect.length > 0) {
            this.datasForSelect.map(p => {
                p.text = p.brandName;
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
                        p.text = p.brandName;
                        p.id = p.pk;
                    });
                    this.selectedDatas = this.datasForLoad;
                    // this.multiSelect.data.next(this.selectedDatas);
                }
            });
        }
    }

    public output(): void {
        let selected = [];
        if (this.datasForSelect && this.selectedDatas) {

            if (this.multiple) {
                selected = this.datasForSelect.filter(p =>
                    this.selectedDatas.filter(v => v.id === p.pk).length > 0
                );
                this.datasSelected.emit(selected);
            } else {
                selected = this.datasForSelect.filter(p =>
                    this.selectedDatas[0].id === p.pk
                );
                this.datasSelected.emit(selected[0]);
            }
        }
    }

    setSelectionOptions() {

        this.selectOptions = {
            'idField': 'id',
            'textField': 'text',
            'multiple': this.multiple,
            'allowClear': true,
            'debounceTime': 2000,
            'placeholder': 'Please type to search ...',
            ajax: {
                'requestType': 'get',
                'url': this.{{class_model.name.get_camel()}}Service.getUrl() + '?{{class_model.name.get_camel()}}__name__contains=SEARCH_VALUE',
                'authToken': this.authService.getToken().replace('Bearer ', ''),
                responseData: (response: any) => {
                    const currentValue = response;
                    this.datasForSelect = response;
                    const value: Array<any> = [];
                    currentValue.forEach((item: { pk: number, name: string }) => {
                        value.push({
                            id: item.pk,
                            text: item.name
                        });
                    });
                    return value;
                }
            },
            processResults: (modelObject: any) => {
                this.selectedDatas = [];
                if (this.multiple) {
                    modelObject.forEach((item: { pk: number, name: string }) => {
                        this.selectedDatas.push({
                            id: item.pk,
                            text: item.name,
                        });
                    });
                } else {
                    this.selectedDatas = [modelObject];
                }
                console.log(this.selectedDatas);
                this.output();
                return this.selectedDatas;
            }
        }
    }


}