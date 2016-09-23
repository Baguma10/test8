$(document).ready(function(){
  $("#Slider").owlCarousel({
      navigation : true,
      navigationText: ["<img src='images/arrow-left.svg'> ","<img src='images/arrow-right.svg'>"],
      slideSpeed : 300,
      paginationSpeed : 400,
      pagination : false,
      paginationNumbers:  false,
      singleItem : true,
      autoPlay:true,
 	    loop:true

  });




  //$('#sandbox-container div').datepicker({

  //});




  $("#GallerySlider").owlCarousel({


      navigation: true, // Show next and prev buttons
      navigationText: ["<img src='images/arrow-left-gray.svg'> <span class='slider-text'>Previous Thumbnail</spnan>","<span class='slider-text'>Next Thumbnail</spann> <img src='images/arrow-right-gray.svg'>"],
      autoPlay: 3000,
      slideSpeed : 100,
      paginationSpeed : 200,
      items : 4,
      itemsDesktop : [1199,4],
      itemsDesktopSmall : [980,3],
      itemsTablet: [768,2],
      itemsMobile : [479,1],
      paginationNumbers:  true,
      loop:true,
      margin:60,


  });





  $("#rooms").owlCarousel({

      navigation : true, // Show next and prev buttons
      navigationText: ["<img src='images/arrow-left-gray.svg'> ","<img src='images/arrow-right-gray.svg'>"],
      autoPlay: false,
      slideSpeed : 100,
      paginationSpeed : 200,
      paginationNumbers:  true,
      singleItem : true,
      loop:true,
      URLhashListener:true

  });

  $('a.readon').click(function(){
    var owlid = $(this).attr('data-id');
    $('.contTabs li:last').tab('show');
    var owl = $('#rooms').data('owlCarousel');
    owl.goTo(owlid);

  });

 //Show Hide Aminites

    $('.nav-toggle').click(function(){
      //get collapse content selector
      var collapse_content_selector = $(this).attr('href');
      //make the collapse content to be shown or hide
      var toggle_switch = $(this);
      $(collapse_content_selector).toggle(function(){
        if($(this).css('display')=='none'){
        //change the button label to be 'Show'
        toggle_switch.html('View More');
        }else{
        //change the button label to be 'Hide'
        toggle_switch.html('Close');
        }
      });
    });

    $('.btn-number').click(function(e){
           e.preventDefault();

           var fieldName = $(this).attr('data-field');
           var type      = $(this).attr('data-type');
           var input = $("input[name='"+fieldName+"']");
           var currentVal = parseInt(input.val());
           if (!isNaN(currentVal)) {
               if(type == 'minus') {
                   var minValue = parseInt(input.attr('min'));
                   if(!minValue) minValue = 1;
                   if(currentVal > minValue) {
                       input.val(currentVal - 1).change();
                   }
                   if(parseInt(input.val()) == minValue) {
                       $(this).attr('disabled', true);
                   }

               } else if(type == 'plus') {
                   var maxValue = parseInt(input.attr('max'));
                   if(!maxValue) maxValue = 999;
                   if(currentVal < maxValue) {
                       input.val(currentVal + 1).change();
                   }
                   if(parseInt(input.val()) == maxValue) {
                       $(this).attr('disabled', true);
                   }

               }
           } else {
               input.val(0);
           }
       });
       $('.input-number').focusin(function(){
          $(this).data('oldValue', $(this).val());
       });
       $('.input-number').change(function() {

           var minValue =  parseInt($(this).attr('min'));
           var maxValue =  parseInt($(this).attr('max'));
           if(!minValue) minValue = 1;
           if(!maxValue) maxValue = 999;
           var valueCurrent = parseInt($(this).val());

           var name = $(this).attr('name');
           if(valueCurrent >= minValue) {
               $(".btn-number[data-type='minus'][data-field='"+name+"']").removeAttr('disabled')
           } else {
               alert('Sorry, the minimum value was reached');
               $(this).val($(this).data('oldValue'));
           }
           if(valueCurrent <= maxValue) {
               $(".btn-number[data-type='plus'][data-field='"+name+"']").removeAttr('disabled')
           } else {
               alert('Sorry, the maximum value was reached');
               $(this).val($(this).data('oldValue'));
           }


       });
       $(".input-number").keydown(function (e) {
               // Allow: backspace, delete, tab, escape, enter and .
               if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 190]) !== -1 ||
                    // Allow: Ctrl+A
                   (e.keyCode == 65 && e.ctrlKey === true) ||
                    // Allow: home, end, left, right
                   (e.keyCode >= 35 && e.keyCode <= 39)) {
                        // let it happen, don't do anything
                        return;
               }
               // Ensure that it is a number and stop the keypress
               if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
                   e.preventDefault();
               }
       });



       ///date picker

       $(".datepicker").datepicker({
   			minDate: 0,
   			numberOfMonths: [12,1],
   			beforeShowDay: function(date) {
   				var date1 = $.datepicker.parseDate($.datepicker._defaults.dateFormat, $("#input1").val());
   				var date2 = $.datepicker.parseDate($.datepicker._defaults.dateFormat, $("#input2").val());
   				return [true, date1 && ((date.getTime() == date1.getTime()) || (date2 && date >= date1 && date <= date2)) ? "dp-highlight" : ""];
   			},
   			onSelect: function(dateText, inst) {
   				var date1 = $.datepicker.parseDate($.datepicker._defaults.dateFormat, $("#input1").val());
   				var date2 = $.datepicker.parseDate($.datepicker._defaults.dateFormat, $("#input2").val());
           var selectedDate = $.datepicker.parseDate($.datepicker._defaults.dateFormat, dateText, "DD, d MM, yy");
           $('.booking-widget_buttons').hide();
           $('.booking-widget_buttons-active').show();

           $('.booking-widget_flexible-dates').hide();
           $('.booking-widget_flexible-dates-active').show();


                   if (!date1 || date2) {
   					$("#input1").val(dateText);
   					$("#input2").val("");
                       $(this).datepicker();
                   } else if( selectedDate < date1 ) {
                       $("#input2").val( $("#input1").val() );
                       $("#input1").val( dateText );
                       $(this).datepicker();

                   } else {
   					$("#input2").val(dateText);
                       $(this).datepicker();

   				}

   			}
   		});


/*** Start -- Api Call to fetch the available rooms ***/
        $(".booking-widget_select_rooms_button").on("click",function()  {
        
          var numAdults = $("#numAdults").val();
          var numChilds = $("#numChild").val();
          var arrivalDate = $("#input1").val();
          var dispatchDate = $("#input2").val();
          var roomsWidget= '';
          var formattedArrDate = dateFormat(new Date(arrivalDate), "ddd, mmm d");
          var formattedDispDate = dateFormat(new Date(dispatchDate), "ddd, mmm d");
          $("#dateRange").html(formattedArrDate+" - "+formattedDispDate);
          $("#availableRoomsDiv").html('');
          $.ajax({
                    url: "https://qapi.reztrip.com/eansearch?eanHotelId=106347&arrivalDate="+arrivalDate+"&departureDate="+dispatchDate+"&numberOfAdults="+numAdults+'&numberOfChildren='+numChilds,
                    type: 'GET',
                    dataType: 'json',
                    headers: {
                        'x-api-key': 'too0nxJhq43nESW5cWdH13ZB2ZIsEuG1EXcpZeL1'
                    },
                    contentType: 'application/json; charset=utf-8',
                    /*beforeSend: function(){
                    $('.loader').show();
                    },*/
                    success: function (roomsResponse) {

                      //Fetch all the dynamic parameters from response
                      var hotelRoomAvailability = roomsResponse.HotelRoomAvailabilityResponse;

                        if(parseInt(hotelRoomAvailability['@size']) > 0 )
                        {
                            var roomsArr = roomsResponse.HotelRoomAvailabilityResponse.HotelRoomResponse;
                            var countRooms = roomsArr.length;

                            $(".roomcount").html(countRooms);
                            var roomsWidget= '';
                           if(countRooms > 0)
                           {
                              $.each(roomsArr, function(name, roomObj) {
                                //Fetch all the dynamic parameters from response
                                var roomSrc = '../images/booking-pics/Select_room-1.png';
                                var roomImg = '<img src="'+roomSrc+'" alt=""/>';

                                var roomName = roomObj.roomTypeDescription.split(',');
                                var totalPrice = roomObj.RateInfos.RateInfo.ChargeableRateInfo['@total'];
                                var nightPrice = roomObj.RateInfos.RateInfo.ChargeableRateInfo['@nightlyRateTotal'];
                                var surcharges = roomObj.RateInfos.RateInfo.ChargeableRateInfo['@surchargeTotal'];
                                var roomTypeId = roomObj.roomTypeCode;

                                var roomName_1Hid = '<input type="hidden" id="'+roomTypeId+'_roomname1" value="'+roomName[0]+'"/>';
                                var roomName_2Hid = '<input type="hidden" id="'+roomTypeId+'_roomname2" value="'+roomName[1]+'"/>';
                                var totalPriceHid = '<input type="hidden" id="'+roomTypeId+'_totalprice" value="'+totalPrice+'"/>';
                                var nightPriceHid = '<input type="hidden" id="'+roomTypeId+'_nightprice" value="'+nightPrice+'"/>';
                                var taxfeesHid = '<input type="hidden" id="'+roomTypeId+'_taxfees" value="'+surcharges+'"/>';

                                //Create Rooms Widgets
                                 roomsWidget += '<div class="bookin-widget_avalible-rooms"><div class="bookin-widget_avalible-room-details" data-roomTypeId="'+roomTypeId+'"><a href="javascript:void(0);">'+roomImg+'<div class="room-name_price"><div class="pull-left room-name">'+$.trim(roomName[0])+' <span class="lightfont">with</span><br>'+$.trim(roomName[1])+'</div><div class="pull-right room-price">$'+totalPrice+'<br><span class="regular-price"><span class="lightfont-dash">$'+nightPrice+'</span>/night</span></div></a></div></div>'+roomName_1Hid+roomName_2Hid+totalPriceHid+nightPriceHid+taxfeesHid+'</div>';

                              });

                              //Append the Room Widgets to the main widget
                                $("#availableRoomsDiv").html(roomsWidget);

                            } //end if
                      }else{
                          $("#availableRoomsDiv").html('No Rooms Available');
                      }
                    },
                    error: function (error) {

                    }/*,
                    complete: function(){
                      $('.loader').hide();
                    },*/
                });
        });
/*** End -- Api Call to fetch the available rooms ***/

});
