#!/usr/bin/php
<?php
$test = preg_replace('/[^\x20-\x7E\xA0-\xFF]/', '', shell_exec('ps ax | grep -i node | grep -i \'app.js\' | grep -v grep | grep -v php | wc -l'));

if(!is_numeric($test)){

    echo "Ocorreu um erro ao tentar verificar status da App. Abortando verificação...\n\n";
    die();

}

if($test < 1){

    echo "Foi verificado que o sistema está parado. Inicializando NodeJS...\n";
    echo shell_exec("node /var/www/html/custobr/app.js > /dev/null 2>&1 &");
    echo "\nParece que a app foi inicializada com sucesso\n\n";

}else{

    die("Foi verificado que a aplicação já está rodando...\n\n");

}

?>
