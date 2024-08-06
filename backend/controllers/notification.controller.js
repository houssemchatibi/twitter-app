import Notification from "../models/notification.model.js";

export const getNotifications = async (req, res) => {

    try {
        const userId = req.user.id;

        const notification = await Notification.find({ to: userId })
            .populate({
                path: 'from',
                select: "username profileImg",
            });

        await Notification.updateMany({ to: userId }, { read: true });

        res.status(200).json(notification);
    } catch (error) {
        console.log("Error in getNotifications function", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export const deleteNotifications = async (req, res) => {
	try {
		const userId = req.user._id;

		await Notification.deleteMany({ to: userId });

		res.status(200).json({ message: "Notifications deleted successfully" });
	} catch (error) {
		console.log("Error in deleteNotifications function", error.message);
		res.status(500).json({ error: "Internal Server Error" });
	}
};

export const readAllNotifications= async (req, res) => {
    try {
        const userId = req.user._id; // Ensure that `req.user` is populated with the authenticated user's ID

        // Mark all unread notifications for the current user as read
        await Notification.updateMany(
            { to: userId, read: false },
            { $set: { read: true } }
        );

        res.status(200).json({ message: 'All notifications marked as read successfully' });
    } catch (error) {
        console.log("Error marking all notifications as read: ", error);
        res.status(500).json({ error: 'Internal server error' });
    }
};