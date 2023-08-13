<?php

use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Request;

return function (Request $request) {
    Log::info(print_r($request->all(), true));
};
