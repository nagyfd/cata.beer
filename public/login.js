// Focuses cursor on username field 

// Focus on username, hide error
$(document).ready(function(){
    $("#username").focus();
    $("#errormsg").hide();
});

//check if there's both a password and username
function submitLog(){
    if(!$("#password").val()||!$("#username").val()){
          $("#errormsg").show();
        if(!$("#password").val()){
            $("#password").focus();
        }else if(!$("#username").val()){
            $("#username").focus();
        }
        return false;
    }else{
        $("#errormsg").hide();
    }
    return true;
}
