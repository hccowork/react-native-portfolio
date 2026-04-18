"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

type AdminSection = {
  id: string;
  label: string;
  description: string;
  count?: number;
};

type AdminShellProps = {
  children: React.ReactNode;
  sections: AdminSection[];
};

type AdminShellContextValue = {
  selectedSection: string;
};

const AdminShellContext = createContext<AdminShellContextValue | null>(null);

export function AdminShell({ children, sections }: AdminShellProps) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedSection, setSelectedSection] = useState(
    sections[0]?.id ?? "overview",
  );

  useEffect(() => {
    if (!isDrawerOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isDrawerOpen]);

  useEffect(() => {
    const syncSectionFromHash = () => {
      const nextSection = window.location.hash.replace("#", "");
      const fallbackSection = sections[0]?.id ?? "overview";
      const matchedSection = sections.some(
        (section) => section.id === nextSection,
      )
        ? nextSection
        : fallbackSection;

      setSelectedSection(matchedSection);
      setIsDrawerOpen(false);
    };

    syncSectionFromHash();
    window.addEventListener("hashchange", syncSectionFromHash);

    return () => window.removeEventListener("hashchange", syncSectionFromHash);
  }, [sections]);

  const handleSectionSelect = (sectionId: string) => {
    setSelectedSection(sectionId);
    setIsDrawerOpen(false);

    if (window.location.hash !== `#${sectionId}`) {
      window.history.replaceState(null, "", `#${sectionId}`);
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const contextValue = useMemo(
    () => ({
      selectedSection,
    }),
    [selectedSection],
  );

  return (
    <AdminShellContext.Provider value={contextValue}>
      <div className="admin-layout">
        <button
          type="button"
          className="admin-drawer-toggle button button-secondary"
          onClick={() => setIsDrawerOpen(true)}
          aria-expanded={isDrawerOpen}
          aria-controls="admin-sections-sidebar"
        >
          Open sections
        </button>

        {isDrawerOpen ? (
          <button
            type="button"
            className="admin-drawer-backdrop"
            aria-label="Close section menu"
            onClick={() => setIsDrawerOpen(false)}
          />
        ) : null}

        <aside
          id="admin-sections-sidebar"
          className={`admin-sidebar${isDrawerOpen ? " admin-sidebar-open" : ""}`}
          aria-label="Admin panel sections"
        >
          <div className="admin-sidebar-card">
            <div className="admin-sidebar-header">
              <div>
                <p className="eyebrow">Section Menu</p>
                <h2>Admin navigation</h2>
              </div>
              <button
                type="button"
                className="admin-sidebar-close"
                onClick={() => setIsDrawerOpen(false)}
                aria-label="Close section menu"
              >
                ×
              </button>
            </div>

            <p className="admin-sidebar-copy">
              Open one admin area at a time and manage content in a cleaner
              focused workspace.
            </p>

            <nav className="admin-sidebar-nav">
              {sections.map((section) => (
                <button
                  key={section.id}
                  type="button"
                  className="admin-sidebar-link"
                  data-active={selectedSection === section.id}
                  aria-pressed={selectedSection === section.id}
                  onClick={() => handleSectionSelect(section.id)}
                >
                  <span className="admin-sidebar-link-row">
                    <strong>{section.label}</strong>
                    {typeof section.count === "number" ? (
                      <span className="admin-sidebar-count">
                        {section.count}
                      </span>
                    ) : null}
                  </span>
                  <span>{section.description}</span>
                </button>
              ))}
            </nav>
          </div>
        </aside>

        <div className="admin-content">{children}</div>
      </div>
    </AdminShellContext.Provider>
  );
}

type AdminPanelSectionProps = {
  children: React.ReactNode;
  className?: string;
  id: string;
};

export function AdminPanelSection({
  children,
  className,
  id,
}: AdminPanelSectionProps) {
  const context = useContext(AdminShellContext);

  if (!context) {
    throw new Error("AdminPanelSection must be used inside AdminShell.");
  }

  const isSelected = context.selectedSection === id;

  return (
    <section
      id={id}
      className={className}
      aria-hidden={!isSelected}
      hidden={!isSelected}
      data-admin-section={id}
    >
      {children}
    </section>
  );
}
