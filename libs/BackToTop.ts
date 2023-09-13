export default function BackToTop(value: string) {
  const result = document.querySelector(value) as HTMLElement | null;
  if (result) {
    document.addEventListener("scroll", () => {
      if (window.scrollY > 200) {
        result.classList.add('back-to-top-btn-show');
      } else {
        result.classList.remove('back-to-top-btn-show');
      }
    });
    result.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
};