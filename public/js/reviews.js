$(document).ready(function(){
    $("#addreviewform").on("submit",function(event){
        event.preventDefalt();
        let review=$("#review").val();
        let rating=$("#rating").val();

        $.ajax({
            url:'/reviews/add',
            method:'POST',
            contentType:'application/json',
            data:JSON.stringify({review:review,rating:rating}),
            success:function(res){
                console.log('suss')
            }
        })
    })
})