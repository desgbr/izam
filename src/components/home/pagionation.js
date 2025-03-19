export default function Pagination({
  pages,
  currentPage,
  setCurrentPage,
}) {
  return (
    <div className="flex items-center justify-center mb-9 gap-1.5 md:gap-2">
      <button
        onClick={() => setCurrentPage(currentPage - 1)}
        disabled={currentPage === 1}
        className="size-[26px] md:size-10 flex items-center justify-center border rounded disabled:opacity-50"
      >
        &lt;
      </button>
      {Array.from({ length: pages }, (_, i) => i + 1).map((page) => (
        <button
          key={page}
          onClick={() => setCurrentPage(page)}
          className={`size-[26px] md:size-10 flex items-center justify-center border rounded ${
            currentPage === page ? "bg-green-600 text-white" : "text-gray-700"
          }`}
        >
          {page}
        </button>
      ))}
      <button
        onClick={() => setCurrentPage(currentPage + 1)}
        disabled={currentPage === pages}
        className="size-[26px] md:size-10 flex items-center justify-center border rounded disabled:opacity-50"
      >
        &gt;
      </button>
    </div>
  );
}
