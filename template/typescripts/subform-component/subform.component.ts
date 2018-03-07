import {AfterViewInit, ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {Subject} from 'rxjs/Subject';

@Component({
    selector: '{{class_model.name.get_kebab()}}-subform-component',
    templateUrl: '{{class_model.name.get_kebab()}}-subform.component.html'
})
export class {{class_model.name.get_capitalized_camel()}}SubformComponent implements OnInit, AfterViewInit {

    @Input('group')
    public childForm: FormGroup;

    @Input('{{class_model.name.get_camel()}}')
    public {{class_model.name.get_camel()}}: {{class_model.name.get_capitalized_camel()}}Model;

    // public {{class_model.name.get_camel()}}s: CompanyModel[];
    // public imageSubject: Subject<ImageModel[]> = new Subject<ImageModel[]>();

    constructor(public ref: ChangeDetectorRef) {
    }

    ngOnInit(): void {
        if (!this.{{class_model.name.get_camel()}}) {
            this.{{class_model.name.get_camel()}} = new {{class_model.name.get_capitalized_camel()}}Model();
        }
        // this.getCompanies();
    }

    ngAfterViewInit() {
        // if (this.{{class_model.name.get_camel()}}) {
        //     this.imageSubject.next(this.{{class_model.name.get_camel()}}.brandImg);
        // }
    }

    equals(r1: any, r2: any) {
        if (r1 && r2) {
            return r1.pk === r2.pk;
        }
    }

    // getCompanies() {
    //     this.companyService.getAllFromStore().subscribe(resp => {
    //         console.log(resp);
    //         this.companies = resp.companys;
    //     });
    // }

    filesChanged($event) {
        console.log($event);
        // this.brandTag.brandImg = $event;
    }
}
