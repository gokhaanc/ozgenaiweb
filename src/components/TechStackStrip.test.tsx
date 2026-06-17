import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { TechStackStrip } from "./TechStackStrip";

const localizedContent = {
  ariaLabel: "Bağlı hizmet ağı",
  supportedPlatforms: "Desteklenen platformlar",
  openCapability: "{title} hizmetini aç",
  nodes: [
    {
      slug: "uygulama",
      title: "Mobil uygulamalar",
      detail: "iOS ve Android",
    },
    {
      slug: "web-sitesi",
      title: "Web siteleri",
      detail: "Siteler ve portallar",
    },
    {
      slug: "reklam",
      title: "Sosyal medya",
      detail: "İçerik",
    },
    {
      slug: "ai-donusumu",
      title: "Otomasyon",
      detail: "Operasyon",
    },
    {
      slug: "danismanlik",
      title: "Danışmanlık",
      detail: "Strateji",
    },
    {
      slug: "marketing",
      title: "Pazarlama",
      detail: "Büyüme",
    },
  ],
};

describe("TechStackStrip", () => {
  beforeEach(() => {
    window.matchMedia = vi.fn().mockReturnValue({
      matches: true,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    });
  });

  it("renders localized network node labels", () => {
    render(<TechStackStrip content={localizedContent} />);

    expect(
      screen.getByRole("button", { name: "Mobil uygulamalar hizmetini aç" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Web siteleri")).toBeInTheDocument();
    expect(screen.getByText("Operasyon")).toBeInTheDocument();
    expect(screen.queryByText("Mobile apps")).not.toBeInTheDocument();
  });
});
