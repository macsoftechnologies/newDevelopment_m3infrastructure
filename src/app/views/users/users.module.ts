import { NgModule } from '@angular/core';
import { CommonModule,DatePipe } from '@angular/common';
import { usersRoutes } from './users-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NewRequestComponent } from './Requests/new-request/new-request.component';
import { ListRequestComponent } from './Requests/list-request/list-request.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { PlansComponent } from './plans/plans.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDividerModule } from '@angular/material/divider';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { NgxEchartsModule } from 'ngx-echarts';
import { ChartsModule } from 'ng2-charts';
import { ListPopupComponent } from './Requests/list-popup/list-popup.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { MatChipsModule } from '@angular/material/chips';
import { MatListModule } from '@angular/material/list';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { TranslateModule } from '@ngx-translate/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedPipesModule } from 'app/shared/pipes/shared-pipes.module';
import { ListPlansComponent } from './plans/list-plans/list-plans.component';
import { RequestSaveOptionsDialogComponent } from './Requests/request-save-options-dialog/request-save-options-dialog.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { EditRequestComponent } from './Requests/edit-request/edit-request.component';
import { CopyRequestComponent } from './Requests/copy-request/copy-request.component';
import { SharedMaterialModule } from 'app/shared/shared-material.module';
import { StatusChangeDialogComponent } from './Requests/status-change-dialog/status-change-dialog.component';
import { jqxChartModule } from 'jqwidgets-ng/jqxchart';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { DocsComponent } from './docs/docs.component';
import { CategoryComponent } from './categories/category/category.component';
import { NotificationLogsComponent } from './notification-logs/notification-logs.component';
import { CatDialogComponent } from './cat-dialog/cat-dialog.component';
import { DeleteCatDialogComponentComponent } from './delete-cat-dialog-component/delete-cat-dialog-component.component';
import { LogsHistoryComponent } from './logs-history/logs-history.component';
import { MAT_DATE_LOCALE } from '@angular/material/core';

@NgModule({
  declarations: [DashboardComponent, NewRequestComponent, ListRequestComponent, NotificationsComponent, PlansComponent, ListPopupComponent, ListPlansComponent, RequestSaveOptionsDialogComponent, EditRequestComponent, CopyRequestComponent, StatusChangeDialogComponent, DocsComponent, CategoryComponent, NotificationLogsComponent, CatDialogComponent, DeleteCatDialogComponentComponent, LogsHistoryComponent],
  imports: [
    CommonModule,
    jqxChartModule,
    FormsModule,
    ReactiveFormsModule,
    SharedMaterialModule,
  //  MatCardModule,
    // MatSelectModule,
    // MatNativeDateModule,
    // MatDatepickerModule,
    // MatAutocompleteModule,
    // MatDividerModule,
    MatGridListModule,
    // MatInputModule,
    // MatFormFieldModule,
    // MatIconModule,
    // MatButtonModule,
    // FlexLayoutModule,
    // MatTabsModule,
     PdfViewerModule,
    // MatTableModule,
    // MatMenuModule,
    // MatProgressBarModule,
    // ChartsModule,
    // NgxEchartsModule,
    // NgxMaterialTimepickerModule,
    // NgxDatatableModule,
    // MatChipsModule,
    // MatListModule,
    // MatTooltipModule,
    // MatDialogModule,
    // MatSnackBarModule,
    // MatSlideToggleModule,
    // TranslateModule,
    // FlexLayoutModule,
  
    // MatExpansionModule,
    // SharedPipesModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    RouterModule.forChild(usersRoutes)
  ],
  
  providers: [
    DatePipe,
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' } // Sets Monday as the first date
    
  ],
  entryComponents: [ListPopupComponent, CatDialogComponent]
})
export class UsersModule { }
