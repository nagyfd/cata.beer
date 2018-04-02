// register form

//hide error message, focus on username field
$(document).ready(function(){
    $("#username").focus();
    $("#error").hide();
    
// Check if valid
function submitReg(){
    var error="Error:";
    //check username
    if($("#username").val().length<=3){
        error+="Username must be more than 3 characters. ";
    }
    //check password
    if($("#password").val().length<=3){
        error+="Password must be more than 3 characters. ";
    }
    //check if the passwords match
    if($("#password").val()!=$("#password2").val()){
        error+="The two passwords do not match. ";
    }
    //check email
    if($("#email").val().length<=3){
        error+="Email address is not valid. ";
    }
    // Show error if error message is long enough for 1 error
    // For some reason I can't get the page to focus on the password
    if(error.length>15){
        $("#error").show();
        $("#password").focus();
        return false;
    }else{
        $("#error").hide();
    }
    return true;
}
});
