<?php

namespace Database\Factories;

use App\Models\Product;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $categories = ['Digital Art', 'Photography', 'Abstract Art'];

        $status = ['On Sale', 'Not On Sale'];


        return [
            'name' => ucfirst($this->faker->unique()->word(8)),
            'description' => "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec commodo vestibulum commodo. Nunc vitae iaculis nibh, nec imperdiet ante. Sed luctus nibh sed diam posuere, et ullamcorper odio sollicitudin. Nunc pretium ipsum vitae nunc ultrices, vitae tristique metus imperdiet.",
            'price' => $this->faker->numberBetween(100, 1000),
            'stock' => $this->faker->numberBetween(10, 100),
            'image' => "https://picsum.photos/id/".($this->faker->numberBetween(50, 1080)) ."/600/400",
            'category' => $this->faker->randomElement($categories),
            'status' => $this->faker->randomElement($status),
        ];
    }
}
