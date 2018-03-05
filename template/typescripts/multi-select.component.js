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
var default_1 = /** @class */ (function () {
    function default_1() {
    }
    default_1 = __decorate([
        core_1.Component({
            selector: '{{class_model.name.get_kebab()}}-multi-select',
            templateUrl: './{{class_model.name.get_kebab()}}-multi-select.component.html'
        })
    ], default_1);
    return default_1;
}());
{
    class_model.name.get_capitalized_camel();
}
MultiSelectComponent;
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
    constructor(public, {}, { class_model: .name.get_camel() });
}
Service: {
    {
        class_model.name.get_capitalized_camel();
    }
}
Service;
{
}
ngOnInit();
void {
    console: .log('this.dataForLoad'),
    console: .log(this.datasForLoad),
    if: function (datasForSelect) {
        if (datasForSelect === void 0) { datasForSelect =  && this.datasForSelect.length > 0; }
    }
    // this.getDataList();
    ,
    // this.getDataList();
    this: .subscribeParentEvent(),
    this: .get
};
{
    {
        class_model.name.get_capitalized_camel();
    }
}
s();
get;
{
    {
        class_model.name.get_capitalized_camel();
    }
}
s();
{
    this.;
    {
        {
            class_model.name.get_camel();
        }
    }
    Service.getAllFromStore().subscribe(function (resp) {
        console.log(resp);
        _this.datasForSelect = resp.;
        {
            {
                class_model.name.get_camel();
            }
        }
        s;
        _this.processDataForSelect();
    });
}
processDataForSelect();
{
    if (this.datasForSelect && this.datasForSelect.length > 0) {
        this.datasForSelect.map(function (p) {
            p.text = p.name;
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
                    p.text = p.name;
                    p.id = p.pk;
                });
                _this.selectedDatas = _this.datasForLoad;
            }
        });
    }
}
selected(value, any);
void {};
removed(value, any);
void {};
typed(value, any);
void {};
refreshValue(value, any);
void {
    console: .log(value),
    let: selected = [],
    if: function (datasForSelect) {
        if (datasForSelect === void 0) { datasForSelect =  && value; }
        if (this.outputArray) {
            selected = this.datasForSelect.filter(function (p) {
                return value.filter(function (v) { return v.id === p.pk; }).length > 0;
            });
            this.datasSelected.emit(selected);
        }
        else {
            selected = this.datasForSelect.filter(function (p) {
                return value.id === p.pk;
            });
            this.datasSelected.emit(selected);
            this.datasSelected.emit(selected[0]);
        }
    }
};
