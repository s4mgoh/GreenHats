import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function Landing({ handleLogout, supabase, user }) {
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
            const { data, error } = await supabase.from("activities").select("*");
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
        console.log(user);
        if (!newActivity.name.trim()) {
            alert("Please enter an activity name.");
            return;
        }

        try {
            if (!user) {
                alert("User is not authenticated properly. Cannot add activity.");
                return;
            }

            const { error: insertError } = await supabase.from("activities").insert([
                {
                    activity_type: newActivity.name.trim(),
                    datetime: newActivity.datetime,
                    location: newActivity.location,
                    interested_users: [user.user_metadata.telegram_handle], // Use user prop for telegram_handle
                },
            ]);

            if (insertError) {
                console.error("Error inserting activity:", insertError);
                alert(insertError.message);
                return;
            }

            setNewActivity({ name: "", datetime: new Date(), location: "" });
            setIsAddingActivity(false);
            fetchActivities();
            alert("Activity added successfully!");
        } catch (err) {
            console.error("Error adding activity:", err);
            alert("An unexpected error occurred while adding the activity.");
        }
    };

    const handleInterest = async (activity) => {
        console.log(user);
        try {
            if (!user) {
                alert("User is not authenticated properly. Cannot update interest.");
                return;
            }

            const interestedUsers = activity.interested_users || [];

            const updatedInterestedUsers = interestedUsers.includes(user.user_metadata.telegram_handle)
                ? interestedUsers.filter((handle) => handle !== user.user_metadata.telegram_handle)
                : [...interestedUsers, user.user_metadata.telegram_handle];

            const { error: updateError } = await supabase
                .from("activities")
                .update({ interested_users: updatedInterestedUsers })
                .eq("id", activity.id);

            if (updateError) {
                console.error("Error updating interest:", updateError);
                alert(updateError.message);
                return;
            }

            fetchActivities();
        } catch (error) {
            console.error("Error in handleInterest:", error);
            alert("An error occurred while updating interest.");
        }
    };

    return (
        <div>
            {user ? (
                <>
                    <h1>Welcome, {user.user_metadata.username}!</h1>
                    <p>You are now logged in.</p>
                    <button onClick={handleLogout}>Logout</button>
                </>
            ) : (
                <p>Loading user data...</p>
            )}

            <h2>Available Activities:</h2>
            {activities.length === 0 ? (
                <p>No activities yet. Add some below!</p>
            ) : (
                <ul>
                    {activities.map((activity) => (
                        <li
                            key={activity.id}
                            style={{ cursor: "pointer", border: "1px solid gray", padding: "10px", margin: "5px","list-style": "none" }}
                        >
                            <h3>{activity.activity_type}</h3>
                            <p>Location: {activity.location}</p>
                            <p>Date & Time: {new Date(activity.datetime).toLocaleString()}</p>
                            <p>Interested Users: {activity.interested_users?.join(", ") || "No one yet"}</p>

                            <button onClick={() => handleInterest(activity)}>
                                {activity.interested_users?.includes(user.user_metadata.telegram_handle)
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
                    className="date-picker"
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
