$(function() {

    $(".loader").hide();

    $(".joinField").on("keyup", function() {
        $(".joinResult").html("");
    });

    $("form").on("submit", function(e) {
        e.preventDefault();

        const collection = {email_address: $(".joinField").val()}

        $.ajax({
            url: "subscribe.php",
            type: 'POST',
            data: collection,
            dataType: 'json',
            beforeSend: function() {
                $("#waitlist-subscribe").attr("disabled", true).text("Enlisting...");
                $(".loader").show();
            },
            success: function(data) { 
                const { success, response } = data;
                const subscriptionResponse = JSON.parse(response);

                if (success) {                    
                    if (subscriptionResponse.hasOwnProperty("status") && subscriptionResponse.status === 400) {
                        $(".joinResult").html("You're already in the OG Fans waitlist.").addClass("text-success");
                    } else {
                        $(".joinResult").html("Thank you for joining the OG Fans waitlist.  We'll keep you posted for more updates.").addClass("text-success");
                    }                    
                    $(".joinField").val("");
                    $("#waitlist-subscribe").attr("disabled", false).text("JOIN NOW!");
                    $(".loader").hide();
                } else {
                    $(".joinResult").html("Error encountered while joining. Try again later.").addClass("text-danger");
                }
            }
        });
    });
});