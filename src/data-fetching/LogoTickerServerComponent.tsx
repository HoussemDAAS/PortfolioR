import { client } from "@/sanity/lib/client";
import LogoTicker from "@/sections/Logoticker";

const LogoTickerServerComponent = async () => {
  const logos = await client.fetch(`*[_type == "logo"]`);
  return <LogoTicker logos={logos} />;
};

export default LogoTickerServerComponent;