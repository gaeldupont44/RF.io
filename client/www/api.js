var API = {
	Host: "http://gaeldupont.io",
	Port: 8888,
	Routes: {
		Bridge: "/api/bridge/{id}",
		Bridges: "/api/bridge",
		Check: "/api/check",
		Receiver: "/api/receiver/{id}",
		ReceiverOff: "/api/receiver/{id}/off",
		ReceiverOn: "/api/receiver/{id}/on",
		Receivers: "/api/receiver",
		Room: "/api/room/{id}",
		RoomByName: "/api/room/name/{name}",
		Rooms: "/api/room"
	}
};