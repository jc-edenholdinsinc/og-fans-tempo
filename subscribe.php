<?php 
if (isset($_POST['email_address']) && $_SERVER['REQUEST_METHOD'] === 'POST') {
    
    try {
        // API to mailchimp
        $list_id = 'your audience id here';
        $authToken = 'your mailchimp token here';
        // The data to send to the API

        $postData = array(
            "email_address" => $_POST['email_address'],
            "status" => "subscribed",
        );

        // Setup cURL
        $ch = curl_init('https://us12.api.mailchimp.com/3.0/lists/'.$list_id.'/members/');
        curl_setopt_array($ch, array(
            CURLOPT_POST => TRUE,
            CURLOPT_RETURNTRANSFER => TRUE,
            CURLOPT_HTTPHEADER => array(
                'Authorization: apikey '.$authToken,
                'Content-Type: application/json'
            ),
            CURLOPT_POSTFIELDS => json_encode($postData)
        ));
        // Send the request
        $response = curl_exec($ch);

        echo json_encode(array('success' => true, 'response' => $response));
    } catch (Exception $e) {
        echo json_encode(array('success' => false));
    }

} else {
    echo json_encode(array('success' => false));
}


// phpinfo();

// if(function_exists('curl_init') === false){
//     echo "curl_init is not defined";
//     //cURL not enabled
// }

?>