<?php 
if($_SERVER["REQUEST_METHOD"] == "POST") {
    $student_name = htmlspecialchars($_POST["student_name"]);
    $age = htmlspecialchars($_POST["age"]);
    $section = htmlspecialchars($_POST["section"]);
    $units_last_sem = htmlspecialchars($_POST["units_last_sem"]);
    $address = htmlspecialchars($_POST["address"]);
    $date_time = htmlspecialchars($_POST["datetime_submitted"]);

    $record = "===============================\n" . 
               "Date Time Submitted: $date_time\n" .
               "Student Name: $student_name\n" .
               "Age: $age\n" .
               "Section: $section\n" .
               "Units Last Semester: $units_last_sem\n" .
               "Address: $address\n" .
               "===============================\n\n";

    $file = fopen("enrollment_records.txt", "a");
    if($file){
        fwrite($file, $record);
        fclose($file);

        echo "Success";
    } else {
        http_response_code(500);
        echo "Error";
    }
}
?>