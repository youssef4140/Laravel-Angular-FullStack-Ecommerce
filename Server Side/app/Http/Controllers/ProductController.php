<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Product;

class ProductController extends Controller
{
    public function getAllProducts()
    {
        try{
            // $products = Product::all();
            $products = Product::orderBy('id', 'desc')->paginate(12);
            // localhost:8000/api/products?page=2
            return response()->json($products,200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'An error occurred', 'error' => $e->getMessage()], 500);
        }
    }

    public function getProductById($id)
    {
        try{
            $product = Product::findOrFail($id);
            return response()->json($product,200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'An error occurred', 'error' => $e->getMessage()], 500);
        }
    }

    public function addProduct(Request $request)
    {
        try{
             $body = $request->all();
             $product = Product::create($body);

             return response()->json($product,200);

        } catch (QueryException $e) {
            return response()->json(['message' => 'Failed to create the order', 'error' => $e->getMessage()], 500);
        } catch (ValidationException $e) {
            return response()->json(['message' => 'Validation failed', 'errors' => $e->errors()], 422);
        } catch (\Exception $e) {
            return response()->json(['message' => 'An error occurred', 'error' => $e->getMessage()], 500);
        }
    }

    public function deleteProductById($id)
    {
        try {
            $product = Product::findOrFail($id);
    
            $product->forceDelete();
            return response()->json(['message' => 'Order deleted successfully'], 200);
        } catch (ModelNotFoundException $e) {
            return response()->json(['message' => 'Order not found'], 404);
        }
    }

    public function deleteProducts(Request $request)
    {
        $idArr = $request->all();
        foreach ($idArr as $id){
            $this->deleteProductById($id);
        }

    }

    public function updateProduct($id,Request $request)
    {
        try{
            $product = Product::findOrFail($id);
            $newProduct = $request->all();
            $product->update($newProduct);
            return response()->json($product,200);

        } catch (\Exception $e) {
            return response()->json(['message' => 'An error occurred', 'error' => $e->getMessage()], 500);
        }
    }

    public function searchProducts(Request $request)
    {
        try{
            $search = $request->all()['search'];
            $product = Product::where('name','like','%'.$search.'%')->get();
            return $product;
        } catch (\Exception $e) {
            return response()->json(['message' => 'An error occurred', 'error' => $e->getMessage()], 500);
        }
    }
}
