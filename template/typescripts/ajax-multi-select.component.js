"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var Subject_1 = require("rxjs/Subject");
{
    {
        class_model.name.get_capitalized_camel();
    }
}
Service;
{
    {
        '}';
    }
}
from;
'../../../dbc-pages/{{class_model.name.get_kebab()}}/{{class_model.name.get_kebab()}}.service';
var authentication_service_1 = require("../../../services/authentication.service");
var default_1 = /** @class */ (function () {
    function default_1() {
    }
    default_1 = __decorate([
        core_1.Component({
            selector: '{{class_model.name.get_kebab()}}-ajax-multi-select',
            templateUrl: './{{class_model.name.get_kebab()}}-ajax-multi-select.component.html'
        })
    ], default_1);
    return default_1;
}());
{
    class_model.name.get_capitalized_camel();
}
AjaxMultiSelectComponent;
implements;
core_1.OnInit;
{
    multiple: boolean;
    outputArray: boolean;
    datasForLoad: any;
    datasForLoadSubject = new Subject_1.Subject();
    dataIdForLoad: number;
    dataIdForLoadSubject: Subject_1.Subject();
    datasForSelect: any;
    datasForSelectSubject = new Subject_1.Subject();
    // The parent can bind to this event
    datasSelected = new core_1.EventEmitter();
    selectedDatas: any;
    selectOptions: any;
    constructor(public, {}, { class_model: .name.get_camel() });
}
Service: {
    {
        class_model.name.get_capitalized_camel();
    }
}
Service,
    public;
authService: authentication_service_1.AuthenticationService;
{
}
ngOnInit();
void {
    this: .setSelectionOptions(),
    this: .subscribeParentEvent()
};
processDataForSelect();
{
    if (this.datasForSelect && this.datasForSelect.length > 0) {
        this.datasForSelect.map(function (p) {
            p.text = p.brandName;
            p.id = p.pk;
        });
    }
}
subscribeParentEvent();
{
    if (this.dataIdForLoadSubject) {
        this.dataIdForLoadSubject.subscribe(function (event) {
            console.log(event);
            _this.selectedDatas = [_this.datasForSelect.find(function (p) {
                    return p.pk === event;
                })];
        });
    }
    if (this.datasForSelectSubject) {
        this.datasForSelectSubject.subscribe(function (event) {
            console.log(event);
            _this.datasForSelect = event;
            _this.processDataForSelect();
        });
    }
    if (this.datasForLoadSubject) {
        this.datasForLoadSubject.subscribe(function (event) {
            console.log(event);
            _this.datasForLoad = event;
            if (_this.datasForLoad && _this.datasForLoad.length > 0) {
                _this.datasForLoad.map(function (p) {
                    p.text = p.brandName;
                    p.id = p.pk;
                });
                _this.selectedDatas = _this.datasForLoad;
                // this.multiSelect.data.next(this.selectedDatas);
            }
        });
    }
}
output();
void {
    let: selected = [],
    if: function (datasForSelect) {
        var _this = this;
        if (datasForSelect === void 0) { datasForSelect =  && this.selectedDatas; }
        if (this.multiple) {
            selected = this.datasForSelect.filter(function (p) {
                return _this.selectedDatas.filter(function (v) { return v.id === p.pk; }).length > 0;
            });
            this.datasSelected.emit(selected);
        }
        else {
            selected = this.datasForSelect.filter(function (p) {
                return _this.selectedDatas[0].id === p.pk;
            });
            this.datasSelected.emit(selected[0]);
        }
    }
};
setSelectionOptions();
{
    this.selectOptions = {
        'idField': 'id',
        'textField': 'text',
        'multiple': this.multiple,
        'allowClear': true,
        'debounceTime': 2000,
        'placeholder': 'Please type to search ...',
        ajax: {
            'requestType': 'get',
            'url': this.
        }
    };
    {
        {
            class_model.name.get_camel();
        }
    }
    Service.getUrl() + '?{{class_model.name.get_camel()}}__name__contains=SEARCH_VALUE',
        'authToken';
    this.authService.getToken().replace('Bearer ', ''),
        responseData;
    (function (response) {
        var currentValue = response;
        _this.datasForSelect = response;
        var value = [];
        currentValue.forEach(function (item) {
            value.push({
                id: item.pk,
                text: item.name
            });
        });
        return value;
    });
}
processResults: (function (modelObject) {
    _this.selectedDatas = [];
    if (_this.multiple) {
        modelObject.forEach(function (item) {
            _this.selectedDatas.push({
                id: item.pk,
                text: item.name,
            });
        });
    }
    else {
        _this.selectedDatas = [modelObject];
    }
    console.log(_this.selectedDatas);
    _this.output();
    return _this.selectedDatas;
});
