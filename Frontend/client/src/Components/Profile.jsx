import { useState, useEffect } from "react";
import axios from "axios";

function Profile({ user, setUser }) {
  const [profile, setProfile] = useState({ name: "", email: "", profilePhoto: "" });
  const [file, setFile] = useState(null);
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(true);

  const API_URL = "http://localhost:5000/api/users/profile";

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(API_URL, {
          headers: { Authorization: `Bearer ${user.token}` }
        });
        setProfile(response.data.data);
      } catch (error) {
        alert("Error fetching profile");
      } finally {
        setLoading(false);
      }
    };
    if (user && user.token) {
        fetchProfile();
    }
  }, [user]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", profile.name);
    formData.append("email", profile.email);
    if (password) formData.append("password", password);
    if (file) formData.append("profilePhoto", file);

    try {
      const response = await axios.put(API_URL, formData, {
        headers: { 
          Authorization: `Bearer ${user.token}`,
          "Content-Type": "multipart/form-data"
        }
      });
      alert(response.data.message);
      
      const updatedUser = { ...user, ...response.data.data };
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser)); // update local storage
      setProfile(response.data.data);
      setPassword("");
    } catch (error) {
      alert(error.response?.data?.message || "Error updating profile");
    }
  };

  if (loading) return <div className="text-center mt-5">Loading profile...</div>;

  return (
    <div className="container py-5">
      <div className="card shadow border-0 mx-auto" style={{ maxWidth: "500px" }}>
        <div className="card-body p-4 text-center">
          <h2 className="mb-4">My Profile</h2>
          
          <div className="mb-4">
            <img 
              src={profile.profilePhoto?.startsWith('http') ? profile.profilePhoto : `http://localhost:5000${profile.profilePhoto}`} 
              alt="Profile" 
              className="rounded-circle shadow-sm" 
              style={{ width: "150px", height: "150px", objectFit: "cover" }} 
              onError={(e) => { e.target.onerror = null; e.target.src = "https://via.placeholder.com/150"; }}
            />
          </div>

          <form onSubmit={handleUpdate} className="text-start">
            <div className="mb-3">
              <label className="form-label fw-bold">Name</label>
              <input type="text" className="form-control" value={profile.name} onChange={e => setProfile({...profile, name: e.target.value})} required />
            </div>

            <div className="mb-3">
              <label className="form-label fw-bold">Email</label>
              <input type="email" className="form-control" value={profile.email} onChange={e => setProfile({...profile, email: e.target.value})} required />
            </div>

            <div className="mb-3">
              <label className="form-label fw-bold">New Password (optional)</label>
              <input type="password" className="form-control" placeholder="Leave blank to keep current" value={password} onChange={e => setPassword(e.target.value)} />
            </div>

            <div className="mb-4">
              <label className="form-label fw-bold">Update Profile Photo</label>
              <input type="file" className="form-control" onChange={e => setFile(e.target.files[0])} accept="image/*" />
            </div>

            <button type="submit" className="btn btn-primary w-100">Update Profile</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Profile;
