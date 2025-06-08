import AtmCard from "@/app/components/AtmCard";
import Button from "@/app/components/CustomButton";
import Heading from "@/app/components/Heading";
import { FaPlus } from "react-icons/fa";
const cards = [
  {
    name: "Alice Cooper",
    type: "visa",
    number: "0x...efat2",
    exp: "08/30",
    cvv: "643",
    src: "/var-1.jpg",
  },
  {
    name: "Alice Cooper",
    type: "master",
    number: "0x...efat2",
    exp: "04/32",
    cvv: "893",
    src: "/crd-bg.jpg",
  },
  {
    name: "Alice Cooper",
    type: "visa",
    number: "4231 5632 6203 2389",
    exp: "04/32",
    cvv: "432",
    src: "/var-1.jpg",
  },
  {
    name: "Alice Cooper",
    type: "master",
    number: "4321 8765 6543 2109",
    exp: "08/29",
    cvv: "432",
    src: "/crd-bg.jpg",
  },
];
const Page = () => {
  return (
    <div className="my-8 mx-16">
      <Heading
        title="Your Cards"
        subtitle="See your cards and their spending limits"
      />
      <div className="mt-12 text-white">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {cards.map((card, idx) => {
            return (
              <AtmCard
                key={card.cvv + idx}
                name={card.name}
                number={card.number}
                cvv={card.cvv}
                exp={card.exp}
                type={card.type}
                src={card.src}
              />
            );
          })}

          <div className="relative text-black flex items-center justify-center p-6">
            <Button white>Add Card</Button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Page;
