var express = require("express");
var path = require("path");
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/google_maps_db');

var app = express();


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, './public/dist')));

var UserSchema = new mongoose.Schema({
    email: {type: String},
    username: {type: String},
    password: {type: String},
    confirm_password: {type: String},
    _locations: [{type: Schema.Types.ObjectId, ref:'Location'}],
    day_count: {type: Number, default: 0},
    money_count: {type: Number, default: 0},
    trip_name: [{type: String}]
})



var LocationSchema = new mongoose.Schema({
	location_name: {type: String},
    longitude: {type: Number},
    latitude: {type: Number},
	content: {type: String},
	img_url: [{type: String}],
    username: {type: String},
    _user: {type: Schema.Types.ObjectId, ref:'User'},
    icon_url: {type: String},
    price: {type: Number},
    images: [{type: String}],
    day_number: {type: Number},
    trip_location: {type: String}
}, {timestamps: true});


mongoose.model('Location', LocationSchema);
var Location = mongoose.model('Location');

mongoose.model('User', UserSchema);
var User = mongoose.model('User');

app.post('/add_user', function(req, res){
    //console.log(req.body)

	User.findOne({email: req.body.email}, function(err, result){
		if(err){
			//console.log("there was an error when finding in server.js")
		}
		else{
            //console.log("the result is()()()()(): ", result)
			if (result == null){
				//console.log("there was a null! ... that means we have to add a user!")

				var user = new User(req.body);

				user.save(function(err){
					if(err){
						console.log("There was an error posting to the DB in the server.js!")
					}else{
						//console.log(user);
						return res.json(user);
					}
				})
			}
			else{
				// console.log("there was not a null! ... we already have this user", result._id)
				return res.json(false);
			}	
		}
	})	
})

app.post('/log_in', function(req, res){
    //console.log("!!!!!!!!!!!!!!!!!!!!!!!", req.body)
    User.findOne({email: req.body.email}, function(err, result){
        if(err){
            console.log(" there was an error when logging in....", err)
        }else{
            if (result == null){
                //console.log("there was a NULL when logging in, that means that there was never an account in the DB .....", result)
                return res.json(result);
            }
            else{
                console.log("there was not a null, you have registered before!, returning object: ", result)
                return res.json(result);
            }
        }
    })
})

//creating a new marker location you must also update the users locations array
app.post('/add_marker', function(req, res){
    // console.log("****************** ", req.body)
    User.findOne({_id: req.body._user}, function(err, user){
        var location = new Location(req.body);
        user._locations.push(location);
        location.save(function(err){{
            user.save(function(err){
                if(err){console.log("sadly this did not work")}
                else { res.json(location)}
            })
        }})
    })
})



app.post('/load_locations', function(req, res){
    // console.log("is this the empty dict?: ", req.body);

    User.findOne({_id: req.body.user_id})
        .populate('_locations')
        .exec(function(err, result){
            //console.log("the object should be here: %%%% ", result)
            return res.json(result);
        })
})

app.post('/load_locations_remix', function(req, res){
    // console.log("is this the empty dict?: ", req.body);

    User.findOne({_id: req.body.user_id})
        .populate('_locations')
        .exec(function(err, result){
            //console.log("the object should be here: %%%% ", result)
            return res.json(result);
        })
})



app.post('/remove_marker', function(req, res){
    //console.log("in the server.js on remove_marker info: ", req.body)

    Location.remove({_id: req.body._id}, function(err, result){

        // User.findOne({_id: req.body._user}).populate('_locations').exec(function(err, result){return res.json(true)})
        if(err){console.log("there was an error")}
        else{res.json(true);}
    })

})
// db.students.update({name: "Kobe"},{$pull: {interests: "taxes"}})
// User.update({_id: req.body._user}, {$pull: {_locations: }})
// return res.json(result)}

app.post('/update_user_locations', function(req, res){
    User.update({_id: req.body._user}, {$pull: {_locations: req.body._id}}, function(err, result){
        if(err){console.log("there was an error when pulling the location from the user")}
        else{res.json(result)}
    })
})

app.post('/update_marker', function(req, res){
    Location.update({_id: req.body._id},{$set: {"content":req.body.content,
                                                "location_name":req.body.location_name,
                                                "price": req.body.price,
                                                "img_url":req.body.img_url,
                                                "day_number":req.body.day_number,
                                                "images":req.body.images,
                                                "trip_location":req.body.trip_location}}, function(err, result){
        if(err){console.log("there was an error when updating")}
        else{res.json(result);}
    })
})

app.post('/update_users_money_day', function(req, res){
    User.update({_id: req.body.user_id}, {$set: {"day_count": req.body.day_count, "money_count": req.body.money_count, "trip_name":req.body.trip_name}}, function(err, result){
        if(err){console.log("there was something wrong when updating the users money and day count")}
        else{res.json(true);}
    })
})


app.get('/load_trips', function(req, res){
	User.find({}, function(err, result){
		if(err){
			console.log("there was an error when trying to get data in the server.js");
		}else{
            console.log("in the server.js loading trips: ", result);
			return res.json(result);
		}
	})

})



app.listen(8000, function() {
    console.log("listening on port 8000");
})