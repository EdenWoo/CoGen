import {Injectable, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BaseService} from '../../services/base.service';

import {Store} from '@ngrx/store';
import {{'{'}}{{class_model.name.get_capitalized_camel()}}FeatureStateInterface{{'}'}} from './store/interfaces/feature-state.interface';
import {{'{'}}Fetch{{class_model.name.get_capitalized_camel()}}Action{{'}'}} from './store/actions/fetch-{{class_model.name.get_kebab()}}.action';

@Injectable()
export class {{class_model.name.get_capitalized_camel()}}Service extends BaseService implements OnInit {

    constructor(public http: HttpClient,
                public store: Store<{{class_model.name.get_capitalized_camel()}}FeatureStateInterface>) {
        super('{{class_model.name.get_kebab()}}', http);
    }

    ngOnInit(): void {
    }

      fetchAll() {
        this.store.dispatch(new Fetch{{class_model.name.get_capitalized_camel()}}Action({}));
    }

    getAllFromStore() {
        return this.store.select(o => o.{{class_model.name.get_camel()}}List);
    }
}