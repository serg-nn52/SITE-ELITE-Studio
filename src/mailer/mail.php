<?php 

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\SMTP;

// require_once('phpmailer/PHPMailerAutoload.php');

require './src/PHPMailer.php';
require './src/SMTP.php';
require './src/Exception.php';


$mail = new PHPMailer(true);
$mail->CharSet = 'utf-8';



$phone = $_POST['tel'];
$email = $_POST['email'];
$userMessage = $_POST['message'];

// //$mail->SMTPDebug = 3;                               // Enable verbose debug output

$mail->isSMTP();                                      // Set mailer to use SMTP
$mail->Host = 'smtp.mail.ru';  																							// Specify main and backup SMTP servers
$mail->SMTPAuth = true;                               // Enable SMTP authentication
$mail->Username = 'serg12345sdg@mail.ru'; // Ваш логин от почты с которой будут отправляться письма
$mail->Password = '4kTx8giFpbSdY3VaF5vU'; // Ваш пароль от почты с которой будут отправляться письма
$mail->SMTPSecure = 'ssl';                            // Enable TLS encryption, `ssl` also accepted
$mail->Port = 465; // TCP port to connect to / этот порт может отличаться у других провайдеров




$mail->setFrom('serg12345sdg@mail.ru', 'Сергей'); // от кого будет уходить письмо?
$mail->addAddress('serg-nn@inbox.ru');     // Кому будет уходить письмо 
//$mail->addAddress('ellen@example.com');               // Name is optional
//$mail->addReplyTo('info@example.com', 'Information');
//$mail->addCC('cc@example.com');
//$mail->addBCC('bcc@example.com');
//$mail->addAttachment('/var/tmp/file.tar.gz');         // Add attachments
//$mail->addAttachment('/tmp/image.jpg', 'new.jpg');    // Optional name
$mail->isHTML(true);                                  // Set email format to HTML

$mail->Subject = 'Заявка с нашего сайта';
$mail->Body    = 'Сообщение "' .$userMessage . '", телефон ' .$phone. '<br>Почта этого пользователя: ' .$email;
$mail->AltBody = '';

if(!$mail->send()) {
    $message = 'Ошибка';
} else {
    $message = 'Данные отправлены!';
}
$response = ['message' => $message];
header('Content-type: application/json');
echo json_encode($response);
?>