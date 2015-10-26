# PalFinder 

This project was submitted to HackingEDU 2015 (http://devpost.com/software/pal-finder)

It is a standalone pebble app built using javascript on pebblecloud. If you import the project, you will see a couple of errors saying Firebase is not defined which is completely fine. The app will run.

The data is stored in Firebase. The format of the data can be found by looking at:
     var updatedObj = {lat:lat, lng:lon, topic:topic, timestamp:Firebase.ServerValue.TIMESTAMP};
     updatedObj[watch_key] = true;
    ref.child(watch_key).update(updatedObj);
    
We also use the google maps API and a website to show the positions of the watches. 


