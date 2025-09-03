export class PerformanceMonitor {
  static init() {
    if ('performance' in window) {
      this.measureWebVitals();
      this.measureResourceTiming();
    }
  }

  static measureWebVitals() {
    // First Contentful Paint
    new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        console.log('FCP:', entry.startTime);
      }
    }).observe({ type: 'paint', buffered: true });

    // Largest Contentful Paint
    new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        console.log('LCP:', entry.startTime);
      }
    }).observe({ type: 'largest-contentful-paint', buffered: true });
  }

  static measureResourceTiming() {
    window.addEventListener('load', () => {
      const resources = performance.getEntriesByType('resource');
      const totalSize = resources.reduce((acc, resource) => {
        return acc + (resource.transferSize || 0);
      }, 0);
      console.log('Total resource size:', totalSize, 'bytes');
    });
  }

  static getMetrics() {
    return {
      fcp: performance.getEntriesByType('paint')[0]?.startTime || 0,
      lcp: performance.getEntriesByType('largest-contentful-paint')[0]?.startTime || 0,
      cls: 0.05, // Simulated
      fid: 12, // Simulated
    };
  }
}