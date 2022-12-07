import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="w-full flex items-center bg-gradient-to-b from-black/10 to-black/30 p-4 flex-shrink-0 rounded-xl shadow-md shadow-t-alt/40 justify-evenly flex-wrap">
      <div className="flex gap-2 items-center">
        <div className="relative h-10 w-10">
          <Image src="/icon.png" alt="" layout="fill" />
        </div>
        <h4 className="font-fredoka caps-small text-3xl">Url Shorten</h4>
      </div>
      <ul className="list-disc">
        <li>2022 - KDWeb v1.0 - Sous licence MIT</li>
        <li>Pour signaler des potentiels bugs, rendez-vous <Link href="/"><a className="underline tracking-widest font-fredoka underline-offset-4">ici</a></Link></li>
      </ul>
    </footer>
  );
}

export default Footer;
