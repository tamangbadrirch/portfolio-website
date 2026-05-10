<?php

// Your receiving email
$receiving_email_address = 'nepsenotifier@gmail.com';

// Load PHP Email Form Library
if (file_exists($php_email_form = '../assets/vendor/php-email-form/php-email-form.php')) {
    include($php_email_form);
} else {
    die('Unable to load the PHP Email Form Library!');
}

// Create instance
$contact = new PHP_Email_Form;
$contact->ajax = true;

// Email settings
$contact->to = $receiving_email_address;
$contact->from_name = $_POST['name'];
$contact->from_email = $_POST['email'];
$contact->subject = $_POST['subject'];

// Add messages
$contact->add_message($_POST['name'], 'Name');
$contact->add_message($_POST['email'], 'Email');
$contact->add_message($_POST['message'], 'Message', 10);

// Send email
echo $contact->send();

?>