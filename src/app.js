/**
 * Welcome to Pebble.js!
 *
 * This is where you write your app.
 */

var UI = require('ui');
var Vector2 = require('vector2');
require('./firebase');  
//Firebase.INTERNAL.forceWebSockets();
var ref = new Firebase('https://torrid-fire-7768.firebaseio.com/');
var keyID;


function showMenu() {
  // We create a simple menu with a few options
  var menu1 = new UI.Menu({
    sections: [{
      items: [{
        title: 'Study', 
      },
      {
        title: 'Make friends',
        
      },
      {
        title: 'Exercise',
      
      }]
    }]
  });
  
  var menu2 = new UI.Menu({
    sections: [{
      items: [{
        title: 'Science', 
      },
      {
        title: 'Math',
        
      },
      {
        title: 'Social Science',
      
      },
               {
        title: 'IT',
        
      },
              {
        title: 'English',
        
      }
             ]
    }]
  });

function locationError(err) {
  console.log('location error (' + err.code + '): ' + err.message);
}

function locationSuccess(pos, className) {
  console.log('lat= ' + pos.coords.latitude + ' lon= ' + pos.coords.longitude);
  var lat = pos.coords.latitude;
  var lon = pos.coords.longitude; 
  var newRefInstance = ref.push();
  keyID = newRefInstance.key(); 
  console.log(keyID);
  newRefInstance.set({lat:lat, lng:lon, class:className}); 
}

  // When the user selects an option...
  menu1.on('select', function(e) {
    if (e.item.title == 'Study') {
      menu2.show();
      menu2.on('select',function(f){
      
         var loadingCard = new UI.Card({
      title:'Study With',
      body:'Searching nearby...'
    });
    
    var locationOptions = {
       enableHighAccuracy: true, 
       maximumAge: 10000, 
       timeout: 10000
    };
      
    loadingCard.show(); 
    navigator.geolocation.getCurrentPosition(function (pos) {
      loadingCard.body('Take a walk :)');
      locationSuccess (pos, Pebble.getWatchToken());
        locationSuccess (pos, f.item.title);
      }, locationError, locationOptions);
      
      
    });
      
    } else {
      
 
    }
     
  });
   
  // Finally make sure the menu is set to show.
  menu1.show();
}


showMenu(); 

  





