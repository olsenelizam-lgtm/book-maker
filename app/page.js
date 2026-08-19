"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [books, setBooks] = useState([]);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [story, setStory] = useState("");
  const [message, setMessage] = useState("");

  async function loadBooks() {
    const response = await fetch("/api/books");
    const data = await response.json();

    if (response.ok) {
      setBooks(data);
    }
  }

  useEffect(() => {
    loadBooks();
  }, []);

  async function publishBook() {
    setMessage("");

    if (!title.trim() || !author.trim() || !story.trim()) {
      setMessage("Please fill in the title, author, and story.");
      return;
    }

    const response = await fetch("/api/books", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        title,
        author,
        story
      })
    });

    const data = await response.json();

    if (!response.ok) {
      setMessage(data.error || "Something went wrong.");
      return;
    }

    setBooks((currentBooks) => [data, ...currentBooks]);

    setTitle("");
    setAuthor("");
    setStory("");
    setMessage("🎉 Your book has been published!");
  }

  return (
    <main style={styles.page}>
      <nav style={styles.nav}>
        <strong>📖 Book Maker</strong>
        <a href="#home">Home</a>
        <a href="#books">Books</a>
        <a href="#maker">Make a Book</a>
      </nav>

      <section id="home" style={styles.hero}>
        <p>✦ 100% FREE ✦</p>
        <h1>Make a book.<br />Tell your story.</h1>
        <p>
          Write, publish, and share your own books for free.
        </p>
        <a href="#maker" style={styles.button}>
          Start Making Your Book
        </a>
      </section>

      <section id="books" style={styles.section}>
        <h2>📚 Published Books</h2>
        <p>Discover books created by the Book Maker community.</p>

        {books.length === 0 ? (
          <div style={styles.empty}>
            No books have been published yet. Be the first!
          </div>
        ) : (
          <div style={styles.grid}>
            {books.map((book) => (
              <article key={book.id} style={styles.card}>
                <h3>{book.title}</h3>
                <p>
                  <i>by {book.author}</i>
                </p>
                <p style={styles.story}>
                  {book.story}
                </p>
              </article>
            ))}
          </div>
        )}
      </section>

      <section id="maker" style={styles.section}>
        <h2>✍️ Make & Publish Your Book</h2>

        <div style={styles.maker}>
          <label>Book title</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="My Amazing Story"
            style={styles.input}
          />

          <label>Author name</label>
          <input
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="Your name"
            style={styles.input}
          />

          <label>Your book</label>
          <textarea
            value={story}
            onChange={(e) => setStory(e.target.value)}
            placeholder="Once upon a time..."
            style={styles.textarea}
          />

          <button onClick={publishBook} style={styles.button}>
            Publish Book
          </button>

          {message && <p>{message}</p>}
        </div>
      </section>

      <footer style={styles.footer}>
        © 2026 Book Maker · Free for everyone
      </footer>
    </main>
  );
}

const styles = {
  page: {
    margin: 0,
    fontFamily: "Georgia, serif",
    background: "#fffaf3",
    color: "#3d3028",
    minHeight: "100vh"
  },

  nav: {
    position: "sticky",
    top: 0,
    display: "flex",
    gap: 22,
    alignItems: "center",
    padding: "16px 6%",
    background: "#fffaf3",
    borderBottom: "1px solid #eadfce",
    zIndex: 10
  },

  hero: {
    textAlign: "center",
    padding: "100px 8%"
  },

  h1: {
    fontSize: 60
  },

  section: {
    padding: "70px 8%",
    maxWidth: 1100,
    margin: "auto"
  },

  maker: {
    background: "#f4eadc",
    borderRadius: 22,
    padding: 28
  },

  input: {
    display: "block",
    width: "100%",
    boxSizing: "border-box",
    padding: 12,
    margin: "8px 0 18px",
    border: "1px solid #d8c8b5",
    borderRadius: 9,
    fontFamily: "inherit"
  },

  textarea: {
    display: "block",
    width: "100%",
    minHeight: 220,
    boxSizing: "border-box",
    padding: 12,
    margin: "8px 0 18px",
    border: "1px solid #d8c8b5",
    borderRadius: 9,
    fontFamily: "inherit"
  },

  button: {
    display: "inline-block",
    background: "#7b5e46",
    color: "white",
    padding: "14px 22px",
    borderRadius: 10,
    textDecoration: "none",
    border: 0,
    cursor: "pointer",
    fontFamily: "inherit"
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
    gap: 18
  },

  card: {
    background: "white",
    border: "1px solid #eadfce",
    borderRadius: 16,
    padding: 24,
    boxShadow: "0 8px 24px rgba(75,52,34,.05)"
  },

  story: {
    whiteSpace: "pre-wrap",
    lineHeight: 1.6
  },

  empty: {
    background: "white",
    padding: 30,
    borderRadius: 16,
    marginTop: 20
  },

  footer: {
    textAlign: "center",
    padding: 40,
    borderTop: "1px solid #eadfce"
  }
};
