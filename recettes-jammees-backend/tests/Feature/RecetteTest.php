<?php

namespace Tests\Feature;

// use Illuminate\Foundation\Testing\RefreshDatabase;

use App\Models\Recipe;
use Tests\TestCase;

class RecetteTest extends TestCase
{

    private $recipe;

    private $user;


    public function setUp(): void {
        
    }

    /**
     * A basic test example.
     */
    public function GetAllRecipe(): void
    {
        $response = $this->get('/');

        $response->assertStatus(200);
    }
}
