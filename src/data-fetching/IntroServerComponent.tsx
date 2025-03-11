import { client } from "@/sanity/lib/client";
import Intro from "@/sections/Intro";

const IntroServerComponent = async () => {
  const introData = await client.fetch(`*[_type == "intro"][0]`);
  return <Intro introData={introData} />;
};

export default IntroServerComponent;