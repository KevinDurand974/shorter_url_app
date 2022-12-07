import Image from "next/image";

const Footer = () => {
  return (
    <footer className="w-full flex items-center bg-gradient-to-b from-black/10 to-black/30 p-4 flex-shrink-0 rounded-xl shadow-md shadow-t-alt/40 justify-evenly flex-wrap">
      <div className="flex gap-2">
        {/* FIX: Image */}
        <Image src="" alt="" />
        <h4 className="font-fredoka caps-small text-xl">Url Shorten</h4>
      </div>
      <div>
        <p>2022 KDWeb v1.0 - Sous licence MIT</p>
        <p>Pour signaler des potentiels bugs, rendez-vous ici</p>
      </div>
    </footer>
  );
}

export default Footer;
