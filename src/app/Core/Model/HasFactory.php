<?php

declare(strict_types=1);

namespace App\Core\Model;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Database\Eloquent\Factories\HasFactory as FactoriesHasFactory;

trait HasFactory
{
    use FactoriesHasFactory;

    // public static function newFactory(): Factory
    // {
    //     $factoryClass = sprintf('%s%s', static::class, 'Factory');
    //     return $factoryClass::new();
    // }mixin
}
