import Link from "next/link";

const Breadcrumbs = ({ items }) => {
  return (
    <div className="bg-white p-4 flex items-center flex-wrap shadow rounded-lg">
      <ul className="flex items-center">
        {items.map(({ url, label }, index) => (
          <li key={index} className="inline-flex items-center">
            <Link href={url} className="text-gray-600 hover:text-blue-500">
              {label}
            </Link>

            <span className="mx-4 h-auto text-gray-400 font-medium">/</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Breadcrumbs;
