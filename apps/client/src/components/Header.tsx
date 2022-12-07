import Link from "next/link";

const Header = () => {
  return (
    <header className="">
      <Link href="/">LOGO - Home</Link>

      <nav>
        <Link href="/">Create Url</Link>
        <Link href="/">My Urls</Link>
        <Link href="/">Account</Link>
      </nav>
    </header>
  );
}

export default Header;
