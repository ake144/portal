import { StudentForm } from "@/components/studentForm/form";
import Image from "next/image";

export default function Home() {
  return (
        <div>
          <div  className="flex py-2 mt-12 justify-center items-center ">
               <StudentForm   />
          </div>
         
        </div>
  );
}
