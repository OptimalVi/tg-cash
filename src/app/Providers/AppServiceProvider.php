<?php

namespace App\Providers;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Factory::guessModelNamesUsing(function (Factory $factory) {
            return \Str::replaceLast('Factory', '', $factory::class);
        });
        Factory::guessFactoryNamesUsing(function (string $modelName) {
            return str_replace('/', '\\', sprintf('%s%s', $modelName, 'Factory'));
        });
    }
}
