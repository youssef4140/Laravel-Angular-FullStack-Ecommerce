<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Order;
use App\Models\Product;
use App\Models\OrderProduct;
use Illuminate\Http\Request;

class OrderController extends Controller
{

    public function deleteIfPending($id)
     {
        try {
            $order = Order::findOrFail($id);
    
            if ($order->status == 'pending') {
                $order->forceDelete();
                return response()->json(['message' => 'Order deleted successfully'], 200);
            } else {
                return response()->json(['message' => 'Order is not in "pending" status and cannot be deleted'], 422);
            }
        } catch (ModelNotFoundException $e) {
            return response()->json(['message' => 'Order not found'], 404);
        }
    }


    public function addOrder($id, Request $request)
    {
        try {
            $body = $request->all();
            if(!$body.length()){
                return response()->json(['message' => 'Cart is empty'], 422);
            }
            $orderProducts = [];
            $total = 0;
    
            foreach ($body as $p) {
                $product = Product::findOrFail($p['product_id']);
                $subtotal = $product->price * $p['quantity'];
                $total += $subtotal;
                $orderProduct = [
                    'product_id' => $p['product_id'],
                    'product_quantity' => $p['quantity'],
                    'product_subtotal' => $subtotal
                ];
                $orderProducts[] = $orderProduct;
            }
    
            $order = Order::create([
                'total' => $total,
                'user_id' => $id,
                'status' => 'pending',
            ]);
    
            $response = [];
    
            foreach ($orderProducts as &$op) {
                $op['order_id'] = $order->id; 
                $orderProduct = OrderProduct::create($op);
                $response[] = $orderProduct;
            }
    
            return response()->json($response, 201);
        } catch (QueryException $e) {
            return response()->json(['message' => 'Failed to create the order', 'error' => $e->getMessage()], 500);
        } catch (ValidationException $e) {
            return response()->json(['message' => 'Validation failed', 'errors' => $e->errors()], 422);
        } catch (\Exception $e) {
            return response()->json(['message' => 'An error occurred', 'error' => $e->getMessage()], 500);
        }
    }

    public function productsPerOrderPerUser($id)
    {
        $orders = $this->ordersPerUser($id);
        $allProducts = [];
        foreach ($orders as $order) {
            $total = $order->total;
            $allProducts[] = $this->mapOrderProducts($order);
        }
            return $allProducts;
    }

    public function ordersPerUser($id)
    {
        $user = User::findOrFail($id);
        $orders = $user->orders;
        return $orders;
    }

    public function productsPerOrder($id)
    {
        $order = Order::findOrFail($id);
        return $this->mapOrderProducts($order);
    }

    private function mapOrderProducts($order)
    {
        $orderProducts = $order->orderProducts;
        $products = [];
        foreach ($orderProducts as $orderProduct){
            $product = [
                'product' => $orderProduct->product,
                'quantity' => $orderProduct->product_quantity,
                'subtotal' => $orderProduct->product_subtotal
            ];
            $products[] = $product;

        }
        return [
            'total' => $order->total,
            'status' => $order->status,
            'products'=>$products
        ];
        
       }


       public function productsPerOrderForAllUsers(){
        $users = User::all();
        $productsPerOrderForAllUsers = [];
        foreach ($users as $user){
            $productsPerOrderForAllUsers[] = [ 
                'user' => $user,
                'orders' => $this->productsPerOrderPerUser($user->id)];
        }
        return $productsPerOrderForAllUsers;
       }

}
   
