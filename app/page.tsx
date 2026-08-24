import { MenuApp } from "./components/MenuApp";
import { listOrders, listRecipes } from "@/lib/data";

export const dynamic = "force-dynamic";

export default function Home() {
  return <MenuApp initialRecipes={listRecipes()} initialOrders={listOrders()} />;
}
