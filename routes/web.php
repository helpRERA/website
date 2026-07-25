<?php

use App\Http\Controllers\Agent\AgentListController;
use App\Http\Controllers\Announcement\AnnouncementController;
use App\Http\Controllers\Announcement\AnnouncementTagsController;
use App\Http\Controllers\AnnouncementListing\AnnouncementListingController;
use App\Http\Controllers\Complaint\ComplaintController;
use App\Http\Controllers\Complaint\ComplaintInfoController;
use App\Http\Controllers\ContactUsController;
use App\Http\Controllers\AgreementForSaleController;
use App\Http\Controllers\Dashboard\DataDashboardController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\DisplayPagesController;
use App\Http\Controllers\ExploreProjectController;
use App\Http\Controllers\FileUpload\FileUploadController;
use App\Http\Controllers\FileUpload\ImageUploadController;
use App\Http\Controllers\FileUpload\UploadsManagerController;
use App\Http\Controllers\FooterController;
use App\Http\Controllers\Gallery\GalleryImageController;
use App\Http\Controllers\Gallery\GalleryViewController;
use App\Http\Controllers\Gallery\ManageGalleryController;
use App\Http\Controllers\Gallery\ManageVideoController;
use App\Http\Controllers\GlobalSearchController;
use App\Http\Controllers\InaugurationController;
use App\Http\Controllers\LocalityController;
use App\Http\Controllers\NavEditor\NavEditorController;
use App\Http\Controllers\Project\DocumentListController;
use App\Http\Controllers\Project\OrderListController;
use App\Http\Controllers\Project\ProjectListController;
use App\Http\Controllers\Promoters\PartnerImageController;
use App\Http\Controllers\Promoters\PromoterDetailController;
use App\Http\Controllers\Promoters\PromoterListController;
use App\Http\Controllers\Promoters\PromoterLogoController;
use App\Http\Controllers\ReferenceData\ReferenceDataApiController;
use App\Http\Controllers\ReferenceData\ReferenceDataController;
use App\Http\Controllers\SearchController;
use App\Http\Controllers\Tags\TagController;
use App\Http\Controllers\TestController;
use App\Http\Controllers\UIBuilder\UIBuilderController;
use App\Http\Controllers\UIBuilder\ViewBuilderPageController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

//consumer pages
Route::get('/', [ViewBuilderPageController::class, 'home'])->name('front-page');
Route::get('/search-results', [SearchController::class, 'index']);

Route::get('/explore-projects', [ExploreProjectController::class, 'index']);
Route::get('/projects/{id}', [ExploreProjectController::class, 'details']);
Route::get('/announcements', [AnnouncementListingController::class, 'index']);
Route::get('/latest-announcements', [AnnouncementListingController::class, 'latestAnnouncements']);
Route::get('/announcements/{id}', [AnnouncementListingController::class, 'show']);
Route::get('/pages', [DisplayPagesController::class, 'index']);

//agent-search
Route::get('/agents', [AgentListController::class, 'index']);
//Route::get('/export-agents', [AgentListController::class, 'export']);
Route::get('/agent-certification/{id}', [AgentListController::class, 'downloadCertificate']);
Route::get('/agent-print-preview/{id}', [AgentListController::class, 'printPageRedirect']);

Route::get('/projects', [ProjectListController::class, 'index']);
Route::get('/export-projects', [ProjectListController::class, 'exportExcel']);

//agreement-for-sale

Route::get('agreement-for-sale', [AgreementForSaleController::class, 'index']);
Route::post('agreements', [AgreementForSaleController::class, 'store']);
Route::put('agreements/{id}', [AgreementForSaleController::class, 'update']);

//global-search
Route::get('/search', [GlobalSearchController::class, 'index']);

//image download
Route::get('/uploaded-images/{id}', [ExploreProjectController::class, 'imageDownload']);
// document download
Route::get('/view-file/{id}', [ExploreProjectController::class, 'documentDownload']);
Route::get('/signed-certificate/{id}', [ExploreProjectController::class, 'hsmDownload']);
//extension certificate
Route::get('/extension-certificate/{id}', [ExploreProjectController::class, 'extensionCertificateDownload']);
//extension order
Route::get('/extension-order/{id}', [ExploreProjectController::class, 'extensionOrderDownload']);
//registration order
Route::get('/registration-order/{id}', [ExploreProjectController::class, 'registrationOrderDownload']);

//file-manager
Route::get('/manage-documents', [UploadsManagerController::class, 'uploadedDocuments']);
Route::get('/manage-images', [UploadsManagerController::class, 'uploadedImages']);
Route::delete('/manage-images/{id}', [UploadsManagerController::class, 'imageDestroy']);
Route::delete('manage-documents/{id}', [UploadsManagerController::class, 'fileDestroy']);

//list apis
Route::get('taluk-list', [LocalityController::class, 'talukList']);
Route::get('village-list', [LocalityController::class, 'villageList']);
Route::get('district-coordinates', [LocalityController::class, 'districtCoordinates']);
Route::get('parameters/{domain}', [ReferenceDataController::class, 'parameters']);
Route::get('get-reference-data-values', [ReferenceDataApiController::class, 'getUniqueValues']);
Route::get('get-cascaded-reference-values', [ReferenceDataApiController::class, 'getUniqueCascadedValues']);
Route::get('projects-by-district', [ExploreProjectController::class, 'projectsByDistrict']);
Route::get('file-search', [FileUploadController::class, 'fileNameSearch']);
Route::get('image-search', [ImageUploadController::class, 'fileNameSearch']);
Route::get('tags', [TagController::class, 'search']);

Route::get('gallery', [GalleryViewController::class, 'list']);
Route::get('gallery/{id}', [GalleryViewController::class, 'album']);

//complaint list
Route::get('complaint-list', [ComplaintController::class, 'index']);
Route::get('complaint-file/{id}/{year}/{complainantName}', [ComplaintController::class, 'fileDownload']);
Route::get('appeal-file/{id}', [ComplaintController::class, 'appealDownload']);
Route::get('cause-list', [ComplaintController::class, 'causes']);

// resources
Route::resource('reference-data', ReferenceDataController::class);
Route::resource('manage-announcements', AnnouncementController::class);
Route::resource('nav-editor', NavEditorController::class);
Route::resource('footer-editor', FooterController::class);
Route::resource('announcement-tags', AnnouncementTagsController::class);
Route::resource('manage-gallery', ManageGalleryController::class);
Route::resource('gallery-image', GalleryImageController::class);
Route::resource('manage-video', ManageVideoController::class);

//admin pages
Route::get('dashboard', [DashboardController::class, 'dashboard']);

//ui editor
Route::resource('page-builder', UIBuilderController::class);

//post requests
Route::post('file-upload', [FileUploadController::class, 'index']);
Route::post('contact-us', [ContactUsController::class, 'sendMail']);
Route::post('image-upload', [ImageUploadController::class, 'index']);
Route::post('attach-announcement-file', [AnnouncementController::class, 'attachFile']);
Route::delete('remove-announcement-file/{file}', [AnnouncementController::class, 'removeFile']);

Route::get('inaugurate', [InaugurationController::class, 'inaugurate'])
    ->name('inaugurate');

Route::get('inaugurate-time', [InaugurationController::class, 'changeDate'])
    ->name('inaugurate-time');

Route::post('inaugurate', [InaugurationController::class, 'changeState'])
    ->name('inaugurate-site');

Route::get('partner-images/{id}', PartnerImageController::class)
    ->name('partner-images');

Route::get('promoter-images/{userId}', PromoterLogoController::class)
    ->name('promoter-images');

require __DIR__.'/auth.php';

Route::get('debug-test', TestController::class);

Route::get('document-list', DocumentListController::class);
Route::get('order-list', OrderListController::class);

Route::get('promoters', PromoterListController::class);
Route::get('promoter/{id}', PromoterDetailController::class);
Route::get('complaint-info', ComplaintInfoController::class);

Route::get('/page-preview/{id}', [ViewBuilderPageController::class, 'preview'])
    ->middleware('auth');

Route::get('data-dashboard', DataDashboardController::class)
    ->name('data-dashboard');

Route::get('{all}', [ViewBuilderPageController::class, 'index']);
