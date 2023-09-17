<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Models\User;
use App\Models\Product;
use App\Models\Order;
use App\Models\OrderProduct;

use App\Http\Controllers\ProductController;
use App\Http\Controllers\OrderController;


/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware(['auth:sanctum'])->group(function(){
    Route::get('/user', function (Request $request){
        return $request->user();
    });
    // products per order per user
    Route::get('products/orders/user/{id}',[OrderController::class, 'productsPerOrderPerUser']);

    // orders per user
    Route::get('orders/user/{id}',[OrderController::class, 'ordersPerUser']);

    //products per order
    Route::get('products/order/{id}',[OrderController::class, 'productsPerOrder']);

    //add order
    Route::post('order/{id}',[OrderController::class, 'addOrder']);

    //get order by id
    Route::delete('order/{id}',[OrderController::class, 'deleteIfPending']);

    /**
     * Crud on products only accessible by admin.
     */
    Route::middleware('admin')->group(function(){
        
        Route::post('products',[ProductController::class, 'addProduct']);

        Route::delete('products/{id}',[ProductController::class, 'deleteProductById']);

        Route::delete('products/',[ProductController::class, 'deleteProducts']);

        Route::put('products/{id}',[ProductController::class, 'updateProduct']);

        Route::get('products/orders/users',[OrderController::class, 'productsPerOrderForAllUsers']);

    });

});

Route::get('products',[ProductController::class, 'getAllProducts']);

Route::get('products/{id}',[ProductController::class, 'getProductById']);

Route::post('search/products',[ProductController::class, 'searchProducts']);






