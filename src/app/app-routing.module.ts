import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: './pages/login/login.module#LoginPageModule'
    // loadChildren: './pages/personalinfo/profile-update/profile-update.module#ProfileUpdatePageModule'
  },
  {
    path: 'home',
    loadChildren: './pages/home/home.module#HomePageModule'
  },
  {
    path: 'list',
    loadChildren: './pages/list/list.module#ListPageModule'
  },
  {
    path: 'donutgraph',
    loadChildren: './pages/donutgraph/donutgraph.module#DonutgraphPageModule'
  },
  {
    path: 'twenty-five-window',
    loadChildren: './pages/dashboard/twenty-five-window/twenty-five-window.module#TwentyFiveWindowPageModule'
  },
  {
    path: 'overall-associates',
    loadChildren: './pages/dashboard/overall-associates/overall-associates.module#OverallAssociatesPageModule'
  },
  {
    path: 'pgm-distribution',
    loadChildren: './pages/dashboard/pgm-distribution/pgm-distribution.module#PgmDistributionPageModule'
  },
  {
    path: 'twenty-five-window-list-without-weightage',
    loadChildren: './pages/dashboard/twenty-five-window-list-without-weightage/twenty-five-window-list-without-weightage.module#TwentyFiveWindowListWithoutWeightagePageModule'
  },
  {
    path: 'employee-details',
    loadChildren: './pages/dashboard/employee-details/employee-details.module#EmployeeDetailsPageModule'
  },
  {
    path: 'employee-more-info-with-charts',
    loadChildren: './pages/dashboard/employee-more-info-with-charts/employee-more-info-with-charts.module#EmployeeMoreInfoWithChartsPageModule'
  },
  {
    path: 'overall-associates-drilldown-one',
    loadChildren: './pages/dashboard/overall-associates-drilldown-one/overall-associates-drilldown-one.module#OverallAssociatesDrilldownOnePageModule'
  },
  {
    path: 'overall-associates-drilldown-two',
    loadChildren: './pages/dashboard/overall-associates-drilldown-two/overall-associates-drilldown-two.module#OverallAssociatesDrilldownTwoPageModule'
  },
  {
    path: 'search-by-associate',
    loadChildren: './pages/search-engine/search-by-associate/search-by-associate.module#SearchByAssociatePageModule'
  },
  {
    path: 'search-engine-employee-details',
    loadChildren: './pages/search-engine/search-engine-employee-details/search-engine-employee-details.module#SearchEngineEmployeeDetailsPageModule'
  },
  {
    path: 'rwf-management',
    loadChildren: './pages/rwf/rwf-management/rwf-management.module#RwfManagementPageModule'
  },
  {
    path: 'rwf-ageing',
    loadChildren: './pages/rwf/rwf-ageing/rwf-ageing.module#RwfAgeingPageModule'
  },
  {
    path: 'rwf-resource-list-for-skill',
    loadChildren: './pages/rwf/rwf-resource-list-for-skill/rwf-resource-list-for-skill.module#RwfResourceListForSkillPageModule'
  },
  {
    path: 'rwf-skill-resource-employee-details',
    loadChildren: './pages/rwf/rwf-skill-resource-employee-details/rwf-skill-resource-employee-details.module#RwfSkillResourceEmployeeDetailsPageModule'
  },
  {
    path: 'demand-list',
    loadChildren: './pages/rwf/demand-list/demand-list.module#DemandListPageModule'
  },
  {
    path: 'demand-details',
    loadChildren: './pages/rwf/demand-details/demand-details.module#DemandDetailsPageModule'
  },
  {
    path: 'add-srf-additional-details',
    loadChildren: './pages/rwf/add-srf-additional-details/add-srf-additional-details.module#AddSrfAdditionalDetailsPageModule'
  },
  {
    path: 'pgm-distribution-drill-down',
    loadChildren: './pages/dashboard/pgm-distribution-drill-down/pgm-distribution-drill-down.module#PgmDistributionDrillDownPageModule'
  },
  {
    path: 'rwf-dashboard-tabs',
    loadChildren: './pages/rwf/rwf-dashboard-tabs/rwf-dashboard-tabs.module#RwfDashboardTabsPageModule'
  },
  {
    path: 'home-details',
    loadChildren: './pages/home-details/home-details.module#HomeDetailsPageModule'
  },
  {
    path: 'rwf-dashboard-more-details',
    loadChildren: './pages/rwf/rwf-dashboard-more-details/rwf-dashboard-more-details.module#RwfDashboardMoreDetailsPageModule'
  },
  {
    path: 'directory',
    loadChildren: './pages/directory/directory.module#DirectoryPageModule'
  },
  {
    path: 'twenty-five-window-with-weightage-more-details',
    loadChildren: './pages/dashboard/twenty-five-window-with-weightage-more-details/twenty-five-window-with-weightage-more-details.module#TwentyFiveWindowWithWeightageMoreDetailsPageModule'
  },
  {
    path: 'twenty-five-window-with-weightage-more-details-drilldown',
    loadChildren: './pages/dashboard/twenty-five-window-with-weightage-more-details-drilldown/twenty-five-window-with-weightage-more-details-drilldown.module#TwentyFiveWindowWithWeightageMoreDetailsDrilldownPageModule'
  },
  {
    path: 'twenty-five-window-without-weightage-more-details',
    loadChildren: './pages/dashboard/twenty-five-window-without-weightage-more-details/twenty-five-window-without-weightage-more-details.module#TwentyFiveWindowWithoutWeightageMoreDetailsPageModule'
  },
  {
    path: 'twenty-five-window-without-weightage-more-details-drilldown',
    loadChildren: './pages/dashboard/twenty-five-window-without-weightage-more-details-drilldown/twenty-five-window-without-weightage-more-details-drilldown.module#TwentyFiveWindowWithoutWeightageMoreDetailsDrilldownPageModule'
  },
  {
    path: 'leadwise-distribution-more-details',
    loadChildren: './pages/dashboard/leadwise-distribution-more-details/leadwise-distribution-more-details.module#LeadwiseDistributionMoreDetailsPageModule'
  },
  {
    path: 'leadwise-distribution-more-details-drilldown',
    loadChildren: './pages/dashboard/leadwise-distribution-more-details-drilldown/leadwise-distribution-more-details-drilldown.module#LeadwiseDistributionMoreDetailsDrilldownPageModule'
  },
  {
    path: 'overall-associates-more-details',
    loadChildren: './pages/dashboard/overall-associates-more-details/overall-associates-more-details.module#OverallAssociatesMoreDetailsPageModule'
  },
  {
    path: 'overall-associates-more-details-drilldown',
    loadChildren: './pages/dashboard/overall-associates-more-details-drilldown/overall-associates-more-details-drilldown.module#OverallAssociatesMoreDetailsDrilldownPageModule'
  },
  {
    path: 'employee-history-ratings',
    loadChildren: './pages/dashboard/employee-history-ratings/employee-history-ratings.module#EmployeeHistoryRatingsPageModule'
  },
  {
    path: 'employee-history-ratings-drilldown',
    loadChildren: './pages/dashboard/employee-history-ratings-drilldown/employee-history-ratings-drilldown.module#EmployeeHistoryRatingsDrilldownPageModule'
  },
  { 
    path: 'generic-search', 
    loadChildren: './pages/search-engine/generic-search/generic-search.module#GenericSearchPageModule' },
  { 
    path: 'generic-search-results', 
    loadChildren: './pages/search-engine/generic-search-results/generic-search-results.module#GenericSearchResultsPageModule' 
  },
  { 
    path: 'my-rwf-transaction', 
    loadChildren: './pages/rwf/my-rwf-transaction/my-rwf-transaction.module#MyRwfTransactionPageModule' 
  },
  { path: 'profileUpdate', 
    loadChildren: './pages/personalinfo/profile-update/profile-update.module#ProfileUpdatePageModule' },
  // { path: 'ModalPage', loadChildren: './modal-page/modal-page.module#ModalPagePageModule' },
  // { path: 'CertificateModal', loadChildren: './certificate-modal/certificate-modal.module#CertificateModalPageModule' },
  // { path: 'AccoladesModal', loadChildren: './accolades-modal/accolades-modal.module#AccoladesModalPageModule' },
  // { path: 'DomainModal', loadChildren: './domain-modal/domain-modal.module#DomainModalPageModule' },
  // { path: 'VisaDetailsModal', loadChildren: './visa-details-modal/visa-details-modal.module#VisaDetailsModalPageModule' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }