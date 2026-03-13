import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import CategoryCard from "@/components/CategoryCard";
import QuizBlock from "@/components/Quiz";
import { categories } from "@/data/categories";

const ContentPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedId = searchParams.get("category");
  const selectedGroup = searchParams.get("group");
  const navigate = useNavigate();

  const selected = categories.find((c) => c.id === selectedId);

  const isSelectedIconImage =
    !!selected &&
    (selected.icon.startsWith("/") ||
      selected.icon.includes(".png") ||
      selected.icon.includes(".svg") ||
      selected.icon.includes(".webp"));

  // FILTER GROUP
  const filteredCategories = selectedGroup
    ? categories.filter((c) => c.group === selectedGroup)
    : categories;

  const groups = ["all", "frontend", "backend", "tools", "computer science"];

  if (selected) {
    return (
      <div className="min-h-screen pt-24 py-12">
        <div className="container mx-auto px-6 max-w-3xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <button
              onClick={() => navigate("/courses")}
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              
            </button>

            <div className="flex items-center gap-4 mb-6">
              {isSelectedIconImage ? (
                <img
                  src={selected.icon}
                  alt={`${selected.title} icon`}
                  className="w-10 h-10 object-contain"
                />
              ) : (
                <span className="text-4xl">{selected.icon}</span>
              )}
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-foreground leading-[1.1]">
                {selected.title}
              </h1>
            </div>

            <p className="text-muted-foreground leading-relaxed mb-8 text-justify">
              {selected.description}
            </p>

            {/* Code Example */}
            <div className="mb-10">
              <h2 className="text-lg font-semibold text-foreground mb-3">
                Code Example
              </h2>
              <div className="rounded-xl bg-code p-5 overflow-x-auto border border-border">
                <pre className="text-sm text-code-foreground font-mono leading-relaxed">{selected.codeSnippet}</pre>
              </div>
            </div>

            {/* Quiz */}
            <div className="rounded-xl border border-border bg-card p-6">
              <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">🧩 Course</h2>
              <QuizBlock quiz={selected.quiz} />
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 py-12">
      <div className="container mx-auto px-6">

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight text-foreground mb-4 leading-[1.05]">
            Choose Your <span className="text-gradient">Courses</span>
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            Jelajahi berbagai topik pemrograman melalui penjelasan singkat, contoh kode, dan kuis interaktif. Pilih kategori untuk mulai belajar.
          </p>
        </motion.div>

        {/* FILTER */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {groups.map((group) => {
            const active = selectedGroup === group || (!selectedGroup && group === "all");

            return (
              <button
                key={group}
                onClick={() =>
                  group === "all"
                    ? setSearchParams({})
                    : setSearchParams({ group })
                }
                className={`px-4 py-2 rounded-lg text-sm border transition 
                ${active
                    ? "bg-primary text-primary-foreground border-primary"
                    : "border-border text-muted-foreground hover:text-foreground"
                  }`}
              >
                {group === "all"
                  ? "All"
                  : group.charAt(0).toUpperCase() + group.slice(1)}
              </button>
            );
          })}
        </div>

        {/* CATEGORY GRID */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 item-stretch">
          {filteredCategories.map((cat, i) => (
            <CategoryCard key={cat.id} category={cat} index={i} />
          ))}
        </div>

      </div>
    </div>
  );
};

export default ContentPage;