const tmi = require('tmi.js');
const fs = require('fs');
const player = require('play-sound')(opts = {player: 'cmdmp3'})
const client = new tmi.Client({
	options: { debug: true },
	connection: {
		reconnect: true,
		secure: true
	},
	identity: {
		username: 'tsuuuuki_',
		password: 'oauth:token'
	},
	channels: [ 'tsuuuuki_' ]
});
client.connect().catch(console.error);
let sounds = fs.readdirSync('./audio').filter(f=>f.includes('.mp3')).map(f=>f.split('.')[0])

client.on('message', (channel, tags, message, self) => {
	if(message.toLowerCase().startsWith('!')) {
		let cmd = message.toLowerCase().split('!')[1].split(' ')[0];
		if(sounds.indexOf(cmd) !== -1) {
			player.play('./audio/' + cmd + '.mp3')
		} else if(cmd === 'rs') {
			sounds = fs.readdirSync('./audio').filter(f=>f.includes('.mp3')).map(f=>f.split('.')[0])
			console.log(sounds.map(sound => '!' + sound))
			client.say(channel, sounds.map(sound => '!' + sound).join(', '));
		}
	}
    
});