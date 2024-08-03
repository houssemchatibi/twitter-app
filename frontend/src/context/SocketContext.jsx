import { createContext, useState, useEffect, useContext } from "react";
import io from "socket.io-client";
import { useQuery } from "@tanstack/react-query";

const SocketContext = createContext();

export const useSocketContext = () => {
	return useContext(SocketContext);
};

export const SocketContextProvider = ({ children }) => {
	const [socket, setSocket] = useState(null);
	const [onlineUsers, setOnlineUsers] = useState([]);
	const { data: autUser } = useQuery({ queryKey: ["authUser"] })

	
	useEffect(() => {
		if (autUser) {
			console.log("autUser after context is :",autUser)
			const socket = io("http://localhost:5000", {
				query: {
					userId: autUser._id,
				},
			});

			setSocket(socket);

			// socket.on() is used to listen to the events. can be used both on client and server side
			socket.on("getOnlineUsers", (users) => {
				setOnlineUsers(users);
			});

			return () => socket.close();
		} else {
			if (socket) {
				socket.close();
				setSocket(null);
			}
		}
	}, [autUser]);

	return <SocketContext.Provider value={{ socket,onlineUsers }}>{children}</SocketContext.Provider>;
};