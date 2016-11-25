'use strict';
function parseQuote (response) {
  let msg = $('<div>');
  msg.addClass('messageBubble');
  if (response.userName === 'user') {
    msg.addClass('user');
  }
  let msgcontent = response.quoteText;
  msg.html(msgcontent);
  storeMessage(msgcontent);
  $('.chatWindow').append(msg);


}

function getMessage () {

  $.ajax({
    url: 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en',
    method: 'GET',
    data : {jsonp : 'parseQuote', format : 'jsonp'},
    dataType : 'jsonp'
  });


}
function getStoredMessages () {
  $.ajax({
    url: 'getStoredMessages',
    method: 'GET' ,
    dataType : 'json' ,
    success : printMessages

  });

}
function printMessages  (messages) {
  for (var ind in messages) {
    console.log(messages[ind]);
    parseQuote(messages[ind]);
    
  }
}

function storeMessage (msg) {
  $.ajax({
    url: 'store',
    method: 'POST',
    dataType: 'json',        
    data :JSON.stringify({quoteText : msg, userName : 'user'})
  });
}


$(document).ready(function () {
  getStoredMessages();
  $('#target').submit(function (event) {
    event.preventDefault();
    let msg = $('<div>');
    let msgcontent = $('#textbox').val();
    msg.addClass('messageBubble user');
    msg.html(msgcontent);
    storeMessage(msgcontent);
    $('.chatWindow').append(msg);
    $('#textbox').val('');

    setTimeout(function () {
      getMessage();
    }, 1000);
  });

});