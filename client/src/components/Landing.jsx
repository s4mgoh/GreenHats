import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function Landing({ user, handleLogout, supabase }) {
    const [activities, setActivities] = useState([]);
    const [newActivity, setNewActivity] = useState({
        name: "",
        datetime: new Date(),
        location: "",
    });
    const [isAddingActivity, setIsAddingActivity] = useState(false);

    useEffect(() => {
        fetchActivities();
    }, []);

    const fetchActivities = async () => {
        try {
            const { data, error } = await supabase
                .from("activities")
                .select("*");

            if (error) {
                console.error("Error fetching activities:", error);
                alert(error.message);
            } else {
                setActivities(data || []);
            }
        } catch (err) {
            console.error("Error fetching activities:", err);
            alert("An unexpected error occurred while fetching activities.");
        }
    };

    const handleAddActivity = async () => {
        if (newActivity.name.trim() !== "") {
            try {
                const { data: userDetails, error: userError } = await supabase
                    .from("auth.users")
                    .select("user_metadata")
                    .eq("id", user.id)
                    .single();

                if (userError) {
                    console.error("Error fetching user details:", userError);
                    alert("Error fetching user details. Cannot add activity.");
                    return;
                }

                const telegramHandle = userDetails?.user_metadata?.telegram_handle;

                if (!telegramHandle) {
                    console.error("Telegram handle not found for user:", user.id);
                    alert("Telegram handle not found. Cannot add activity.");
                    return;
                }

                const { error } = await supabase.from("activities").insert([
                    {
                        activity_type: newActivity.name.trim(),
                        datetime: newActivity.datetime,
                        location: newActivity.location,
                        interested_users: [telegramHandle],
                    },
                ]);

                if (error) {
                    console.error("Error adding activity:", error);
                    alert(error.message);
                } else {
                    setNewActivity({ name: "", datetime: new Date(), location: "" });
                    setIsAddingActivity(false);
                    fetchActivities();
                    alert("Activity added successfully!");
                }
            } catch (err) {
                console.error("Error adding activity:", err);
                alert("An unexpected error occurred while adding the activity.");
            }
        } else {
            alert("Please enter an activity name.");
        }
    };

    const handleInterest = async (activity) => {
        const { data: userDetails, error: userError } = await supabase
            .from("auth.users")
            .select("user_metadata")
            .eq("id", user.id)
            .single();

        if (userError) {
            console.error("Error fetching user details:", userError);
            alert("Error fetching user details. Cannot update interest.");
            return;
        }

        const telegramHandle = userDetails?.user_metadata?.telegram_handle;

        if (!telegramHandle) {
            console.error("Telegram handle not found for user:", user.id);
            alert("Telegram handle not found. Cannot update interest.");
            return;
        }


        const interestedUsers = activity.interested_users || [];

        const updatedInterestedUsers = interestedUsers.includes(telegramHandle)
            ? interestedUsers.filter((user) => user !== telegramHandle)
            : [...interestedUsers, telegramHandle];

        try {
            const { error } = await supabase
                .from("activities")
                .update({ interested_users: updatedInterestedUsers })
                .eq("id", activity.id);

            if (error) {
                console.error("Error updating interest:", error);
                alert(error.message);
            } else {
                fetchActivities();
            }
        } catch (err) {
            console.error("Error updating interest:", err);
            alert("An unexpected error occurred while updating interest.");
        }
    };

    return (
        <div>
            <h1>Welcome, {user.user_metadata?.username || user.email}!</h1>
            <p>You are now logged in.</p>
            <button onClick={handleLogout}>Logout</button>

            <h2>Available Activities:</h2>
            {activities.length === 0 ? (
                <p>No activities yet. Add some below!</p>
            ) : (
                <ul>
                    {activities.map((activity) => (
                        <li
                            key={activity.id}
                            style={{ cursor: "pointer", border: "1px solid gray", padding: "10px", margin: "5px" }}
                        >
                            <h3>{activity.activity_type}</h3>
                            <p>Location: {activity.location}</p>
                            <p>Date & Time: {new Date(activity.datetime).toLocaleString()}</p>
                            <p>Interested Users: {activity.interested_users?.join(", ") || "No one yet"}</p>

                            <button onClick={() => handleInterest(activity)}>
                                {activity.interested_users?.includes(user.user_metadata.telegram_handle) // Use telegram handle for checking
                                    ? "Uninterest"
                                    : "Express Interest"}
                            </button>
                        </li>
                    ))}
                </ul>
            )}

            {!isAddingActivity ? (
                <button onClick={() => setIsAddingActivity(true)}>Add Activity</button>
            ) : (
                <div>
                    <input
                        type="text"
                        value={newActivity.name}
                        onChange={(e) =>
                            setNewActivity({ ...newActivity, name: e.target.value })
                        }
                        placeholder="Enter activity name"
                    />
                    <DatePicker
                        selected={newActivity.datetime}
                        onChange={(date) =>
                            setNewActivity({ ...newActivity, datetime: date })
                        }
                        showTimeSelect
                        dateFormat="Pp"
                    />
                    <input
                        type="text"
                        value={newActivity.location}
                        onChange={(e) =>
                            setNewActivity({ ...newActivity, location: e.target.value })
                        }
                        placeholder="Enter location"
                    />
                    <button onClick={handleAddActivity}>Save Activity</button>
                    <button onClick={() => setIsAddingActivity(false)}>Cancel</button>
                </div>
            )}
        </div>
    );
}

export default Landing;