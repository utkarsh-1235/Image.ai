// import Image, { type ImageProps } from "next/image";
// import { Button } from "@repo/ui/button";
// import styles from "./page.module.css";
import { Button } from "@/components/ui/button";
export default function Home() {
  return (
    <div className="text-3xl font-bold underline bg-red-500">
      Hello World
      <Button className="px-4 py-2 rounded-lg"> Click Me</Button>
    </div>
  );
}
