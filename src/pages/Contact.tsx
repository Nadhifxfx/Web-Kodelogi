import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Mail, Github, Linkedin } from "lucide-react";

const Contact = () => {
  const [focused, setFocused] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const inputClasses = (name: string) =>
    `w-full px-4 py-3 rounded-lg border bg-card/50 backdrop-blur-sm text-foreground text-sm transition-all outline-none placeholder:text-muted-foreground ${
      focused === name ? "border-primary glow-primary" : "border-border hover:border-primary/30"
    }`;

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center p-8"
        >
          <div className="text-5xl mb-4">🎉</div>
          <h2 className="text-2xl font-bold text-foreground mb-2">Message Sent!</h2>
          <p className="text-muted-foreground">Thanks for reaching out. We'll get back to you soon.</p>
          <button onClick={() => setSubmitted(false)} className="mt-6 text-sm text-primary hover:underline font-medium">
            Send another message
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-14 md:pt-20 pb-20">
      <div className="container mx-auto px-6 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="mt-7 text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight text-foreground mb-3 leading-[1.05]">
            Get in <span className="text-gradient">Touch</span>
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed max-w-md mx-auto">
            Have questions about learning paths or quizzes? We'd love to hear from you.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-5 gap-8">
          {/* Left — Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="md:col-span-2 space-y-6"
          >
            <div className="rounded-xl border border-border/60 bg-card/40 backdrop-blur-md p-6 shadow-lg space-y-5">
              <h2 className="text-lg font-semibold text-foreground">Contact Information</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Have questions about learning paths or quizzes? Reach out to us.
              </p>

              <div className="space-y-3">
                <a
                  href="mailto:nadhiffathur@gmail.com"
                  className="flex items-center gap-3 text-sm text-foreground hover:text-primary transition-colors group"
                >
                  <span className="flex items-center justify-center w-9 h-9 rounded-lg bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors">
                    <Mail className="w-4 h-4" />
                  </span>
                  nadhiffathur@gmail.com
                </a>
                <a
                  href="mailto:ismawatiainur@gmail.com"
                  className="flex items-center gap-3 text-sm text-foreground hover:text-primary transition-colors group"
                >
                  <span className="flex items-center justify-center w-9 h-9 rounded-lg bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors">
                    <Mail className="w-4 h-4" />
                  </span>
                  ismawatiainur@gmail.com
                </a>
                <a
                  href="mailto:fbasyarz@gmail.com"
                  className="flex items-center gap-3 text-sm text-foreground hover:text-primary transition-colors group"
                >
                  <span className="flex items-center justify-center w-9 h-9 rounded-lg bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors">
                    <Mail className="w-4 h-4" />
                  </span>
                  fbasyarz@gmail.com
                </a>
              </div>

              <div className="pt-4 border-t border-border/40">
                <p className="text-xs text-muted-foreground mb-3 uppercase tracking-wider font-medium">Follow Us</p>
                <div className="flex gap-3">
                  <a
                    href="https://github.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-10 h-10 rounded-lg border border-border/60 bg-card/30 text-muted-foreground hover:text-primary hover:border-primary/40 hover:bg-primary/5 transition-all"
                  >
                    <Github className="w-4 h-4" />
                  </a>
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-10 h-10 rounded-lg border border-border/60 bg-card/30 text-muted-foreground hover:text-primary hover:border-primary/40 hover:bg-primary/5 transition-all"
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right — Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="md:col-span-3"
          >
            <form
              onSubmit={handleSubmit}
              className="rounded-xl border border-border/60 bg-card/40 backdrop-blur-md p-6 shadow-lg space-y-5"
            >
              <h2 className="text-lg font-semibold text-foreground">Send a Message</h2>

              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Name</label>
                <input
                  type="text"
                  required
                  placeholder="Your name"
                  className={inputClasses("name")}
                  onFocus={() => setFocused("name")}
                  onBlur={() => setFocused(null)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Email</label>
                <input
                  type="email"
                  required
                  placeholder="you@example.com"
                  className={inputClasses("email")}
                  onFocus={() => setFocused("email")}
                  onBlur={() => setFocused(null)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Message</label>
                <textarea
                  required
                  rows={5}
                  placeholder="What's on your mind?"
                  className={inputClasses("message") + " resize-none"}
                  onFocus={() => setFocused("message")}
                  onBlur={() => setFocused(null)}
                />
              </div>
              <button
                type="submit"
                className="w-full py-3.5 rounded-lg bg-primary text-primary-foreground font-semibold flex items-center justify-center gap-2 hover:glow-primary transition-all hover:scale-[1.02]"
              >
                <Send className="w-4 h-4" />
                Send Message
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
