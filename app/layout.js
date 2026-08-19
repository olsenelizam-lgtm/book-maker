export const metadata = {
  title: "Book Maker",
  description: "Create and publish books for free."
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
