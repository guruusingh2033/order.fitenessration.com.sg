<?php

header('Access-Control-Allow-Origin: *');
echo file_get_contents($_GET['order'] ? "http://localhost:3006/order-wizard?order=$_GET[order]" : "http://localhost:3006/order-wizard");