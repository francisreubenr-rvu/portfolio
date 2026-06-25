import { Mail, GitFork, X } from "lucide-react";

export default function Contact() {
  return (
    <footer id="contact" className="py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        {/* Divider */}
        <div
          className="h-px w-full mb-16"
          style={{ background: "var(--border-default)" }}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-end">
          <div>
            <p className="label-mono-accent mb-3">Contact</p>
            <h2
              className="display-md mb-4"
              style={{ color: "var(--text-primary)" }}
            >
              Let&apos;s build
              <br />
              something.
            </h2>
            <p
              className="text-sm leading-relaxed mb-8 max-w-sm"
              style={{ color: "var(--text-secondary)" }}
            >
              Open to internships, project collaborations, and interesting
              engineering problems. First year, full commitment.
            </p>

            <a
              href="mailto:francisreubenrbtech25@rvu.edu.in"
              className="inline-flex items-center gap-2.5 px-6 py-3 text-sm font-medium rounded-lg transition-all duration-200 hover:opacity-90"
              style={{
                background: "var(--cyan)",
                color: "#080808",
              }}
            >
              <Mail size={15} />
              francisreubenrbtech25@rvu.edu.in
            </a>
          </div>

          <div className="flex flex-col gap-3 items-start md:items-end">
            <p className="label-mono">Links</p>
            <div className="flex gap-3">
              <a
                href="https://github.com/francisreubenr-rvu"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-lg transition-all duration-150"
                style={{
                  background: "var(--surface)",
                  color: "var(--text-secondary)",
                  border: "1px solid var(--border-default)",
                }}
              >
                <GitFork size={15} />
                GitHub
              </a>
              <a
                href="https://twitter.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-lg transition-all duration-150"
                style={{
                  background: "var(--surface)",
                  color: "var(--text-secondary)",
                  border: "1px solid var(--border-default)",
                }}
              >
                <X size={15} />
                Twitter
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="mt-16 pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
          style={{ borderTop: "1px solid var(--border-subtle)" }}
        >
          <span
            className="font-heading font-extrabold text-lg tracking-tight"
            style={{ color: "var(--text-primary)" }}
          >
            FR<span style={{ color: "var(--cyan)" }}>.</span>
          </span>
          <p
            className="font-mono text-xs"
            style={{ color: "var(--text-muted)" }}
          >
            Francis Reuben R · RV University · Bengaluru ·{" "}
            {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </footer>
  );
}
