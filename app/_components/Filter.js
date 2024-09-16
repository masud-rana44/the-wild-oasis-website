"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

const filterItems = [
  { id: 1, label: "All Cabins", value: "all" },
  { id: 2, label: "1—3 Guests", value: "small" },
  { id: 3, label: "4—7 Guests", value: "medium" },
  { id: 4, label: "8—12 Guests", value: "large" },
];

function Filter() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const activeFilter = searchParams.get("capacity") ?? "all";

  const handleFilter = (value) => {
    const params = new URLSearchParams(searchParams);
    params.set("capacity", value);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="border border-primary-800 flex">
      {filterItems.map((item) => (
        <button
          key={item.id}
          onClick={() => handleFilter(item.value)}
          className={`px-5 py-2 hover:bg-primary-700 ${
            item.value === activeFilter ? "bg-primary-700 text-primary-50" : ""
          }`}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}

export default Filter;
