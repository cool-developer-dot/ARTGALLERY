import { PageContainer } from "@/components/layout/PageContainer";

const footerLinks = {
  Gallery: ["Virtual Halls", "Current Exhibition", "Past Shows", "Private Tours"],
  Collections: ["Contemporary", "Renaissance", "Digital Art", "Sculpture"],
  Artists: ["Featured", "Emerging", "Apply to Exhibit", "Residencies"],
  Exhibitions: ["Luminous Horizons", "Neural Gardens", "Archive", "Calendar"],
  Contact: ["Press", "Partnerships", "Support", "Careers"],
};

const socialLinks = [
  { label: "Instagram", href: "#" },
  { label: "Twitter", href: "#" },
  { label: "LinkedIn", href: "#" },
  { label: "YouTube", href: "#" },
];

export function Footer() {
  return (
    <footer className="relative w-full overflow-hidden border-t border-white/5 bg-bg-deep pt-14 pb-10 sm:pt-20 sm:pb-12">
      <PageContainer>
        <div className="grid-safe gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 xl:gap-8">
          <div className="min-w-0 sm:col-span-2 md:col-span-3 lg:col-span-4 xl:col-span-1">
            <a href="#" className="inline-flex items-center gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center border border-white/15">
                <span className="font-display text-base text-ivory">A</span>
              </div>
              <span className="font-display text-base tracking-[0.06em] text-ivory">
                Atelier
              </span>
            </a>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-stone-body">
              A virtual museum where art, architecture, and technology converge
              in cinematic digital space.
            </p>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title} className="min-w-0">
              <h3 className="type-label mb-4">{title}</h3>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-stone-body transition-colors hover:text-ivory"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-5 border-t border-white/5 pt-8 sm:mt-16 sm:flex-row">
          <p className="type-caption text-center sm:text-left">
            © {new Date().getFullYear()} Atelier Virtual Gallery
          </p>

          <div className="flex flex-wrap items-center justify-center gap-5 sm:gap-7">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                className="text-sm text-stone-muted transition-colors hover:text-ivory"
                aria-label={social.label}
              >
                {social.label}
              </a>
            ))}
          </div>
        </div>
      </PageContainer>
    </footer>
  );
}
