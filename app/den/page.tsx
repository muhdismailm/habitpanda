"use client";

import { usePanda } from "@/hooks/usePanda";
import { Button } from "@/components/ui/button";
import * as Icons from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const SHOP_ITEMS = [
  { id: "bamboo_hat", name: "Bamboo Hat", cost: 100, icon: "HardHat" },
  { id: "palm_tree", name: "Palm Tree", cost: 250, icon: "TreePalm" },
  { id: "lotus_pond", name: "Lotus Pond", cost: 500, icon: "Droplets" },
  { id: "bird_friend", name: "Bird Friend", cost: 1000, icon: "Bird" },
];

export default function DenPage() {
  const { panda, buyItem, toggleEquip, isLoaded } = usePanda();
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  if (!isLoaded) return null;

  const handleBuy = (id: string, cost: number) => {
    const success = buyItem(id, cost);
    if (success) {
      setToast({ message: "Item purchased successfully!", type: "success" });
    } else {
      setToast({ message: "Not enough Bamboo!", type: "error" });
    }
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-4xl font-bold text-foreground flex items-center gap-3">
            <Icons.Tent className="w-8 h-8 text-amber-700" />
            The Panda Den
          </h1>
          <p className="text-muted-foreground mt-1">Spend your hard-earned bamboo to decorate the jungle.</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-green-500/10 text-green-700 dark:text-green-400 px-4 py-2 rounded-xl font-bold border border-green-500/20">
            <Icons.Leaf className="w-5 h-5" />
            <span>{panda.bamboo} Bamboo</span>
          </div>
          <Link href="/dashboard">
            <Button variant="outline">Back to Dashboard</Button>
          </Link>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Inventory Section */}
        <section className="bg-card p-6 rounded-3xl border shadow-sm h-fit">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Icons.Backpack className="w-6 h-6 text-primary" />
            Inventory
          </h2>
          
          {panda.inventory.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground border-2 border-dashed rounded-xl">
              <p>Your inventory is empty.</p>
              <p className="text-sm mt-1">Buy items from the shop!</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4">
              {panda.inventory.map((itemId) => {
                const item = SHOP_ITEMS.find((i) => i.id === itemId);
                if (!item) return null;
                // @ts-ignore
                const Icon = Icons[item.icon] || Icons.HelpCircle;
                const isEquipped = panda.equipped.includes(itemId);

                return (
                  <div key={itemId} className={`p-4 rounded-xl border flex flex-col items-center gap-3 text-center transition-all ${isEquipped ? 'bg-primary/5 border-primary/40' : 'bg-muted/30'}`}>
                    <div className="p-3 bg-background rounded-full shadow-sm">
                      <Icon className="w-8 h-8 text-foreground" />
                    </div>
                    <div>
                      <p className="font-semibold text-sm leading-tight">{item.name}</p>
                      <Button 
                        variant={isEquipped ? "default" : "outline"} 
                        size="sm" 
                        className="mt-3 w-full"
                        onClick={() => toggleEquip(itemId)}
                      >
                        {isEquipped ? "Unequip" : "Equip"}
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>

        {/* Shop Section */}
        <section className="bg-card p-6 rounded-3xl border shadow-sm">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Icons.Store className="w-6 h-6 text-amber-500" />
            Jungle Shop
          </h2>
          
          <div className="space-y-4">
            {SHOP_ITEMS.map((item) => {
              const isOwned = panda.inventory.includes(item.id);
              // @ts-ignore
              const Icon = Icons[item.icon] || Icons.HelpCircle;

              return (
                <div key={item.id} className={`p-4 rounded-xl border flex items-center justify-between ${isOwned ? 'opacity-60 bg-muted/50' : 'bg-background hover:border-primary/50 transition-colors'}`}>
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-muted rounded-lg">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{item.name}</h3>
                      <p className="text-sm text-green-600 dark:text-green-400 font-medium flex items-center gap-1">
                        <Icons.Leaf className="w-3 h-3" /> {item.cost}
                      </p>
                    </div>
                  </div>
                  
                  <Button 
                    variant={isOwned ? "secondary" : "default"} 
                    disabled={isOwned}
                    onClick={() => handleBuy(item.id, item.cost)}
                  >
                    {isOwned ? "Owned" : "Buy"}
                  </Button>
                </div>
              );
            })}
          </div>
        </section>
      </div>

      {/* Floating Toast */}
      {toast && (
        <div className={`fixed bottom-10 left-1/2 -translate-x-1/2 px-6 py-3 rounded-full font-bold shadow-2xl z-50 animate-in fade-in slide-in-from-bottom-5 ${toast.type === 'success' ? 'bg-green-500 text-white' : 'bg-destructive text-white'}`}>
          {toast.message}
        </div>
      )}
    </div>
  );
}