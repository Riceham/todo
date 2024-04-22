import Image from "next/image";
import Link from "next/link";

export const Logo = () => {
  return (
    <Link href="/" className="mx-5 my-2">
      <Image src="/logo.svg" alt="CountWave" width={170} height={42} />
    </Link>
  );
};
