/**
 * Utility functions for handling scrolling behavior
 */

/**
 * Scrolls to an element with the specified ID
 * @param elementId The ID of the element to scroll to
 * @param offset Optional offset from the top of the element (in pixels)
 */
export const scrollToElement = (elementId: string, offset = 0): void => {
  // Wait a bit for any DOM updates to complete
  setTimeout(() => {
    const element = document.getElementById(elementId);
    if (element) {
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  }, 100);
};

/**
 * Scrolls to the top of the page
 * @param smooth Whether to use smooth scrolling (default: true)
 */
export const scrollToTop = (smooth = true): void => {
  window.scrollTo({
    top: 0,
    behavior: smooth ? 'smooth' : 'auto'
  });
};

/**
 * Handles scrolling to a section specified in the URL hash on page load
 * @param headerOffset Offset for fixed headers (in pixels)
 */
export const handleHashScroll = (headerOffset = 80): void => {
  if (window.location.hash) {
    const id = window.location.hash.substring(1);
    scrollToElement(id, headerOffset);
  } else {
    // If no hash, scroll to top
    scrollToTop(false);
  }
};

export default {
  scrollToElement,
  scrollToTop,
  handleHashScroll
};
