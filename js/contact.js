$(document).ready(function() {
    $("#contact").on("submit", function(e) {
        e.preventDefault();
        $("#submit").prop("disabled", true);
        $("#submit").val("...");

        var target = "aHR0cHM6Ly9mb3Jtc3ByZWUuaW8vZmFtaWxpYXJzLmNhbWJyaWRnZUBnbWFpbC5jb20=";

        var name = $("#name").val();
        var email = $("#email").val();
        var message = $("#message").val();

        $.ajax({
            url: atob(target),
            method: "POST",
            data:{
                name: name,
                _replyto: email,
                email: email,
                message: message,
                _subject: "Form submission",
            },
            dataType: "json",
            success: function() {
                $("#form").hide();
                $("#thanks").show();
            }
        });
    });
});
