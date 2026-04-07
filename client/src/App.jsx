import { useState } from "react";
import axios from "axios";

function App() {
  const [currentPage, setCurrentPage] = useState("login");

  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);

  const [editId, setEditId] = useState(null);
  const [filteredBooks, setFilteredBooks] = useState(null);

  // ✅ USERS
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState(null);
  const [editUserId, setEditUserId] = useState(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [image, setImage] = useState("");
  const [desc, setDesc] = useState("");

  // ---------------- AUTH ----------------

  const signup = async () => {
    const res = await axios.post("http://localhost:3000/api/signup", {
      name,
      email,
      password,
    });
    alert(res.data.message);
    setCurrentPage("login");
  };

  const login = async () => {
    const res = await axios.post(
      "http://localhost:3000/api/login",
      { email: loginEmail, password: loginPassword },
      { withCredentials: true }
    );

    alert(res.data.message);
    setCurrentPage("dashboard");
    getBooks();
  };

  const logout = async () => {
    await axios.post(
      "http://localhost:3000/api/logout",
      {},
      { withCredentials: true }
    );
    setCurrentPage("login");
  };

  // ---------------- BOOKS ----------------

  const getBooks = async () => {
    const res = await axios.get("http://localhost:3000/api/books", {
      withCredentials: true,
    });
    setBooks(res.data);
  };

  const addBook = async () => {
    if (editId) {
      await axios.put(
        `http://localhost:3000/api/books/${editId}`,
        {
          title,
          author,
          price,
          stock,
          image_url: image,
          description: desc,
        },
        { withCredentials: true }
      );
      setEditId(null);
      setFilteredBooks(null);
    } else {
      await axios.post(
        "http://localhost:3000/api/books",
        {
          title,
          author,
          price,
          stock,
          image_url: image,
          description: desc,
        },
        { withCredentials: true }
      );
    }

    setTitle("");
    setAuthor("");
    setPrice("");
    setStock("");
    setImage("");
    setDesc("");

    getBooks();
  };

  const deleteBook = async (id) => {
    await axios.delete(`http://localhost:3000/api/books/${id}`, {
      withCredentials: true,
    });
    getBooks();
  };

  // ---------------- USERS ----------------

  const getUsers = async () => {
    const res = await axios.get("http://localhost:3000/api/users", {
      withCredentials: true,
    });
    setUsers(res.data);
  };

  const deleteUser = async (id) => {
    await axios.delete(`http://localhost:3000/api/users/${id}`, {
      withCredentials: true,
    });
    getUsers();
  };

  const updateUser = async () => {
    await axios.put(
      `http://localhost:3000/api/users/${editUserId}`,
      { name, email },
      { withCredentials: true }
    );

    setEditUserId(null);
    setFilteredUsers(null);
    setName("");
    setEmail("");

    getUsers();
  };

  // ---------------- USERS PAGE ----------------

  if (currentPage === "users") {
    return (
      <div style={styles.container}>
        <h1>Users</h1>

        <button onClick={() => setCurrentPage("dashboard")} style={styles.button}>
          Back
        </button>

        {editUserId && filteredUsers ? (
  <div>
    <input value={name} onChange={(e) => setName(e.target.value)} style={styles.input}/>
    <input value={email} onChange={(e) => setEmail(e.target.value)} style={styles.input}/>

    <button onClick={updateUser} style={styles.button}>
      Update User
    </button>
  </div>
) : (
          <div style={styles.grid}>
            {users.map((u) => (
              <div key={u.id} style={styles.card}>
                <h3>{u.name}</h3>
                <p>{u.email}</p>

                <button onClick={() => deleteUser(u.id)} style={styles.actionBtn}>
                  Delete
                </button>

                <button
                  onClick={() => {
                    setEditUserId(u.id);
                    setFilteredUsers([u]);
                    setName(u.name);
                    setEmail(u.email);
                  }}
                  style={styles.actionBtn}
                >
                  Update
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  // ---------------- LOGIN ----------------

  if (currentPage === "login") {
    return (
      <div style={styles.centerContainer}>
        <div style={styles.box}>
          <h1>Login</h1>

          <input placeholder="Email" onChange={(e) => setLoginEmail(e.target.value)} style={styles.input}/>
          <input type="password" placeholder="Password" onChange={(e) => setLoginPassword(e.target.value)} style={styles.input}/>

          <button onClick={login} style={styles.button}>Login</button>

          <p
  style={styles.link}
  onClick={() => setCurrentPage("signup")}
  onMouseOver={(e) => {
    e.target.style.background = "#e8f5e9";
  }}
  onMouseOut={(e) => {
    e.target.style.background = "transparent";
  }}
>
  Signup
</p>
        </div>
      </div>
    );
  }

  // ---------------- SIGNUP ----------------

  if (currentPage === "signup") {
    return (
      <div style={styles.centerContainer}>
        <div style={styles.box}>
          <h1>Signup</h1>

          <input placeholder="Name" onChange={(e) => setName(e.target.value)} style={styles.input}/>
          <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} style={styles.input}/>
          <input type="password" onChange={(e) => setPassword(e.target.value)} style={styles.input}/>

          <button onClick={signup} style={styles.button}>Signup</button>

          <p
  style={styles.link}
  onClick={() => setCurrentPage("login")}
  onMouseOver={(e) => {
    e.target.style.background = "#e8f5e9";
  }}
  onMouseOut={(e) => {
    e.target.style.background = "transparent";
  }}
>
  Login
</p>
        </div>
      </div>
    );
  }

  // ---------------- DASHBOARD ----------------

  if (currentPage === "dashboard") {
    return (
      <div style={styles.container}>
        <h1>Dashboard</h1>

        <div style={styles.dashboard}>
          <div style={styles.dashboardCard}>
            <h2>📚 Books</h2>
            <button onClick={() => { setCurrentPage("books"); getBooks(); }} style={styles.button}>
              Open Books
            </button>
          </div>

          <div style={styles.dashboardCard}>
            <h2>👤 Users</h2>
            <button onClick={() => { setCurrentPage("users"); getUsers(); }} style={styles.button}>
              Open Users
            </button>
          </div>
        </div>

      <button
  onClick={logout}
  style={styles.logout}
  onMouseOver={(e) => (e.target.style.transform = "scale(1.05)")}
  onMouseOut={(e) => (e.target.style.transform = "scale(1)")}
>
          Logout
        </button>
      </div>
    );
  }

  // ---------------- BOOK VIEW ----------------

  if (selectedBook) {
    return (
      <div style={styles.container}>
        <img src={selectedBook.image_url} style={{ width: "250px" }} />
        <h2>{selectedBook.title}</h2>
        <p>{selectedBook.author}</p>
        <p>₹ {selectedBook.price}</p>
        <p>Stock:{selectedBook.stock}</p>
        <p>{selectedBook.description}</p>

        <button onClick={() => setSelectedBook(null)} style={styles.button}>
          Back
        </button>
      </div>
    );
  }

  // ---------------- BOOK PAGE ----------------

  return (
    <div style={styles.container}>
      <h1>📚 Bookstore</h1>

      <button onClick={() => setCurrentPage("dashboard")} style={styles.button}>
        Back
      </button>

      <h2>{editId ? "Update Book" : "Add Book"}</h2>

      {editId && filteredBooks ? (
        <div style={styles.updateWrapper}>
          <div>
            <input value={title} onChange={(e) => setTitle(e.target.value)} style={styles.input}/>
            <input value={author} onChange={(e) => setAuthor(e.target.value)} style={styles.input}/>
            <input value={price} onChange={(e) => setPrice(e.target.value)} style={styles.input}/>
            <input value={stock} onChange={(e) => setStock(e.target.value)} style={styles.input}/>
            <input value={image} onChange={(e) => setImage(e.target.value)} style={styles.input}/>
            <input value={desc} onChange={(e) => setDesc(e.target.value)} style={styles.input}/>

            <button onClick={addBook} style={styles.button}>Update</button>
          </div>

          <div style={styles.card}>
            <img src={filteredBooks[0].image_url} style={styles.image}/>
            <h3>{filteredBooks[0].title}</h3>
          </div>
        </div>
      ) : (
        <>
          <input placeholder="Title" onChange={(e) => setTitle(e.target.value)} style={styles.input}/>
          <input placeholder="Author" onChange={(e) => setAuthor(e.target.value)} style={styles.input}/>
          <input placeholder="Price" onChange={(e) => setPrice(e.target.value)} style={styles.input}/>
          <input placeholder="Stock" onChange={(e) => setStock(e.target.value)} style={styles.input}/>
          <input placeholder="Image URL" onChange={(e) => setImage(e.target.value)} style={styles.input}/>
          <input placeholder="Description" onChange={(e) => setDesc(e.target.value)} style={styles.input}/>

          <button onClick={addBook} style={styles.button}>Add</button>

          <div style={styles.grid}>
            {books.map((b) => (
              <div key={b.id} style={styles.card}>
                <img src={b.image_url} style={styles.image} onClick={() => setSelectedBook(b)} />
                <h3>{b.title}</h3>

                <button onClick={() => deleteBook(b.id)} style={styles.actionBtn}>
                  Delete
                </button>

                <button
                  onClick={() => {
                    setEditId(b.id);
                    setFilteredBooks([b]);

                    setTitle(b.title);
                    setAuthor(b.author);
                    setPrice(b.price);
                    setStock(b.stock);
                    setImage(b.image_url);
                    setDesc(b.description);
                  }}
                  style={styles.actionBtn}
                >
                  Update
                </button>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

// ---------------- STYLES ----------------

const styles = {
  container: {
    textAlign: "center",
    padding: "20px",
    background: "#f5f7fa",
    color: "#222",
    minHeight: "100vh",
  },
  centerContainer: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f5f7fa",
  },
  box: {
    background: "#fff",
    padding: "30px",
    borderRadius: "10px",
    boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
  },
  input: {
    display: "block",
    margin: "10px auto",
    padding: "10px",
    width: "250px",
    borderRadius: "6px",
    border: "1px solid #ccc",
  },
  button: {
    padding: "10px 20px",
    margin: "10px",
    background: "#4caf50",
    color: "#fff",
    border: "none",
    cursor: "pointer",
    borderRadius: "6px",
  },
 logout: {
  background: "#ffffff",
  color: "#e53935",
  padding: "14px 28px",
  cursor: "pointer",
  border: "none",
  borderRadius: "10px",
  marginTop: "60px",   // 👈 pushes it down
  fontWeight: "bold",
  boxShadow: "0 6px 15px rgba(0,0,0,0.15)", // 👈 nice depth
  transition: "0.2s",
},
  grid: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  card: {
    background: "#fff",
    margin: "10px",
    padding: "10px",
    borderRadius: "10px",
    width: "180px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
  },
  image: {
    width: "100%",
    cursor: "pointer",
  },
  actionBtn: {
    background: "#000",
    color: "#fff",
    border: "none",
    padding: "8px",
    margin: "5px",
    width: "100px",
    cursor: "pointer",
  },
  updateWrapper: {
    display: "flex",
    justifyContent: "center",
    gap: "40px",
    flexWrap: "wrap",
  },
 link: {
  color: "#4caf50",          // matches your theme
  fontWeight: "600",
  cursor: "pointer",
  padding: "4px 8px",
  borderRadius: "6px",
  transition: "0.2s",
},
  dashboard: {
    display: "flex",
    justifyContent: "center",
    gap: "40px",
    marginTop: "50px",
  },
  dashboardCard: {
    background: "#fff",
    padding: "30px",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
  },
};

export default App;