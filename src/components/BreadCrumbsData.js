import Link from "next/link";
import { HiMiniHome } from "react-icons/hi2";

const Breadcrumbs = ({ items }) => {
  return (
    <div class="bg-white p-4 flex items-center flex-wrap shadow rounded-lg">
      <ul class="flex items-center">
        {items.map(({ url, label }) => (
          <li class="inline-flex items-center">
            <Link href={url} class="text-gray-600 hover:text-blue-500">
              {label}
            </Link>

            <span class="mx-4 h-auto text-gray-400 font-medium">/</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Breadcrumbs;
