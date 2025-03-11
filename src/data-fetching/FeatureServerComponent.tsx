import { client } from "@/sanity/lib/client";
import Features from "@/sections/Features";


const FeatureServerComponent = async () => {
  const FeatureData = await client.fetch(`*[_type == "feature"][0]`);
  return <Features featuresData={FeatureData} />;
};

export default FeatureServerComponent;