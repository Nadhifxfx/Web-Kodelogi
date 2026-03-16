import { Link, useLocation } from "react-router-dom";
import { useTheme } from "./Theme";
import { Sun, Moon, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { label: "Home", path: "/" },
  { label: "Courses", path: "/courses" },
  { label: "Learning Path", path: "/learning-path" },
  { label: "About", path: "/about" },
  { label: "Contact", path: "/contact" },
];

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!mobileOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [mobileOpen]);

  return (
    <>
      <nav className="fixed top-4 left-0 right-0 z-50">
        <div className="container mx-auto px-6">
          <div className="mx-auto flex h-16 items-center justify-between gap-3 rounded-full border border-border/60 bg-card/30 px-3 backdrop-blur-xl">
            <Link to="/" className="flex items-center gap-2 pl-1 group">
              <div className="h-10 w-10 rounded-full border border-primary/22 bg-primary/14 text-primary inline-flex items-center justify-center transition-all group-hover:glow-primary">
                <img
                  src="/Logo%20Kodelogi.png"
                  alt="Kodelogi"
                  className="h-6 w-6 object-contain"
                />
              </div>
              <span className="hidden sm:inline font-semibold text-base tracking-tight text-foreground">Kodelogi</span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-1">
              {navItems
                .filter((item) => item.path !== "/contact")
                .map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={
                      "relative rounded-full px-4 py-2 text-sm font-medium transition-all " +
                      (location.pathname === item.path
                        ? "bg-primary/12 text-foreground border border-primary/22 glow-primary"
                        : "text-muted-foreground hover:text-foreground hover:bg-background/20")
                    }
                  >
                    {item.label}
                    {location.pathname === item.path && (
                      <motion.span
                        layoutId="nav-pill"
                        className="pointer-events-none absolute inset-0 rounded-full"
                      />
                    )}
                  </Link>
                ))}
            </div>

            <div className="flex items-center gap-2 pr-1">
              <Link
                to="/contact"
                className={
                  "hidden md:inline-flex items-center justify-center rounded-full px-5 py-2 text-sm font-semibold transition-all " +
                  (location.pathname === "/contact"
                    ? "bg-accent text-accent-foreground glow-accent"
                    : "bg-primary text-primary-foreground hover:glow-primary")
                }
              >
                Contact
              </Link>

              <button
                onClick={toggleTheme}
                className="h-10 w-10 rounded-full border border-border/60 bg-background/10 flex items-center justify-center hover:glow-primary transition-all"
                aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
              >
                {theme === "dark" ? (
                  <Moon className="w-5 h-5 text-foreground" />
                ) : (
                  <Sun className="w-5 h-5 text-foreground" />
                )}
              </button>

              <button
                onClick={() => setMobileOpen(true)}
                className="md:hidden h-10 w-10 rounded-full border border-border/60 bg-background/10 flex items-center justify-center"
                aria-label="Open menu"
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu (Right Drawer) */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              key="overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
              className="fixed inset-0 z-40 bg-background/70 backdrop-blur-sm md:hidden"
              onClick={() => setMobileOpen(false)}
            />

            <motion.aside
              key="drawer"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.22 }}
              className="fixed top-0 right-0 z-50 h-screen w-72 max-w-[85vw] md:hidden border-l border-border bg-background/95 backdrop-blur-xl"
              aria-label="Mobile menu"
            >
              <div className="h-16 px-6 flex items-center justify-end border-b border-border">
                <button
                  type="button"
                  onClick={() => setMobileOpen(false)}
                  className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="px-4 py-4 flex flex-col gap-2">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setMobileOpen(false)}
                    className={`px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                      location.pathname === item.path
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted"
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
