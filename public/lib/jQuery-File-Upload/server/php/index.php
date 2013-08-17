<?php
/*
 * jQuery File Upload Plugin PHP Example 5.14
 * https://github.com/blueimp/jQuery-File-Upload
 *
 * Copyright 2010, Sebastian Tschan
 * https://blueimp.net
 *
 * Licensed under the MIT license:
 * http://www.opensource.org/licenses/MIT
 */

error_reporting(E_ALL | E_STRICT);

require_once('../../../../../config/all_configs.php');
require_once('../../../../php/OckFileUpload.php');
require('UploadHandler.php');

$options = array('upload_dir' => UPLOAD_PATH . '/', 'upload_url' => HTTP_UPLOAD_PATH . '/', 'user_callback' => array(new OckFileUpload(), 'saveFileInDb'));
$upload_handler = new UploadHandler($options);
