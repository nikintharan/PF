/**
 * Welcome to Pebble.js!
 *
 * This is where you write your app.
 */
var Vibe = require('ui/vibe');

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
var lat0,lng0;

  function locationError(err) {
  console.log('location error (' + err.code + '): ' + err.message);
}

function locationSuccess(pos, topic) {
  console.log('Location changed!');
  console.log('lat= ' + pos.coords.latitude + ' lon= ' + pos.coords.longitude);
  var lat = pos.coords.latitude;
  var lon = pos.coords.longitude;
  lat0=lat;
  lng0=lon;
  var newRefInstance = ref.push();
  keyID = newRefInstance.key(); 
  console.log(keyID);
  var watch_key= Pebble.getWatchToken(); 
var updatedObj = {lat:lat, lng:lon, topic:topic, timestamp:Firebase.ServerValue.TIMESTAMP};
updatedObj[watch_key] = true;
ref.child(watch_key).update(updatedObj);
      newRefInstance.update(); 
}

  // When the user selects an option...
  menu1.on('select', function(e) {
    if (e.item.title == 'Study') {
      menu2.show();
      menu2.on('select',function(f){
      
         var loadingCard = new UI.Card({
      title:'Study',
      body:'Searching for Pals near you...'
    });
            loadingCard.show(); 
        
var locationOptions = {
  enableHighAccuracy: true, 
  maximumAge: 10000, 
  timeout: 10000
};

     var ref2 = new Firebase("https://torrid-fire-7768.firebaseio.com/");

    // Get location updates
    navigator.geolocation.watchPosition(function (pos) {
          loadingCard.body('Take a walk :)');
         locationSuccess (pos,f.item.title);
    }, locationError, locationOptions);
        
ref2.on('child_changed', function(Snapshot) {
        
  var data=Snapshot.val();
   loadingCard.body(data.lat); 
          var lat1 = data.lat;
          var lng1 = data.lng;      
        if((Math.abs(lat0-lat1)>0)&&(Math.abs(lat0-lat1)<0.000005)&&(Math.abs(lng0-lng1)>0)&&(Math.abs(lng0-lng1)<0.000005))
        {
         loadingCard.body('Guess you found someone! Enjoy'); 
Vibe.vibrate('long');
        }
        
          
  });
        
        
    });
      
    } else {
      
 
    }
     
  });
   
  // Finally make sure the menu is set to show.
  menu1.show();
}

showMenu(); 

  





