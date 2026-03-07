import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import CategoryCard from "@/components/CategoryCard";
import QuizBlock from "@/components/Quiz";
import { categories } from "@/data/categories";

const Content = () => {
  const [searchParams] = useSearchParams();
  const selectedId = searchParams.get("category");
  const navigate = useNavigate();

  const selected = categories.find((c) => c.id === selectedId);

  if (selected) {
    return (
      <div className="min-h-screen pt-24 py-12">
        <div className="container mx-auto px-6 max-w-3xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <button
              onClick={() => navigate("/content")}
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-4 mb-6">
              <span className="text-4xl">{selected.icon}</span>
              <h1 className="text-3xl font-bold text-foreground">{selected.title}</h1>
            </div>

            <p className="text-muted-foreground leading-relaxed mb-8 text-justify">{selected.description}</p>

            {/* Code Snippet */}
            <div className="mb-10">
              <h2 className="text-lg font-semibold text-foreground mb-3">Code Example</h2>
              <div className="rounded-xl bg-code p-5 overflow-x-auto border border-border">
                <pre className="text-sm text-code-foreground font-mono leading-relaxed">{selected.codeSnippet}</pre>
              </div>
            </div>

            {/* Quiz */}
            <div className="rounded-xl border border-border bg-card p-6">
              <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">🧩 Challenge</h2>
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
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Choose Your <span className="text-gradient">Challenge</span>
          </h1>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Pick a category to dive into explanations, code examples, and interactive quizzes.
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat, i) => (
            <CategoryCard key={cat.id} category={cat} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Content;
