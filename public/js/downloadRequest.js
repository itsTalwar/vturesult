$(function() {
    console.log("sending request to download")
    setTimeout(() => {
        $.ajax({
            url: "http://localhost:8000/download",
            type: "POST",
            crossDomain: true,
            dataType: "json",
            success: function (response) {
                alert('download started');
            },
            error: function (xhr, status) {
                alert("downlaod failed");
            }
        });
    },5000)
});
