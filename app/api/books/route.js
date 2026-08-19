import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL);

export async function GET() {
  try {
    const books = await sql`
      SELECT id, title, author, story, published_at
      FROM books
      ORDER BY published_at DESC
    `;

    return Response.json(books);
  } catch (error) {
    console.error(error);
    return Response.json(
      { error: "Unable to load books." },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const { title, author, story } = await request.json();

    if (!title || !author || !story) {
      return Response.json(
        { error: "Title, author, and story are required." },
        { status: 400 }
      );
    }

    const [book] = await sql`
      INSERT INTO books (title, author, story)
      VALUES (${title}, ${author}, ${story})
      RETURNING id, title, author, story, published_at
    `;

    return Response.json(book, { status: 201 });
  } catch (error) {
    console.error(error);
    return Response.json(
      { error: "Unable to publish book." },
      { status: 500 }
    );
  }
}
