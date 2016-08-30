var stories = require('./models/stories.js')

exports.getStories = function(req, res){
	stories.find({}, function(err, items){
		res.json(items);
	});
};

/* Create Some Faux Data */

exports.createPirate = function(req, res){

	var data = 	new stories({
								title: "Brethren of the Coast",
								story: "Heave down yardarm jury mast schooner plunder bilged on her anchor gally Jack Ketch scuttle red ensign. Jolly Roger hands Chain Shot league hempen halter killick smartly warp sloop long clothes. Shrouds Letter of Marque piracy transom take a caulk crack Jennys tea cup spirits sheet bilge gangway. Brig black jack swing the lead pillage hail-shot careen Brethren of the Coast grog blossom Spanish Main nipperkin. Nelsons folly lad lee matey Sink me run a shot across the bow jack poop deck mizzenmast gaff. Nipperkin draught code of conduct me capstan yawl crack Jennys tea cup salmagundi boom gabion. Warp hail-shot hempen halter lugsail parrel overhaul fathom tack boom square-rigged. Aye measured fer yer chains barque holystone jury mast gangplank mizzen deadlights Brethren of the Coast Arr. Lateen sail sheet scourge of the seven seas plunder Shiver me timbers broadside spyglass case shot brigantine measured fer yer chains."
							})
			
	data.save(function(err, data){
		if(err){
			console.log("There was an ERROR: " + err);
			return;
		}

		res.json(data);

	});
}

exports.createIT = function(req, res){

	var data = 	new stories({
								title: "The IT Crowd",
								story: "Hello? I've had a bit of a tumble.They just toss us away like yesterday's jam.Yeah, you do know how a button works don't you? No, not on clothes.It's my term for my time of the month. Oh. What time of the month? The weekend?I am a man, he's a man, we're men! Ok, tell me how your feeling. I feel delicate... and annoyed, and... I think I'm ugly.Hello, IT. Have you tried forcing an unexpected reboot? A gay musical, called Gay. That's quite gay. Gay musical? Aren't all musicals gay? This must be, like, the gayest musical ever.He's had quite an evening. Someone stole his wheelchair. Did you see who it was? Red bearded man.Oh really? Then why don't you come down and make me then.Hello, IT. Have you tried turning it off and on again?A gay musical, called Gay. That's quite gay. Gay musical? Aren't all musicals gay? This must be, like, the gayest musical ever.0115... no... 0118... no... 0118 999 ... 3. Hello? Is this the emergency services? Then which country am I speaking to? Hello? Hello?"
							})
			
	data.save(function(err, data){
		if(err){
			console.log("There was an ERROR: " + err);
			return;
		}

		res.json(data);

	});
}
