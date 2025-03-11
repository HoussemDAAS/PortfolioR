import { client } from "@/sanity/lib/client";
import Tape from "@/sections/Tape";

const TapeServerComponent = async () => {
  const tapeData = await client.fetch(`*[_type == "tape"]`);
  return <Tape tapeData={tapeData} />;
};

export default TapeServerComponent;