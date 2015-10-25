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
        title: 'English',
        
      },
              {
        title: 'Computer Science',
        
      }
             ]
    }]
  });
var id;

function locationError(err) {
  console.log('location error (' + err.code + '): ' + err.message);
}

function locationSuccess(pos, topic) {
  console.log('Location changed!');
  console.log('lat= ' + pos.coords.latitude + ' lon= ' + pos.coords.longitude);
  var lat = pos.coords.latitude;
  var lon = pos.coords.longitude; 
  var newRefInstance = ref.push();
  keyID = newRefInstance.key(); 
  console.log(keyID);
  var watch_key= Pebble.getWatchToken(); 
  newRefInstance.set({lat:lat, lng:lon, topic:topic, key:watch_key, timestamp:Firebase.ServerValue.TIMESTAMP}); 
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
            loadingCard.show(); 
        
var locationOptions = {
  enableHighAccuracy: false, 
  maximumAge: 100000, 
  timeout: 100
};


    // Get location updates
    navigator.geolocation.watchPosition(function (pos) {
          loadingCard.body('Take a walk :)');
          locationSuccess (pos,f.item.title);
    }, locationError, locationOptions);
        
        
        
    });
      
    } else {
      
 
    }
     
  });
   
  // Finally make sure the menu is set to show.
  menu1.show();
}


showMenu(); 

  





