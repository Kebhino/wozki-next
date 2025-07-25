import WyborUczestnikaClient from "./WyborUczestnikaClient";
import ListaGrupPrzydzialow from "./ListaGrupPrzydzialow";

export default function PlanowaniePage() {
  return (
    <>
      <WyborUczestnikaClient />
      <ListaGrupPrzydzialow />
    </>
  );
}
