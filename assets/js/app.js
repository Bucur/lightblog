  	
$(document).ready(function() {

  // Hide alerts
  $('.alert:not(".alert-dismissible")').each(function(){
    $(this).delay(4000).slideUp(200);
  });

  // AJAX form
  $("#commentForm").validate({
    rules: {
      email: {
        email: true
      }
    },

    submitHandler: function(form) {
      var form = $("#commentForm"),
      $fields = form.find('input[type="text"],input[type="email"],textarea'),
      url = form.attr('action'),
      postWhat = form.data('post'),
      data = form.serialize();
      $.ajax({
        type: "POST",
        url: url,
        data: data,
        success: function() {
          $('#comment_add_msg').text("Your " + postWhat + " will be published after approval")
          .slideDown(250).delay(2500).slideUp(250);
          // Empty the form's fields
          $fields.val('');
        },
        error: function() {
          $('#comment_add_msg').removeClass('alert-success').addClass('alert-danger')
          .text("Sorry, we could not add your " + postWhat + " comment")
          .slideDown(250).delay(2500).slideUp(250);
        }
      });
    }
  });

  // Print post
  $('#print_post').on('click', function(){
    $('#post_content').printThis();
  });

  //Delete Posts
  $('.delete-post').on('click', function(evt){
    evt.preventDefault();
    var baseUrl = window.location.protocol + '//' + window.location.hostname + '/' + window.location.pathname.split('/')[1] + '/';
    var deleteUrl = $(this).attr('href');
    var slug = $(this).data('slug');
    var postsCount = Number($("#posts_count").text());

    if(confirm('Delete this post?')) {
      if ($(this).hasClass("ajax-btn")) {
        $.ajax({
          url: baseUrl + 'posts/delete/' + slug,
          method: 'GET',
          dataType: 'html',
          success: function(deleteMsg){
            postsCount = postsCount - 1;
            console.log(baseUrl + 'posts/delete/' + slug);
            $('tr[data-slug="' + slug +'"]').fadeOut('250');
            $("#posts_count").text(postsCount);
            $('#post_delete_msg').text("The post has been deleted");
            $('#post_delete_msg').slideDown(250).delay(2500).slideUp(250);
          }
        });
      } else {
        window.location.href = deleteUrl;
      }
    }
  });

  //Delete Category
  $('.delete-category').on('click', function(evt){
    evt.preventDefault();
    var deleteUrl = $(this).attr('href');
    if(confirm('Delete this category?')) {
      window.location.href = deleteUrl;
    }
  });

  //Delete Page
  $('.delete-page').on('click', function(evt){
    evt.preventDefault();
    var deleteUrl = $(this).attr('href');
    if(confirm('Delete this page?')) {
      window.location.href = deleteUrl;
    }
  });

  //Delete User
  $('.delete-user').on('click', function(evt){
    evt.preventDefault();
    var deleteUrl = $(this).attr('href');
    if(confirm('Delete this page?')) {
      window.location.href = deleteUrl;
    }
  });

  //Delete Comments
  $('.delete-comment').on('click', function(evt){
    evt.preventDefault();
    var baseUrl = window.location.protocol + '//' + window.location.hostname + '/' + window.location.pathname.split('/')[1] + '/';
    var deleteUrl = $(this).attr('href');
    var id = $(this).data('id');
    var commentsCount = Number($("#comments_count").text());

    if(confirm('Delete this comment?')) {
      $.ajax({
        url: baseUrl + 'dashboard/comments/delete/' + id,
        method: 'GET',
        dataType: 'html',
        success: function(deleteMsg){
          commentsCount = commentsCount - 1;
          $('tr#' + id).fadeOut('250');
          $("#comments_count").text(commentsCount);
          $('#comment_delete_msg').text("The comment has been deleted");
          $('#comment_delete_msg').slideDown(250).delay(2000).slideUp(250);
        }
      });
    }
  });

  $("#comments_status").click(function(evt) {
    evt.preventDefault();
    $('html, body').animate({
      scrollTop: $("#comments_container").offset().top
    }, 1000);
  });

  // Make the latest posts clickable
  $('.news-list li').on('click', function(){
    var postUrl = $(this).find('a').attr('href');
    window.location.href = postUrl;
  });

});