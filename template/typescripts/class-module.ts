import {NgModule} from '@angular/core';
import {SmartadminDatatableModule} from '../../shared/ui/datatable/smartadmin-datatable.module';
import {SmartadminModule} from '../../shared/smartadmin.module';
import {CommonModule} from '@angular/common';
import {SmartadminInputModule} from '../../shared/forms/input/smartadmin-input.module';
import {RouterModule, Routes} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SharedModule} from '../../theme/shared/shared.module';
import {NgxPaginationModule} from 'ngx-pagination';
import {LoadingModule} from 'ngx-loading';
import {ConfirmationPopoverModule} from 'angular-confirmation-popover';

import {{ '{' }}{{class_model.name.get_capitalized_camel()}}ListComponent{{ '}' }} from './{{class_model.name.get_kebab()}}-list/{{class_model.name.get_kebab()}}-list.component';
import {{ '{' }}{{class_model.name.get_capitalized_camel()}}FormComponent{{ '}' }} from './{{class_model.name.get_kebab()}}-form/{{class_model.name.get_kebab()}}-form.component';
import {PipesModule} from '../../theme/pipes/pipes.module';


export const routes: Routes = [
    {path: '', redirectTo: '{{class_model.name.get_kebab()}}-list', pathMatch: 'full'},
    {path: '{{class_model.name.get_kebab()}}-list', component: {{class_model.name.get_capitalized_camel()}}ListComponent, pathMatch: 'full'},
    {path: '{{class_model.name.get_kebab()}}-add', component: {{class_model.name.get_capitalized_camel()}}FormComponent, pathMatch: 'full'},
    {path: '{{class_model.name.get_kebab()}}-edit/:id', component: {{class_model.name.get_capitalized_camel()}}FormComponent, pathMatch: 'full'},
];


@NgModule({
    declarations: [
        {{class_model.name.get_capitalized_camel()}}ListComponent,
        {{class_model.name.get_capitalized_camel()}}FormComponent
    ],
    imports: [
        SmartadminModule,
        SmartadminDatatableModule,
        RouterModule.forChild(routes),
        CommonModule,
        SmartadminInputModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule,
        NgxPaginationModule,
        LoadingModule,
        ConfirmationPopoverModule,
        PipesModule
    ],
})
export class {{class_model.name.get_capitalized_camel()}}Module {
}
